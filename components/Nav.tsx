"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  return (
    <header className="flex justify-center max-w-[75rem] w-[99%]">
      <nav className="flex justify-between items-center px-[1rem] py-[0.75rem]  w-[100%] rounded-[1.5rem] border-[1px] border-[#197686] bg-navBg backdrop-blur-[2px]">
        <Link href="/" aria-label="Link to Home Page">
          <div className="flex items-center gap-[0.5rem]">
            <div className="flex px-[0.5rem] py-[0.375rem] gap-[0.625rem] items-center justify-center rounded-[0.75rem] border-[1px] border-[#0E464F] bg-[#052F35]">
              <Image
                alt="logo icon"
                src="/logo-icon.svg"
                width={24}
                height={24}
              />
            </div>
            <Image
              alt="logo text"
              src="/logo-text.svg"
              width={43.793}
              height={22.624}
            />
          </div>
        </Link>
        <div className="sm:flex items-center gap-[1rem] hidden">
          <Link
            href="/events"
            className={
              pathname.substring(0, 7) === "/events"
                ? "text-[#FFF]"
                : "text-[#B3B3B3]"
            }
          >
            <p>Events</p>
          </Link>
          <Link
            href="/tickets"
            className={
              pathname.substring(0, 8) === "/tickets"
                ? "text-[#FFF]"
                : "text-[#B3B3B3]"
            }
          >
            <p>My Tickets</p>
          </Link>
          <Link
            href="/about"
            className={pathname === "/about" ? "text-[#FFF]" : "text-[#B3B3B3]"}
          >
            <p>About</p>
          </Link>
        </div>
        <Link href="/tickets">
          <p className="text-[#0A0C11] text-[14px] sm:text-[16px] py-[12px] px-[16px] sm:px-[24px] sm:py-[16px] rounded-[0.75rem] bg-[#FFF] border-[1px] border-ticketBtn">
            MY TICKETS →
          </p>
        </Link>
      </nav>
    </header>
  );
}
