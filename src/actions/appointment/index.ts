"use server";

import { client } from "@/lib/prisma";

export const onDomainCustomerResponses = async (customerId: string) => {
  try {
    const customerQuestions = await client.customer.findUnique({
      where: {
        id: customerId,
      },
      select: {
        email: true,
        questions: {
          select: {
            id: true,
            question: true,
            answered: true,
          },
        },
      },
    });
    if (customerQuestions) {
      return customerQuestions;
    }
  } catch (error) {
    console.log("onDomainCustomerResponses", error);
  }
};

export const onGetAllDomainBookings = async (domainId: string) => {
  try {
    const bookings = await client.bookings.findMany({
      where: { id: domainId },
      select: {
        slot: true,
        date: true,
      },
    });
    if (bookings) {
      return bookings;
    }
  } catch (error) {
    console.log("onGetAllDomainBookings", error);
  }
};
