import {
  ChangePasswordProps,
  ChangePasswordSchema,
} from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useTheme } from "next-themes";
import { useForm } from "react-hook-form";
import { useToast } from "../use-toast";
import { useState } from "react";
import { onUpdatedPassword } from "@/actions/settings";

// export const useThemeMode = () => {
//   const { setTheme, theme, resolvedTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   return {
//     setTheme,
//     theme: mounted ? theme || resolvedTheme : "light", // Prevent SSR mismatch
//   };
// };

export const useChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordProps>({
    resolver: zodResolver(ChangePasswordSchema),
    mode: "onChange",
  });

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onChangePassword = handleSubmit(async (values) => {
    try {
      setLoading(true);
      const updated = await onUpdatedPassword(values.password);
      if (updated?.status == 200) {
        reset();
        setLoading(false);
        toast({ title: "Success", description: updated.message });
      }
    } catch (error) {
      console.log("onChangePassword", onChangePassword);
    }
  });

  return {
    register,
    errors,
    loading,
    onChangePassword,
  };
};
