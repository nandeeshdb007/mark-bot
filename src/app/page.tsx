"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn === true) {
      router.push("/dashboard");
    } else if (isSignedIn === false) {
      router.push("/auth/sign-in");
    }
  }, [isSignedIn, router]);

  return null;
}
