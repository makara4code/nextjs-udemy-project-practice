"use server";

import { CartItem } from "@/types";
import { convertToPlainObject, formatError, round2 } from "../utils";
import { cookies } from "next/headers";
import { auth } from "@/auth";
import { prisma } from "@/db/primsa";
import { cartItemSchema, insertCartSchema } from "../validator";
import { revalidatePath } from "next/cache";

// Calculate cart prices
const calcPrice = (items: CartItem[]) => {
  const itemsPrice = round2(
    items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
  );
  const shippingPrice = round2(itemsPrice > 100 ? 0 : 10);
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + taxPrice + shippingPrice);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function addItemToCart(data: CartItem) {
  try {
    // Check for cart cookie
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;

    if (!sessionCartId) {
      throw new Error("Cart session not found");
    }

    // Get session and user ID
    const session = await auth();
    const userId = session?.user?.id
      ? (session?.user?.id as string)
      : undefined;

    // Get Cart
    const cart = await getMyCart();

    // Parse and validate item
    const item = cartItemSchema.parse(data);

    // Find product in database
    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    });

    if (!product) throw new Error("Product not found");
    if (!cart) {
      // Create new cart
      const newCart = insertCartSchema.parse({
        userId: userId,
        items: [item],
        sessionCartId: sessionCartId,
        ...calcPrice([item]),
      });

      // Add to database
      await prisma.cart.create({ data: newCart });

      // Revalidate product page
      revalidatePath(`/products/${product.slug}`);

      return {
        success: true,
        message: `${product.name} added to cart`,
      };
    } else {
      // Check if item already exists in cart
      const existingItem = cart.items.find(
        (i) => i.productId === item.productId
      );

      if (existingItem) {
        // Check stock
        if (product.stock < existingItem.qty + item.qty) {
          throw new Error("Product out of stock");
        }

        // Update item quantity
        existingItem.qty += item.qty;

        // Update cart
        const updatedCart = insertCartSchema.parse({
          ...cart,
          items: cart.items,
          ...calcPrice(cart.items),
        });

        // Update database
        await prisma.cart.update({
          where: { id: cart.id },
          data: updatedCart,
        });

        // Revalidate product page
        revalidatePath(`/products/${product.slug}`);

        return {
          success: true,
          message: `${product.name} ${existingItem ? "updated in" : "added to"} cart`,
        };
      } else {

        // Check stock
        if (product.stock < item.qty) {
          throw new Error("Product out of stock");
        }

        // Add new item to cart
        const updatedCart = insertCartSchema.parse({
          ...cart,
          items: [...cart.items, item],
          ...calcPrice([...cart.items, item]),
        });

        // Update database
        await prisma.cart.update({
          where: { id: cart.id },
          data: updatedCart,
        });

        // Revalidate product page
        revalidatePath(`/products/${product.slug}`);

        return {
          success: true,
          message: `${product.name} ${existingItem ? "updated in" : "added to"} cart`,
        };
      }
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function getMyCart() {
  // Check for cart cookie
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;

  if (!sessionCartId) {
    throw new Error("Cart session not found");
  }

  // Get session and user ID
  const session = await auth();
  const userId = session?.user?.id ? (session?.user?.id as string) : undefined;

  // Get user cart from database
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
  });

  if (!cart) return undefined;

  // Convert decimals and return;
  return convertToPlainObject({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  });
}
