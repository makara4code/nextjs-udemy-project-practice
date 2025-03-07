"use server";

import { LATEST_PRODUCTS_LIMIT } from "@/lib/constants";
import { convertToPlainObject } from "@/lib/utils";
import { prisma } from "@/db/primsa";
import { Product } from "@/types";

export async function getLatestProducts(): Promise<Product[]> {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });
  const plainData = convertToPlainObject(data);
  return plainData.map((product) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    category: product.category,
    images: product.images,
    brand: product.brand,
    description: product.description,
    stock: String(product.stock),         // number to string
    price: product.price,                 // already string, matches Product
    rating: product.rating,               // already string, matches Product
    isFeatured: product.isFeatured,
    banner: product.banner,
    createdAt: new Date(product.createdAt), // string to Date
  }));
}

export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({
    where: { slug: slug },
  });
}
