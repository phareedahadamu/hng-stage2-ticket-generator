import Link from "next/link";
import { conferences } from "@/lib/conferences";
export default function Page() {
  // console.log(conferences);
  const conferenceElements = conferences.map((c) => (
    <div
      key={c.id}
      className="flex flex-col sm:flex-row justify-between gap-[16px] items-center self-stretch gradientBg rounded-[5px] border-[2px] border-[#07373F] p-[16px] sm-[30px] "
    >
      <div className="flex flex-col items-center justify-center">
        <div className="text-[36px]">
          <span className="font-sans text-[#cacaca] leading-snug">
            {c.name}
          </span>
        </div>
        <div className="flex items-center justify-between  text-[16px] text-[#cacaca]">
          <span>{c.time}</span> <span> | </span>
          <span>{c.date}</span>
        </div>
      </div>
      <Link
        href={`/events/${c.id}`}
        className="bg-[#24A0B5] text-[#FFF] gap-[1rem] px-[15px] py-[7px] rounded-[5px] text-[16px] sm:text-[16px] self-stretch text-center"
      >
        Book Now
      </Link>
    </div>
  ));
  return (
    <section className="flex flex-col max-w-[700px] w-[99%] sm:p-[48px] p-[24px] gap-[32px] justify-center items-center bg-[#041E23] rounded-[2.5rem] border-[1px] border-[#0E464F] mt-[18px] sm:mt-[46px]">
      <div className="sm:gradientBg flex flex-col items-center justify-center gap-[1.25rem] rounded-[1.5rem] sm:border-[2px] sm:border-[#07373F] sm:max-w-[800px] sm:w-[90%] sm:p-[24px] pt-[24px] my-[80px] sm:my-[32px]">
        <h1 className="text-[36px] sm:text-[50px] text-[#FFF]">
          Available Events
        </h1>
        {conferenceElements}
      </div>
    </section>
  );
}
