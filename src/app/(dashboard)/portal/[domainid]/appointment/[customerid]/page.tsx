import { onDomainCustomerResponses, onGetAllDomainBookings } from "@/actions/appointment";
import PortalForm from "@/components/forms/portal/portal-form";
import React from "react";

type Props = {
  params: Promise<{
    domainid: string;
    customerid: string;
  }>;
};

const CustomerSignUpForm = async ({ params }: Props) => {
  
  const resolvedParams = await params;
  
  const questions = await onDomainCustomerResponses(resolvedParams.customerid);
  const bookings = await onGetAllDomainBookings(resolvedParams.domainid);

  if (!questions) return null;

  return (
    <PortalForm
      bookings={bookings}
      email={questions.email!}
      domainId={resolvedParams.domainid}
      customerId={resolvedParams.customerid}
      questions={questions.questions}
      type="Appointment"
    />
  );
};

export default CustomerSignUpForm;