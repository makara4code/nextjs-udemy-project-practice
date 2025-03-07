import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "../actions/product.actions";

export default async function Home() {
  const latestProducts = await getLatestProducts();

  return (
    <ProductList data={latestProducts} title="Newewst Arrivals" limit={4} />
  );
}
