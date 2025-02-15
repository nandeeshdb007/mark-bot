import { onGetCurrentDomainInfo } from "@/actions/settings";
import BotTrainingForm from "@/components/forms/settings/bot-training";
import SettingsForm from "@/components/forms/settings/form";
import InfoBar from "@/components/infobar";
import ProductsTable from "@/components/products";
import { redirect } from "next/navigation";
import React from "react";

type Props = { params: { domain: string } };

const DomainSettingsPage = async ({ params }: Props) => {
  const { domain } = await params;
  const currentDomain = await onGetCurrentDomainInfo(domain);

  if (!currentDomain) redirect("/dashboard");

  return (
    <>
      <InfoBar />
      <div className="overflow-y-auto w-full chat-window flex-1 h-0">
        <SettingsForm
          plan={currentDomain.subscription?.plan ?? "STANDARD"}
          chatBot={currentDomain.domains[0].chatBot}
          id={currentDomain.domains[0].id}
          name={currentDomain.domains[0].name}
        />
        <BotTrainingForm id={currentDomain.domains[0].id} />
        <ProductsTable
          id={currentDomain.domains[0].id}
          products={
            currentDomain.domains.find((d) => d.name === domain)?.products ?? []
          }
        />
      </div>
    </>
  );
};

export default DomainSettingsPage;
