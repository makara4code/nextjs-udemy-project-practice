"use server";

import { signInFormSchema } from "../validator";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcrypt-ts-edge";
import { prisma } from "@/db/primsa";
import { signUpFormSchema } from "../validator";

// Sign in the user with credentials
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", user);

    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message: "Invalid email or password",
    };
  }
}

// Sign user out
export async function signOutUser() {
  await signOut();
}

// Signup User
export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const validatedFields = signUpFormSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    if (!validatedFields.success) {
      const fieldErrors = validatedFields.error.flatten().fieldErrors;
      return {
        success: false,
        errors: Object.values(fieldErrors),
        message: "Unable to register user",
      };
    }

    const plainPassword = validatedFields.data.password;
    const hashedPassword = hashSync(validatedFields.data.password, 10);

    await prisma.user.create({
      data: {
        name: validatedFields.data.name,
        email: validatedFields.data.email,
        password: hashedPassword,
      },
    });

    await signIn("credentials", {
      email: validatedFields.data.email,
      password: plainPassword,
    });

    return {
      success: true,
      errors: [],
      message: "User registered successfully",
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: "Unable to register user", errors: [] };
  }
}
