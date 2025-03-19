"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import type { Cart, CartItem } from "@/types"
import { toast } from "sonner"
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions"
import { Minus, Plus, Loader } from "lucide-react"
import { useState } from "react"

export default function AddToCart({
  item,
  cart,
}: {
  item: CartItem
  cart?: Cart
}) {
  const router = useRouter()
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isRemovingFromCart, setIsRemovingFromCart] = useState(false)

  // Check if item is already in cart
  const existingItem = cart && cart.items.find((i) => i.productId === item.productId)

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    try {
      const res = await addItemToCart(item)

      if (!res.success) {
        toast.error(res.message)
        return
      }

      // handle success add to cart
      toast(res.message, {
        action: {
          label: "Go to Cart",
          onClick: () => router.push("/cart"),
        },
      })
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleRemoveFromCart = async () => {
    setIsRemovingFromCart(true)
    try {
      const res = await removeItemFromCart(item.productId)

      if (res.success) {
        toast.success(res.message)
      } else {
        toast.error(res.message)
      }
    } finally {
      setIsRemovingFromCart(false)
    }
  }

  return existingItem ? (
    <div className="flex items-center">
      <Button
        type="button"
        variant="outline"
        onClick={handleRemoveFromCart}
        disabled={isRemovingFromCart || isAddingToCart}
        className="h-9 w-9 p-0"
      >
        {isRemovingFromCart ? <Loader className="h-4 w-4 animate-spin" /> : <Minus className="h-4 w-4" />}
      </Button>
      <span className="px-4 font-medium">{existingItem.qty}</span>
      <Button
        type="button"
        variant="outline"
        onClick={handleAddToCart}
        disabled={isAddingToCart || isRemovingFromCart}
        className="h-9 w-9 p-0"
      >
        {isAddingToCart ? <Loader className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
      </Button>
    </div>
  ) : (
    <Button className="w-full" type="button" onClick={handleAddToCart} disabled={isAddingToCart}>
      {isAddingToCart ? (
        <>
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          Adding...
        </>
      ) : (
        <>
          <Plus className="mr-2 h-4 w-4" /> Add To Cart
        </>
      )}
    </Button>
  )
}

