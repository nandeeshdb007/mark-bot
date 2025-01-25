import React from "react";
import {
  AccordionItem,
  AccordionTrigger,
  Accordion as ShasCnAccordion,
} from "../ui/accordion";
import { AccordionContent } from "@radix-ui/react-accordion";

type Props = {
  trigger: string;
  content: string;
};

const Accordion = ({ trigger, content }: Props) => {
  return (
    <ShasCnAccordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>{trigger}</AccordionTrigger>
        <AccordionContent>{content}</AccordionContent>
      </AccordionItem>
    </ShasCnAccordion>
  );
};

export default Accordion;
