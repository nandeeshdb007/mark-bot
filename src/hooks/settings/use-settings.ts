import {
  ChangePasswordProps,
  ChangePasswordSchema,
} from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useTheme } from "next-themes";
import { useForm } from "react-hook-form";
import { useToast } from "../use-toast";
import { useState } from "react";
import {
  onUpdateDomain,
  onUpdatedPassword,
  onChatBotImageUpdate,
  onUpdateWelcomeMessage,
  onDeleteUserDomain,
} from "@/actions/settings";
import {
  DomainSettingsProps,
  DomainSettingsSchema,
} from "@/schemas/settings.schema";
import { useRouter } from "next/navigation";
import { UploadClient } from "@uploadcare/upload-client";

const upload = new UploadClient({
  publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string,
});

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
      console.log("onChangePassword", error);
    }
  });

  return {
    register,
    errors,
    loading,
    onChangePassword,
  };
};

export const useSettings = (id: string) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<DomainSettingsProps>({
    resolver: zodResolver(DomainSettingsSchema),
    mode: "onChange",
  });

  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoadig] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  const onUpdateSettings = handleSubmit(async (values) => {
    setLoadig(true);
    if (values.domain) {
      const domain = await onUpdateDomain(id, values.domain);
      if (domain) toast({ title: "Success", description: domain.message });
    }
    if (values.image[0]) {
      const uploaded = await upload.uploadFile(values.image[0]);
      const image = await onChatBotImageUpdate(id, uploaded.uuid);
      if (image) {
        toast({
          title: image.status == 200 ? "Success" : "Error",
          description: image.message,
        });
        setLoadig(false);
      }
    }

    if (values.welcomeMessage) {
      const message = await onUpdateWelcomeMessage(values.welcomeMessage, id);
      if (message) {
        toast({
          title: "Success",
          description: message.message,
        });
      }
    }

    reset();
    router.refresh();
    setLoadig(false);
  });

  const onDeleteDomain = async () => {
    setDeleting(true);
    const deleted = await onDeleteUserDomain(id);
    if (deleted) {
      toast({ title: "Sucess", description: deleted.message });
      setDeleting(false);
      router.refresh();
    }
  };

  return {
    register,
    onUpdateSettings,
    errors,
    loading,
    onDeleteDomain,
    deleting
  }
};
