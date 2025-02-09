/* eslint-disable @typescript-eslint/no-unused-expressions */
import { onGetAllBookingsForCurrentUser } from "@/actions/appointment";
import AllAppointments from "@/components/appointments/all-appointments";
import InfoBar from "@/components/infobar";
import Section from "@/components/section-label";
import { Card, CardContent } from "@/components/ui/card";
import { currentUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-separator";
import React from "react";

const AppointmentPage = async () => {
  const user = await currentUser();
  if (!user) return null;
  const domainBookings = await onGetAllBookingsForCurrentUser(user.id);
  const today = new Date();

  if (!domainBookings) {
    return (
      <div className="w-full flex justify-center">
        <p>No Appointments Today</p>
      </div>
    );
  }

  const bookingsExistToday = domainBookings.bookings.filter((booking) => {
    booking.date.getTime() === today.getTime();
  });
  return (
    <>
      <InfoBar />
      <div className="grid grid-cols-1 lg:grid-cols-3 flex-1 h-0 gap-5">
        <div className="lg:col-span-2 overflow-y-auto">
          <AllAppointments bookings={domainBookings?.bookings} />
        </div>
        <div className="col-span-1">
          <Section
            label="Bookings For Today"
            message="All your bookings for today are mentioned below."
          />
          {bookingsExistToday?.length ? (
            bookingsExistToday?.map((booking) => (
              <Card
                key={booking.id}
                className="rounded-xl overflow-hidden mt-4"
              >
                <CardContent className="p-0 flex">
                  <div className="w-4/12 text-xl bg-peach py-10 flex justify-center items-center font-bold">
                    {booking.slot}
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between w-full p-3">
                      <p className="text-sm">
                        created
                        <br />
                        {booking.createdAt.getHours()}{" "}
                        {booking.createdAt.getMinutes()}{" "}
                        {booking.createdAt.getHours() > 12 ? "PM" : "AM"}
                      </p>
                      <p className="text-sm">
                        Domain <br />
                        {booking.Customer?.Domain?.name}
                      </p>
                    </div>
                    <Separator orientation="horizontal" />
                    <div className="w-full flex items-center p-3 gap-2">
                      <Avatar>
                        <AvatarFallback>{booking.email[0]}</AvatarFallback>
                      </Avatar>
                      <p className="text-sm">{booking.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="w-full flex justify-center">
              <p>No Appointments For Today</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AppointmentPage;
