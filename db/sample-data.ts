import { Product } from "@/types";
import { v4 as uuidv4 } from "uuid"; // Optional: install uuid if you want unique IDs

const sampleData: { products: Product[] } = {
  products: [
    {
      id: uuidv4(), // or "9f10e0e1-f2c9-4b41-bb24-ec951f534f6c" for consistency
      name: "Polo Sporting Stretch Shirt",
      slug: "polo-sporting-stretch-shirt",
      category: "Men's Dress Shirts",
      description: "Classic Polo style with modern comfort",
      images: [
        "/images/sample-products/p1-1.jpg",
        "/images/sample-products/p1-2.jpg",
      ],
      price: "59.99", // number to string
      brand: "Polo",
      rating: "4.5", // number to string
      stock: "005", // number to string, padded to 3 chars
      isFeatured: true,
      banner: "banner-1.jpg",
      createdAt: new Date("2025-03-07T03:03:32.925Z"), // Add Date
    },
    {
      id: uuidv4(), // or "4adb4d23-a305-4942-8074-2a79c6d13f12"
      name: "Brooks Brothers Long Sleeved Shirt",
      slug: "brooks-brothers-long-sleeved-shirt",
      category: "Men's Dress Shirts",
      description: "Timeless style and premium comfort",
      images: [
        "/images/sample-products/p2-1.jpg",
        "/images/sample-products/p2-2.jpg",
      ],
      price: "85.90", // number to string, fixed to 2 decimals
      brand: "Brooks Brothers",
      rating: "4.2", // number to string
      stock: "010", // number to string, padded
      isFeatured: true,
      banner: "banner-2.jpg",
      createdAt: new Date("2025-03-07T03:03:32.925Z"),
    },
    {
      id: uuidv4(), // or "148fd014-a54f-4a38-98a3-8702c99f9088"
      name: "Tommy Hilfiger Classic Fit Dress Shirt",
      slug: "tommy-hilfiger-classic-fit-dress-shirt",
      category: "Men's Dress Shirts",
      description: "A perfect blend of sophistication and comfort",
      images: [
        "/images/sample-products/p3-1.jpg",
        "/images/sample-products/p3-2.jpg",
      ],
      price: "99.95", // number to string
      brand: "Tommy Hilfiger",
      rating: "4.9", // number to string
      stock: "000", // number to string, padded
      isFeatured: false,
      banner: null,
      createdAt: new Date("2025-03-07T03:03:32.925Z"),
    },
    {
      id: uuidv4(), // or "6749a35e-b4ac-4612-9092-3cea6b59db93"
      name: "Calvin Klein Slim Fit Stretch Shirt",
      slug: "calvin-klein-slim-fit-stretch-shirt",
      category: "Men's Dress Shirts",
      description: "Streamlined design with flexible stretch fabric",
      images: [
        "/images/sample-products/p4-1.jpg",
        "/images/sample-products/p4-2.jpg",
      ],
      price: "39.95", // number to string
      brand: "Calvin Klein",
      rating: "3.6", // number to string
      stock: "010", // number to string, padded
      isFeatured: false,
      banner: null,
      createdAt: new Date("2025-03-07T03:03:32.925Z"),
    },
    {
      id: uuidv4(), // or "8d405908-2f05-4154-a3d2-3c449079a47f"
      name: "Polo Ralph Lauren Oxford Shirt",
      slug: "polo-ralph-lauren-oxford-shirt",
      category: "Men's Dress Shirts",
      description: "Iconic Polo design with refined oxford fabric",
      images: [
        "/images/sample-products/p5-1.jpg",
        "/images/sample-products/p5-2.jpg",
      ],
      price: "79.99", // number to string
      brand: "Polo",
      rating: "4.7", // number to string
      stock: "006", // number to string, padded
      isFeatured: false,
      banner: null,
      createdAt: new Date("2025-03-07T03:03:32.925Z"),
    },
    {
      id: uuidv4(), // or "a0c7a3e7-85ce-46a0-84bc-7ca646b62df9"
      name: "Polo Classic Pink Hoodie",
      slug: "polo-classic-pink-hoodie",
      category: "Men's Sweatshirts",
      description: "Soft, stylish, and perfect for laid-back days",
      images: [
        "/images/sample-products/p6-1.jpg",
        "/images/sample-products/p6-2.jpg",
      ],
      price: "99.99", // number to string
      brand: "Polo",
      rating: "4.6", // number to string
      stock: "008", // number to string, padded
      isFeatured: true,
      banner: null,
      createdAt: new Date("2025-03-07T03:03:32.925Z"),
    },
  ],
};

export default sampleData;