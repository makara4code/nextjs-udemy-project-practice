"use client";
import { Cart, CartItem } from "@/types";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { addToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { Loader, Minus, Plus } from "lucide-react";
import { useTransition } from "react";
const AddToCart = ({ cart, item }: { cart?: Cart; item: CartItem }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  const handleAddToCart = async () => {
    startTransition(async () => {
      const res = await addToCart(item);
      if (!res.success) {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
        return;
      }
      //handle success ad to cart
      toast({
        description: res.message,
        variant: "default",
        action: (
          <Button
            className="bg-primary text-gray-50 hover:bg-gray-800"
            onClick={() => router.push("/cart")}
          >
            Go To Cart
          </Button>
        ),
      });
    });
  };
  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);

      toast({
        variant: res.success ? "default" : "destructive",
        description: res.message,
      });
      return;
    });
  };
  return existItem ? (
    <div>
      <Button type="button" variant="outline" onClick={handleRemoveFromCart}>
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Minus className="w-4 h-4" />
        )}
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button type="button" variant="outline" onClick={handleAddToCart}>
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Plus className="w-4 h-4" />
        )}
      </Button>
    </div>
  ) : (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      {isPending ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <Plus className="w-4 h-4" />
      )}{" "}
      Add To Cart
    </Button>
  );
};

export default AddToCart;
