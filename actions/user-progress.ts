"use server";

import db from "@/db/drizzle";
import { redirect } from "next/navigation";
import { getCourseById, getUserProgress } from "@/db/queries";
import { userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";


export const upsertUserProgress = async(courseId: number) => {
    const {userId} = await auth();
    const user = await currentUser();

    // check user authorization
    if(!userId || !user ){
        throw new Error("Unauthorized");
    }

    const course = await getCourseById(courseId);

    if(!course) {
        throw new Error("Course not found");
    }

    const existingUserProgress = await getUserProgress();

    // if user already has a progress then update the progress,else insert a new progress
    if(existingUserProgress) {
        await db.update(userProgress).set({
            activeCourseId: courseId,
            userName: user.firstName || "User",
            userImageSrc: user.imageUrl || "/mascot.svg",
        });

        // to insert and update data again not use cached data

        revalidatePath("/courses")
        revalidatePath("/learn")
        redirect("/learn")

    }

    // insert new progress
    await db.insert(userProgress).values({
        userId,
        activeCourseId: courseId,
        userName: user.firstName || "User",
        userImageSrc: user.imageUrl || "/mascot.svg",
    });

    // to insert and update data again not use cached data

    revalidatePath("/courses")
    revalidatePath("/learn")
    redirect("/learn")
}