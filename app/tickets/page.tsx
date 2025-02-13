"use client";
import { db } from "@/db/db.model";
import { useState, useEffect } from "react";
import Link from "next/link";

interface User {
  id?: number;
  name: string;
  email: string;
  request: string;
  imageUrl: string;
  quantity: number;
  ticketType: string;
  imageWidth: number;
  imageHeight: number;
  event: string;
  dateBooked: string;
}
export default function Page() {
  const [data, setData] = useState<User[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const dataList = await db.user.toArray();
      setData(dataList);
    }
    fetchData();
  }, []);
  const elements = data
    ? data.map((d) => (
        <div
          key={d.id}
          className="flex self-stretch p-[1.5rem] rounded-[8px] gradientBg border-borderColor border-[1px] justify-between items-center"
        >
          <div className="basis-[70%] flex flex-col gap-[0.6rem] font-serif text-[#d1d1d1]">
            <h1 className="font-sans text-[2.5rem] text-[#FFF] leading-[100%]">
              {d.event}
            </h1>
            <p>Booked: {d.dateBooked.slice(0, -40)}</p>
            <div className="flex self-stretch justify-start gap-[3rem]">
              <p>Type: {d.ticketType.toUpperCase()}</p>
              <p>Ticket for: {d.quantity}</p>
            </div>
          </div>
          <Link className="basis-[30%]" href={`/tickets/${Number(d.id)}`}>
            <p className="bg-borderColor rounded-[8px] px-[1.5rem] py-[8px] text-center text-[#FFF] font-serif">
              View Ticket
            </p>
          </Link>
        </div>
      ))
    : null;

  return (
    <section className="flex flex-col max-w-[43.75rem] w-[100%] p-[3rem] gap-[2rem] justify-center items-center bg-[#041E23] rounded-[2.5rem] border-[1px] border-[#0E464F] mt-[2.875rem]">
      <h1 className="text-[36px] text-[#FFF]">Your Tickets</h1>
      {data && <>{elements}</>}
    </section>
  );
}
