"use client";
import Section from "@/components/section-label";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";
import React from "react";

type Props = {
  id: string;
};

const CodeSnippet = ({ id }: Props) => {
  const { toast } = useToast();
  const PRODUCTION_URL = process.env.NEXT_PUBLIC_PRODUCTION_URL as string;

  const snippet = `
    const iframe = document.createElement("iframe");

    const iframeStyles = (styleString) => {
      const style = document.createElement('style');
      style.textContent = styleString;
      document.head.append(style);
    };

    iframeStyles(\`
      .chat-frame {
        position: fixed;
        bottom: 50px;
        right: 50px;
        border: none;
      }
    \`);

    iframe.src = "${PRODUCTION_URL}/chatbot";
    iframe.classList.add('chat-frame');
    document.body.appendChild(iframe);

    window.addEventListener("message", (e) => {
      if (e.origin !== "${PRODUCTION_URL}") return null;
      let dimensions = JSON.parse(e.data);
      iframe.width = dimensions.width;
      iframe.height = dimensions.height;
      iframe.contentWindow.postMessage("${id}", "${PRODUCTION_URL}/");
    });
  `;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      toast({
        title: "Copied to clipboard",
        description: "You can now paste the code inside your website",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please try again or check clipboard permissions",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-10 flex flex-col gap-5 items-start">
      <Section
        label="Code snippet"
        message="Copy and paste this code snippet into the header tag of your website"
      />
      <div className="bg-gray-100 px-10 py-5 rounded-lg relative overflow-auto">
        <Copy
          className="absolute top-5 right-5 text-gray-400 cursor-pointer"
          onClick={handleCopy}
        />
        <pre className="text-gray-500 whitespace-pre-wrap">
          <code>{snippet}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeSnippet;
