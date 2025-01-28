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

export const onBookNewAppointment = async (
  domainId: string,
  customerId: string,
  slot: string,
  date: string,
  email: string
) => {
  try {
    const booking = await client.customer.update({
      where: {
        id: customerId,
      },
      data: {
        booking: {
          create: {
            domainId,
            slot,
            date,
            email,
          },
        },
      },
    });

    if (booking) {
      return {
        status: 200,
        message: "Booking created",
      };
    }
  } catch (error) {
    console.log("onBookNewAppointment", error);
  }
};
