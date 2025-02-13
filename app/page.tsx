import Link from "next/link";

export default function Page() {
  return (
    <section className="pt-[6.25rem] flex justify-center">
      <div className="gradientBg flex flex-col items-center justify-center gap-[1.25rem] rounded-[1.5rem] border-[2px] border-[#07373F] p-[6.25rem] max-w-[800px] w-[90%]">
        <h1
          className={`font-sans text-[40px] sm:text-[60px] text-white text-center`}
        >
          Your Gateway to the Best Conferences
        </h1>
        <p className="text-[1.125rem] text-[#B3B3B3]">
          Explore top industry events, secure your ticket, and join the
          conversation.
        </p>
        <Link href="/events">
          <span className="block px-[1.875rem] py-[0.9375rem] bg-[#24A0B5] text-[#FFF] rounded-[0.3125rem] text-24px mt-[1.875rem]">
            View upcoming Events
          </span>
        </Link>
      </div>
    </section>
  );
}
