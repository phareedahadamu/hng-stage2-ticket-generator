import Link from "next/link";
import { conferences } from "@/lib/conferences";
export default function Page() {
  // console.log(conferences);
  const conferenceElements = conferences.map((c) => (
    <div
      key={c.id}
      className="flex justify-between items-center self-stretch gradientBg rounded-[5px] border-[2px] border-[#07373F] p-[16px] sm-[30px] "
    >
      <div className="flex flex-col items-center justify-center">
        <div className="text-[27px] sm:text-[36px]">
          <span className="font-sans text-[#FAFAFA]">{c.name}</span>
        </div>
        <div className="flex items-center justify-between  text-[12px] sm:text-[16px] ">
          <span>{c.time}</span>
          <span>{c.date}</span>
        </div>
      </div>
      <Link
        href={`/events/${c.id}`}
        className="bg-[#24A0B5] text-[#FFF] gap-[1rem] px-[15px] py-[7px] rounded-[5px] text-[12px] sm:text-[16px]"
      >
        Book Now
      </Link>
    </div>
  ));
  return (
    <section className="pt-[40px] sm:pt-[100px] text-[#B3B3B3] max-w-[800px] w-[90%] flex flex-col">
      <div className="gradientBg flex flex-col items-center justify-center gap-[1.25rem] rounded-[1.5rem] border-[2px] border-[#07373F] p-[18px] sm:p-[30px] ">
        <h1 className="text-[36px] sm:text-[50px] text-[#FFF]">
          Available Events
        </h1>
        {conferenceElements}
      </div>
    </section>
  );
}
