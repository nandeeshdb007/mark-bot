/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { UserLoginProps, UserLoginSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "../use-toast";

export const useSignInForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const { signIn, isLoaded, setActive } = useSignIn();
  const router = useRouter();
  const methods = useForm<UserLoginProps>({
    resolver: zodResolver(UserLoginSchema),
    mode: "onChange",
  });

  const onHandleSubmit = methods.handleSubmit(
    async (values: UserLoginProps) => {
      if (!isLoaded) return;

      try {
        setLoading(true);
        const authenticated = await signIn.create({
          identifier: values.email,
          password: values.password,
        });

        if (authenticated.status == "complete") {
          await setActive({ session: authenticated.createdSessionId });
          toast({
            title: "Success",
            description: "Welcome back!",
          });
          router.push("/dashboard");
        }
      } catch (error: any) {
        setLoading(false);
        if (error.errors[0].code === "form_password_incorrect") {
          toast({
            title: "Error",
            description: "Email/Password is incorrect",
          });
        }
      }
    }
  );

  return {
    methods,
    loading,
    onHandleSubmit,
  };
};
