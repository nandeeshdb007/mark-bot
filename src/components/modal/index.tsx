import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

type Props = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  title: string;
  description: string;
  type?: "Integration";
  logo?: string;
};

const Modal = ({
  trigger,
  children,
  title,
  description,
  type,
  logo,
}: Props) => {
  switch (type) {
    case "Integration":
      return (
        <Dialog>
          <DialogTrigger asChild>{trigger}</DialogTrigger>
          <DialogContent>
            <div className="flex justify-center gap-3">
              <div className="w-12 h-12 relative">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 110 110"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 3.375C0 1.51104 1.51104 0 3.375 0H105.875C107.739 0 109.25 1.51104 109.25 3.375V94.95C109.25 96.814 107.739 98.325 105.875 98.325H3.375C1.51104 98.325 0 96.814 0 94.95V3.375ZM38.2375 16.3875C38.2375 19.4044 35.7919 21.85 32.775 21.85C29.7581 21.85 27.3125 19.4044 27.3125 16.3875C27.3125 13.3706 29.7581 10.925 32.775 10.925C35.7919 10.925 38.2375 13.3706 38.2375 16.3875ZM76.475 21.85C79.4919 21.85 81.9375 19.4044 81.9375 16.3875C81.9375 13.3706 79.4919 10.925 76.475 10.925C73.4581 10.925 71.0125 13.3706 71.0125 16.3875C71.0125 19.4044 73.4581 21.85 76.475 21.85Z"
                    fill="#FFC90C"
                  />
                  <rect
                    y="27.3125"
                    width="109.25"
                    height="81.9375"
                    rx="3.375"
                    fill="#FFA947"
                  />
                  <path
                    d="M38.2375 38.2375C44.1966 50.2938 62.0739 55.1163 71.0126 38.2375"
                    stroke="white"
                    strokeWidth="1.125"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="text-gray-400">
                <ArrowLeft size={20} />
                <ArrowRight size={20} />
              </div>
              <div className="w-12 h-12 relative">
                <Image
                  src={`https://ucarecdn.com/${logo}/`}
                  fill
                  alt="Stripe"
                />
              </div>
            </div>
            <DialogHeader className="flex items-center">
              <DialogTitle className="text-xl">{title}</DialogTitle>
              <DialogDescription className=" text-center">
                {description}
              </DialogDescription>
            </DialogHeader>
            {children}
          </DialogContent>
        </Dialog>
      );
    default:
      return (
        <Dialog>
          <DialogTrigger asChild>{trigger}</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-xl">{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            {children}
          </DialogContent>
        </Dialog>
      );
  }
};

export default Modal;
