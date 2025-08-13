import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { googleLoginApi } from "@/services/authApi";
import { ApiError } from "@/types/error";

export async function POST(req: Request) {
  try {
    const { credential } = await req.json();
    const response = await googleLoginApi(credential);

    (await cookies()).set({
      name: process.env.NEXT_PUBLIC_TOKEN_NAME || "nanubhai",
      value: response.access_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });

    return NextResponse.json({
      success: true,
      user: response.user,
    });
  } catch (err) {
    const error = err instanceof Error ? err : new Error("Something went wrong");
    const status = err instanceof ApiError ? err.status : 500;
    
    return NextResponse.json(
      { success: false, message: error.message },
      { status }
    );
  }
}
