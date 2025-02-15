"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { conferences } from "@/lib/conferences";
import { db2 } from "@/db/db.model";
import { redirect } from "next/navigation";
export default function StepOne(props: { idx: number }) {
  const qtyLabel = useRef<HTMLLabelElement>(null);
  const conferenceElement = conferences[props.idx - 1];
  const [error, setError] = useState<boolean>(false);
  const [active, setActive] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [allTicketQty, setAllTicketQty] = useState<number[]>([]);
  const [tQty, setTQty] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const currentqty = await db2.tickets
        .where("id")
        .equals(Number(props.idx))
        .toArray();
      setAllTicketQty([
        currentqty[0].free,
        currentqty[0].vip,
        currentqty[0].vvip,
      ]);
    }
    fetchData();
    window.localStorage.setItem("eventIdx", String(props.idx));
  }, [props.idx]);
  useEffect(() => {
    const savedType = window.localStorage.getItem("ticketType");
    setActive(savedType ? savedType : "none");
    const savedQty = window.localStorage.getItem("ticketQty");
    setTQty(savedQty ? savedQty : "1");
  }, []);
  useEffect(() => {
    if (tQty !== null) window.localStorage.setItem("ticketQty", tQty);
  }, [tQty]);
  useEffect(() => {
    if (active !== null) window.localStorage.setItem("ticketType", active);
  }, [active]);
  // console.log(props.idx);
  return (
    <>
      <div className="flex flex-col self-stretch gap-[12px]">
        <div className="flex flex-col sm:flex-row gap-[12px] sm:items-center self-stretch justify-between items-start">
          <h1 className="self-stretch text-[#FFF] text-[24px] sm:text[32px] leading-[normal]">
            Ticket Selection
          </h1>
          <p className="font-mono text-[#FAFAFA] text-[16px] leading-[150%]">
            Step 1/3
          </p>
        </div>
        <progress className="h-[4px] w-[100%]" value="33" max="100">
          33%
        </progress>
      </div>
      <div className="gap-[32px] flex flex-col  sm:p-[24px] sm:items-start sm:justify-between sm:self-stretch sm:border-[1px] sm:border-[#0E464F] sm:bg-[#08252B] sm:rounded-[32px]">
        <div className="flex flex-col h-[243px] px-[16px] pt-[24px] justify-between items-center self-stretch rounded-[24px] border-r-[2px] border-r-[#07373F] border-b-[2px] border-b-[#07373F] gradientBg gap-[8px] sm:justify-start sm:p-[24px]">
          <h2 className="text-[#FAFAFA] text-center font-sans text-[48px] sm:text-[62px] leading-none text-nowrap">
            {conferenceElement.name}
          </h2>
          <p className=" description font-mono text-[14px] sm:text-[16px] text-[#FAFAFA] text-center leading-[150%] sm:max-w-[300px] sm:w-[900%]">
            {conferenceElement.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-[4px] sm:gap-[16px] items-center sm:justify-center sm:items-start font-mono text-[16px] text-[#FAFAFA] text-center leading-[150%] self-stretch mb-[24px]">
            <p className="text-nowrap">📍{conferenceElement.location}</p>
            <p className="hidden sm:block">||</p>
            <p>
              {conferenceElement.date} | {conferenceElement.time}
            </p>
          </div>
        </div>
        <div className="h-[4px] bg-[#07373F] self-stretch"></div>
        <form
          className="flex flex-col justify-center align-start gap-[32px] self-stretch"
          id="step1"
          action={() => {
            setLoading(true);
            if (active === "none") {
              setError(true);
              if (qtyLabel.current !== null) {
                qtyLabel.current.scrollIntoView();
              }
              setLoading(false);
              return;
            }

            setLoading(false);
            redirect(`/events/confirm`);
          }}
        >
          <div className="flex flex-col gap-[8px]">
            <label
              htmlFor="ticketType"
              className={`font-mono text-[16px] ${
                error ? "text-red-500 animate-pulse" : "text-[#FAFAFA]"
              } self-stretch leading-[150%]`}
              ref={qtyLabel}
            >
              Select Ticket Type:
            </label>
            <div
              aria-label="Ticket type selection"
              role="menu"
              className="flex flex-col sm:flex-row p-[16px] justify-center item-center self-stretch rounded-[1.5rem] border-[1px] border-[#07373F] bg-[#052228] gap-[16px]"
            >
              <div
                role="menuitem"
                aria-label="Regular Access Ticket Free"
                className={`cursor-pointer flex flex-col items-start self-stretch p-[12px] h-[110px] sm:w-[158px] rounded-[12px] ${
                  active === "free" ? "active" : "inactive"
                }`}
                onClick={() => {
                  if (loading) return;
                  setActive("free");
                  setError(false);
                }}
              >
                <div>
                  <p className="text-[#FFF] font-mono leading-[110%] text-[1.5rem] font-[500]">
                    Free
                  </p>
                </div>
                <div>
                  <p className="text-[#FFF] font-mono leading-[150%] text-[15px] text-nowrap">
                    REGULAR ACCESS
                  </p>
                  <p className="text-[#D9D9D9] font-mono leading-[150%] text-[0.875rem]">
                    {allTicketQty.length === 0 ? "Loading" : allTicketQty[0]} /
                    100
                  </p>
                </div>
              </div>
              <div
                role="menuitem"
                aria-label="VIP Access Ticket $50"
                className={`cursor-pointer flex flex-col items-start self-stretch p-[12px] h-[110px] sm:w-[158px] rounded-[12px] ${
                  active === "vip" ? "active" : "inactive"
                }`}
                onClick={() => {
                  if (loading) return;
                  setActive("vip");
                  setError(false);
                }}
              >
                <div>
                  <p className="text-[#FFF] font-mono leading-[110%] text-[1.5rem] font-[500]">
                    $50
                  </p>
                </div>
                <div>
                  <p className="text-[#FAFAFA] font-mono leading-[150%] text-[15px]">
                    VIP ACCESS
                  </p>
                  <p className="text-[#D9D9D9] font-mono leading-[150%] text-[0.875rem]">
                    {allTicketQty.length === 0 ? "Loading" : allTicketQty[1]} /
                    100
                  </p>
                </div>
              </div>
              <div
                role="menuitem"
                aria-label="VVIP Access Ticket $150"
                className={`cursor-pointer flex flex-col items-start self-stretch p-[12px] h-[110px] sm:w-[158px] rounded-[12px] ${
                  active === "vvip" ? "active" : "inactive"
                }`}
                onClick={() => {
                  if (loading) return;
                  setActive("vvip");
                  setError(false);
                }}
              >
                <div>
                  <p className="text-[#FFF] font-mono leading-[110%] text-[1.5rem] font-[500]">
                    $150
                  </p>
                </div>
                <div>
                  <p className="text-[#FAFAFA] font-mono leading-[150%] text-[15px]">
                    VVIP ACCESS
                  </p>
                  <p className="text-[#D9D9D9] font-mono leading-[150%] text-[0.875rem]">
                    {allTicketQty.length === 0 ? "Loading" : allTicketQty[2]} /
                    100
                  </p>
                </div>
              </div>
            </div>
          </div>
          <label
            htmlFor="ticketqty"
            className="font-mono text-[1rem] text-[#FAFAFA] self-stretch leading-[150%] flex flex-col gap-[8px]"
          >
            Number of Tickets:
            <input
              className="p-[0.75rem] self-stretch rounded-[0.75rem] border-[1px] border-[#07373F] bg-transparent"
              type="number"
              value={tQty ? Number(tQty) : 1}
              min={1}
              name="ticketqty"
              disabled={loading}
              onChange={(e) => {
                setTQty(String(e.currentTarget.value));
              }}
            />
          </label>
        </form>
        <div className="flex flex-col sm:flex-row gap-[16px] items-start self-stretch sm:h-[48px] sm:justify-end sm:gap-[24px]">
          <Link
            className="self-stretch px-[24px] py-[12px] text-center rounded-[8px] border-[1px] border-[#24A0B5] leading-[150%] text-[#24A0B5] text-[16px] sm:grow"
            href="/events"
          >
            Cancel
          </Link>
          <button
            className="self-stretch px-[24px] py-[12px] text-center rounded-[8px] bg-[#24A0B5] leading-[150%] text-[#FFF] text-[16px] sm:grow"
            form="step1"
            disabled={loading}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
