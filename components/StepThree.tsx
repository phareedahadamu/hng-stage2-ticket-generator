"use client";
import { useEffect, useState } from "react";
import { conferences } from "@/lib/conferences";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/db/db.model";
import { useBarcode } from "next-barcode";
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
export default function StepThree(props: { idx: number }) {
  const { inputRef } = useBarcode({
    value: "12345678901234",
    options: {
      background: "transparent",
      height: 40,
      lineColor: "white",
      fontSize: 10,
      marginTop: 0,
    },
  });
  const [data, setData] = useState<User[] | null>(null);
  const conferenceInfo =
    data &&
    (data[0].event === 'Techember Fest "25' ? conferences[0] : conferences[1]);
  useEffect(() => {
    async function fetchData() {
      const ticketInfo = await db.user
        .where("id")
        .equals(Number(props.idx))
        .toArray();
      setData(ticketInfo);
    }
    fetchData();
  }, [props.idx]);
  return (
    <>
      <div className="flex flex-col self-stretch gap-[12px]">
        <div className="flex flex-col sm:flex-row gap-[12px] sm:items-center self-stretch justify-between items-start">
          <h1 className="self-stretch text-[#FFF] text-[24px] sm:text[32px] leading-[normal]">
            Ready
          </h1>
          <p className="font-mono text-[#FAFAFA] text-[16px] leading-[150%]">
            Step 3/3
          </p>
        </div>
        <progress className="h-[4px] w-[100%]" value="100" max="100">
          100%
        </progress>
      </div>
      <div className="flex flex-col gap-[1rem] items-center self-stretch ">
        <h2 className="text-[#FFF] text-[24px] sm:text-[32px] text-center font-serif">
          Your Ticket is Booked!
        </h2>
        <p className="text-[#FAFAFA] text-[1rem] text-center font-mono leading-[150%]">
          Check your email for a copy or you can download
        </p>
      </div>
      {/* here */}
      <div className="my-[2rem] w-[18.75rem] h-[37.5rem] border-[#24A0B5] border-[1px] gradientBg flex flex-col items-center justify-center gap-[1rem] relative">
        <div className="absolute h-[15px] w-[15px] top-[-1px] bg-[#041E23] rounded-br-[15px] left-[-1px] ellipse1"></div>
        <div className="absolute h-[15px] w-[15px] top-[-1px] bg-[#041E23] rounded-bl-[15px] right-[-1px] ellipse2"></div>
        <div className="absolute h-[15px] w-[15px] bottom-[-1px] bg-[#041E23] rounded-tr-[15px] left-[-1px] ellipse3"></div>
        <div className="absolute h-[15px] w-[15px] bottom-[-1px] bg-[#041E23] rounded-tl-[15px] right-[-1px] ellipse4"></div>
        <div className="absolute h-[30px] w-[15px] bottom-[110px] bg-[#041E23] rounded-r-[15px] left-[-1px] ellipse5"></div>
        <div className="absolute h-[30px] w-[15px] bottom-[110px] bg-[#041E23] rounded-l-[15px] right-[-1px] ellipse6"></div>
        <div className="p-[1.1428571429rem] flex flex-col items-center w-[16.25rem] gap-[20px] border-[#24A0B5] rounded-[1rem] border-[1px] gradientBg2 justify-between">
          <div className="flex flex-col items-center w-[10.9375rem]">
            <h2 className="text-[#FFF] font-sans text-center text-[2.125rem] leading-[100%]">
              {data !== null ? data[0].event : "Event Name"}
            </h2>
            <div className="flex flex-col justify-center items-center p-[4px] gap-[4px]">
              <p className="leading-[150%] font-mono text-[0.625rem] text-[#FFF]">
                📍
                {conferenceInfo ? conferenceInfo.location : "Event location"}
              </p>
              <p className="leading-[150%] font-mono text-[0.625rem] text-[#FFF]">
                📅
                {conferenceInfo ? conferenceInfo.date : "Event Date"} |
                {conferenceInfo ? conferenceInfo.time : "Event Time"}
              </p>
            </div>
          </div>
          <div className="w-[8.75rem] h-[8.75rem] rounded-[0.75rem] border-[4px] border-lightBorder">
            {data && (
              <Image
                className="w-[8.25rem] h-[8.25rem] rounded-[0.5rem] object-cover object-center"
                priority
                alt="profile pic"
                src={data[0].imageUrl}
                width={data[0].imageWidth}
                height={data[0].imageHeight}
              />
            )}
          </div>
          <div className="flex flex-col justify-center items-center self-stretch p-[4px] rounded-[8px] border-[#133D44] border-[1px] bg-[rgb(8,52,60)]">
            {/* one */}
            <div className="flex border-b-[#12464E] border-b-[1px] self-stretch truncate">
              <div className="flex flex-col p-[4px] items-start justify-center border-r-[#12464E] border-r-[1px] basis-[50%] grow">
                <p className="font-mono text-[#a09f9f] text-[0.625rem] leading-[150%]">
                  Name
                </p>
                <p className="font-mono text-[#FFF] text-[0.75rem] leading-[150%] font-[700]">
                  {data !== null ? data[0].name : "Your name"}
                </p>
              </div>
              <div className="flex flex-col p-[4px] items-start justify-center  basis-[50%] shrink max-w-[106.13px] w-[100%] ">
                <p className="font-mono text-[#a09f9f] text-[0.625rem] leading-[150%]">
                  Email
                </p>
                <p className="email font-mono text-[#FFF] text-[0.75rem] leading-[150%] font-[700]">
                  {data !== null ? data[0].email : "Your email"}
                </p>
              </div>
            </div>
            {/* two */}
            <div className="flex border-b-[#12464E] border-b-[1px] self-stretch">
              <div className="flex flex-col p-[4px] items-start justify-center border-r-[#12464E] border-r-[1px] basis-[50%] ">
                <p className="font-mono text-[#a09f9f] text-[0.625rem] leading-[150%]">
                  Ticket Type
                </p>
                <p className="font-mono text-[#FFF] text-[0.625rem] leading-[150%]">
                  {data !== null ? data[0].ticketType : "Ticket type"}
                </p>
              </div>
              <div className="flex flex-col p-[4px] items-start justify-center basis-[50%]">
                <p className="font-mono text-[#a09f9f] text-[0.625rem] leading-[150%]">
                  Ticket for
                </p>
                <p className="font-mono text-[#FFF] text-[0.625rem] leading-[150%]">
                  {data !== null ? data[0].quantity : "Ticket quantity"}
                </p>
              </div>
            </div>
            {/* three */}
            <div className="flex flex-col p-[4px] items-start justify-start self-stretch">
              <p className="font-mono text-[#a09f9f] text-[0.625rem] leading-[150%] text-start">
                Special request
              </p>
              <p className="font-mono text-[#FFF] text-[0.625rem] leading-[150%] text-start">
                {data !== null ? data[0].request : "Special request"}
              </p>
            </div>
          </div>
        </div>
        <div className="h-[8px] border-[2px] border-dashed border-[#12464E] w-[100%]"></div>
        <svg className="text-white" ref={inputRef} />
      </div>
      <div className="flex flex-col sm:flex-row gap-[16px] items-start self-stretch sm:h-[48px] sm:justify-end sm:gap-[24px]">
        <Link
          className="self-stretch px-[24px] py-[12px] text-center rounded-[8px] border-[1px] border-[#24A0B5] leading-[150%] text-[#24A0B5] text-[16px] sm:grow"
          href="/events"
        >
          Book Another Ticket
        </Link>
        <button
          onClick={() => {
            alert("Your Ticket has been downloaded successfully.");
          }}
          className="self-stretch px-[24px] py-[12px] text-center rounded-[8px] bg-[#24A0B5] leading-[150%] text-[#FFF] text-[16px] sm:grow"
        >
          Download
        </button>
      </div>
    </>
  );
}
