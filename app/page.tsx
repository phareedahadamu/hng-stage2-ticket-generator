import Link from "next/link";

export default function Page() {
  return (
    <section className="flex flex-col max-w-[700px] w-[99%] sm:p-[48px] p-[24px] gap-[32px] justify-center items-center bg-[#041E23] rounded-[2.5rem] border-[1px] border-[#0E464F] mt-[18px] sm:mt-[46px]">
      <div className="sm:gradientBg flex flex-col items-center justify-center gap-[1.25rem] rounded-[1.5rem] sm:border-[2px] sm:border-[#07373F] sm:max-w-[800px] sm:w-[90%] sm:p-[24px] pt-[24px] my-[80px] sm:my-[32px]">
        <h1
          className={`font-sans text-[40px] sm:text-[60px] text-white text-center`}
        >
          Your Gateway to the Best Conferences
        </h1>
        <p className="text-[1.125rem] text-[#B3B3B3] text-center">
          Explore top industry events, secure your ticket, and join the
          conversation.
        </p>
        <Link href="/events">
          <span className="block px-[20px] py-[10px] bg-[#24A0B5] text-[#FFF] rounded-[8px] text-[16px] mt-[30px] text-nowrap">
            View upcoming Events
          </span>
        </Link>
      </div>
    </section>
  );
}
