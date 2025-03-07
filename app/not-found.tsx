"use client";

import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image
        src="/images/logo.svg"
        width={48}
        height={48}
        alt={`${APP_NAME} logo`}
        priority
      />
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Not Found</h1>
        <p className="text-destructive">Count not find requested page</p>
        <Button asChild variant="outline" className="mt-4 ml-2">
          <Link href="/">Back To Home</Link>
        </Button>
      </div>
    </div>
  );
}
