/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { onDomainCustomerResponses } from "@/actions/appointment";
import { onGetDomainProductsAndConnectedAccountId } from "@/actions/payments";
import PortalForm from "@/components/forms/portal/portal-form";
import React from "react";

const CustomerPaymentPage = async ({
  params,
}: {
  params: { domainid: string; customerid: string };
}) => {
  const { domainid, customerid } = await params;
  const questions = await onDomainCustomerResponses(customerid);
  const products = await onGetDomainProductsAndConnectedAccountId(domainid);

  if (!questions) return null;

  return (
    <PortalForm
      email={questions.email!}
      products={products?.products}
      amount={products?.amount}
      domainid={domainid}
      customerId={customerid}
      questions={questions.questions}
      stripeId={products?.stripeId!}
      type="Payment"
    />
  );
};

export default CustomerPaymentPage;
