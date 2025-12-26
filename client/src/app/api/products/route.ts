import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    
    const category = searchParams.get("category");
    const material = searchParams.get("material");
    const region = searchParams.get("region");
    const minPrice = parseFloat(searchParams.get("min") || "0");
    const maxPrice = parseFloat(searchParams.get("max") || "9999999");

    const where: any = {
      price: { gte: minPrice, lte: maxPrice },
    };

    if (category && category !== "All") where.category = category;

    // FIX 1: Material is a String[] in your schema
    if (material && material !== "All") {
      where.materials = { has: material };
    }

    // FIX 2: Region is stored in Artisan -> Profile -> state
    if (region && region !== "All") {
      where.artisan = {
        profile: {
          state: region
        }
      };
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        artisan: {
          include: { profile: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Fetch Error:", error);
    return NextResponse.json({ error: "Database query failed" }, { status: 500 });
  }
}