import { getMyCart } from "@/lib/actions/cart.actions";
import CartTable from "./cart-table";
import { Cart } from "@/types";

export const metadata = {
  title: "Shopping Cart",
};

export default async function Page() {
  const cart = await getMyCart();

  return (
    <>
      <CartTable cart={cart as Cart} />
    </>
  );
}
