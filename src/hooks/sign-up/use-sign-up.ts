import { useState } from "react";
import { useToast } from "../use-toast";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { UserRegistrationProps } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const useSignUpForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const { signup, isLoaded, setActive } = useSignUp();
  const router = useRouter();
  const methods = useForm<UserRegistrationProps>({
    resolver: zodResolver(UserRegistrationProps),
  });
};
