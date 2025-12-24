"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function onboardCustomerAction(formData: FormData) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const craftTypes = formData.get("craftTypes")?.toString().split(",").map(s => s.trim()) || [];
  const budget = formData.get("budget")?.toString();

  // Update the user record in Prisma
  await prisma.user.update({
    where: { clerkId: userId },
    data: {
      role: "CUSTOMER",
      preferences: {
        favoriteCrafts: craftTypes,
        budget: budget
      }
    },
  });

  // Redirect to the shop once finished
  redirect("/shop");
}

export async function onboardArtisanAction(formData: FormData) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const businessName = formData.get("businessName")?.toString();
  const craftType = formData.get("craftType")?.toString();
  const yearsOfExperience = parseInt(formData.get("yearsOfExperience")?.toString() || "0");
  const location = formData.get("location")?.toString();
  const bio = formData.get("bio")?.toString();

  // Update the user record in Prisma
  await prisma.user.update({
    where: { clerkId: userId },
    data: {
      role: "ARTISAN",
      profile: {
        create: {
          businessName,
          craftType,
          yearsOfExperience,
          location,
          bio
        }
      }
    },
  });

  // Redirect to the shop once finished
  redirect("/shop");
}