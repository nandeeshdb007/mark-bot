import {
  ChangePasswordProps,
  ChangePasswordSchema,
} from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useTheme } from "next-themes";
import { useForm } from "react-hook-form";
import { useToast } from "../use-toast";
import { useEffect, useState } from "react";
import {
  onUpdateDomain,
  onUpdatedPassword,
  onChatBotImageUpdate,
  onUpdateWelcomeMessage,
  onDeleteUserDomain,
  onCreateHelpDeskQuestion,
  onGetAllHelpDeskQuestions,
  onCreateFilterQuestions,
  onGetAllFilterQuestions,
} from "@/actions/settings";
import {
  DomainSettingsProps,
  DomainSettingsSchema,
  FilterQuestionsProps,
  FilterQuestionsSchema,
  HelpDeskQuestionsProps,
  HelpDeskQuestionsSchema,
} from "@/schemas/settings.schema";
import { useRouter } from "next/navigation";
import { UploadClient } from "@uploadcare/upload-client";
import { metadata } from "../../app/layout";

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
    deleting,
  };
};

export const useHelpDesk = (id: string) => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<HelpDeskQuestionsProps>({
    resolver: zodResolver(HelpDeskQuestionsSchema),
    mode: "onChange",
  });

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isQuestions, setIsQuestions] = useState<
    {
      id: string;
      question: string;
      answer: string;
    }[]
  >([]);

  const onSubmitQuestionHandler = handleSubmit(async (values) => {
    setLoading(true);
    const question = await onCreateHelpDeskQuestion(
      id,
      values.question,
      values.answer
    );

    if (question) {
      setIsQuestions(question.questions!);
      toast({
        title: question.status == 200 ? "Success" : "Error",
        description: question.message,
      });
      setLoading(false);
      reset();
    }
  });

  const onGetQuestions = async () => {
    setLoading(true);
    const questions = await onGetAllHelpDeskQuestions(id);
    if (questions) {
      setIsQuestions(questions.question);
      setLoading(false);
    }
  };

  useEffect(() => {
    onGetQuestions();
  }, []);

  return {
    register,
    onSubmitQuestionHandler,
    errors,
    isQuestions,
    loading,
  };
};

export const useFilterQuestion = (id: string) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FilterQuestionsProps>({
    resolver: zodResolver(FilterQuestionsSchema),
    mode: "onChange",
  });

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isQuestions, setIsQuestions] = useState<
    {
      id: string;
      question: string;
    }[]
  >([]);

  const onAddFilterQuestions = handleSubmit(async (values) => {
    setLoading(true);
    const questions = await onCreateFilterQuestions(id, values.question);
    if (questions) {
      setIsQuestions(questions?.questions || []);
      toast({
        title: questions.status == 200 ? "Success" : "Error",
        description: questions.message,
      });
      reset();
      setLoading(false);
    }
  });

  const onGetQuestions = async () => {
    setLoading(true);
    const questions = await onGetAllFilterQuestions(id);
    if (questions) {
      setIsQuestions(questions.questions || []);
      setLoading(false);
    }
  };

  useEffect(() => {
    onGetQuestions();
  }, []);

  return {
    loading,
    isQuestions,
    onAddFilterQuestions,
    register,
    errors,
  };
};
