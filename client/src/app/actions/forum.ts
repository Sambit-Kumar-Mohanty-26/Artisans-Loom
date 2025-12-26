"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Role } from "@prisma/client";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function createPostAction(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const content = formData.get("content") as string;
  const parentId = formData.get("parentId") as string | null;

  const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!dbUser || !content) return;

  const mentionedUsers = content.match(/@\w+/g) || [];

  const post = await prisma.forumPost.create({
    data: {
      content,
      userId: dbUser.id,
      parentId: parentId || null,
      tags: mentionedUsers as string[] 
    }
  });

  if ((!parentId && (content.toLowerCase().includes("@mitra") || content.toLowerCase().includes("craft mitra"))) || 
      (parentId && (content.toLowerCase().includes("@mitra")))) {
    await generateMitraReply(content, post.id);
  }

  revalidatePath("/artisan/community");
  revalidatePath(`/artisan/profile/${dbUser.id}`);
}

export async function editPostAction(postId: string, newContent: string) {
  const { userId } = await auth();
  if (!userId) return;

  const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });
  
  const post = await prisma.forumPost.findUnique({ where: { id: postId } });
  
  if (post && post.userId === dbUser?.id) {
    await prisma.forumPost.update({
      where: { id: postId },
      data: { content: newContent }
    });
    revalidatePath("/artisan/community");
  }
}

export async function deletePostAction(postId: string) {
  const { userId } = await auth();
  if (!userId) return;

  const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!dbUser) return;

  const post = await prisma.forumPost.findUnique({ where: { id: postId } });
  
  if (post && post.userId === dbUser.id) {
    await prisma.forumPost.delete({ where: { id: postId } });
    revalidatePath("/artisan/community");
  }
}

export async function toggleFollowAction(targetUserId: string) {
  const { userId } = await auth();
  if (!userId) return;

  const currentUser = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!currentUser) return;

  const existingFollow = await prisma.follows.findUnique({
    where: {
      followerId_followingId: {
        followerId: currentUser.id,
        followingId: targetUserId
      }
    }
  });

  if (existingFollow) {
    await prisma.follows.delete({
      where: {
        followerId_followingId: {
          followerId: currentUser.id,
          followingId: targetUserId
        }
      }
    });
  } else {
    await prisma.follows.create({
      data: {
        followerId: currentUser.id,
        followingId: targetUserId
      }
    });
  }
  revalidatePath(`/profile/${targetUserId}`);
}

export async function toggleLikeAction(postId: string) {
  const { userId } = await auth();
  if (!userId) return;

  const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!dbUser) return;

  const existingLike = await prisma.forumLike.findUnique({
    where: { postId_userId: { postId, userId: dbUser.id } }
  });

  if (existingLike) {
    await prisma.forumLike.delete({ where: { id: existingLike.id } });
  } else {
    await prisma.forumLike.create({ data: { postId, userId: dbUser.id } });
  }
  
  revalidatePath("/artisan/community");
}

async function generateMitraReply(userQuery: string, parentId: string) {
  try {
    const botUser = await prisma.user.findFirst({ where: { role: Role.ADMIN } }) || await prisma.user.findFirst();

    if (!botUser) return;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
    const prompt = `
      You are Craft Mitra, the AI spirit of this community.
      A user asked: "${userQuery}"
      
      Reply as a helpful, warm, and knowledgeable guide. 
      Keep it under 280 characters. 
      Use emojis.
    `;

    const result = await model.generateContent(prompt);
    const replyText = result.response.text();

    await prisma.forumPost.create({
      data: {
        content: replyText,
        userId: botUser.id, 
        parentId: parentId,
        tags: ["AI_REPLY"]
      }
    });

  } catch (error) {
    console.error("Mitra Reply Failed:", error);
  }
}