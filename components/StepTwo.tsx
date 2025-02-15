"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { db, db2 } from "@/db/db.model";
import NextImage from "next/image";
// interface Data {
//   name: string;
//   email: string;
//   request: string;
//   imageUrl: string;
//   quantity: number;
//   ticketType: string;
//   imageWidth: number;
//   imageHeight: number;
// }
export default function StepTwo() {
  const isEmpty = useRef<boolean>(true);
  const dbId = useRef<number | null>(null);
  const tQty = useRef<string | null>(null);
  const tType = useRef<string | null>(null);
  const done = useRef<boolean>(false);
  const eventIdx = useRef<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imgErr, setImgErr] = useState<boolean>(false);
  const [width, setWidth] = useState<string | null>(null);
  const [height, setHeight] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [request, setRequest] = useState<string | null>(null);
  const clear = useCallback(() => {
    if (done.current) {
      window.localStorage.clear();
      setLoading(false);
      // console.log("cleared!");
      if (dbId.current) {
        redirect(`/tickets/${dbId.current}`);
      }
    }
  }, [done]);
  isEmpty.current = url ? false : true;

  useEffect(() => {
    const savedName = window.localStorage.getItem("name");
    setName(savedName ? savedName : "");
    const savedEmail = window.localStorage.getItem("email");
    setEmail(savedEmail ? savedEmail : "");
    const savedRequest = window.localStorage.getItem("request");
    setRequest(savedRequest ? savedRequest : "");
    const savedType = window.localStorage.getItem("ticketType");
    tType.current = savedType ? savedType : "";
    const savedQty = window.localStorage.getItem("ticketQty");
    tQty.current = savedQty ? savedQty : "";
    const savedUrl = window.localStorage.getItem("imageUrl");
    setUrl(savedUrl ? savedUrl : "");
    const savedWidth = window.localStorage.getItem("width");
    setWidth(savedWidth ? savedWidth : "");
    const savedHeight = window.localStorage.getItem("height");
    setHeight(savedHeight ? savedHeight : "");
    const idx = window.localStorage.getItem("eventIdx");
    eventIdx.current = idx ? idx : "";
  }, []);
  useEffect(() => {
    if (url !== null) {
      window.localStorage.setItem("imageUrl", String(url));
    }
    if (width !== null) {
      window.localStorage.setItem("width", String(width));
    }
    if (height !== null) {
      window.localStorage.setItem("height", String(height));
    }
  }, [url, width, height]);
  useEffect(() => {
    if (name !== null) window.localStorage.setItem("name", name);
  }, [name]);
  useEffect(() => {
    if (email !== null) window.localStorage.setItem("email", email);
  }, [email]);
  useEffect(() => {
    if (request !== null) window.localStorage.setItem("request", request);
  }, [request]);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setImgErr(false);
    if (!e.target.files) {
      isEmpty.current = true;
    } else isEmpty.current = false;
    if (e.target.files) {
      if (e.target.files[0].type.slice(0, 5) !== "image") {
        setImgErr(true);
        return;
      }
      setLoading(true);
      const upload = e.target.files[0];

      const formData = new FormData();
      formData.append("file", upload);
      formData.append("upload_preset", "my-preset");
      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dxepgzv5c/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        setUrl(data.url);
        setWidth(data.width);
        setHeight(data.height);
      } catch (err) {
        console.log(err);
        alert("issue uploading");
      } finally {
        setLoading(false);
      }
    }
  }

  async function submitForm() {
    setLoading(true);
    const id = await db.user.add({
      name: name as string,
      email: email as string,
      request: request !== "" ? (request as string) : "Nil",
      imageUrl: url as string,
      quantity: Number(tQty.current),
      ticketType: String(tType.current).toUpperCase(),
      imageWidth: Number(width),
      imageHeight: Number(height),
      event:
        Number(eventIdx.current) === 1
          ? 'Techember Fest "25'
          : "Valentines Splash",
      dateBooked: new Date().toString(),
    });

    if (id) {
      dbId.current = id as number;
      const idx = Number(eventIdx.current);
      // console.log(idx, typeof idx);
      const currentqty = await db2.tickets.where("id").equals(idx).toArray();
      // console.log(currentqty);
      const TType = String(tType.current);
      const currentQty =
        TType === "free"
          ? currentqty[0].free
          : TType === "vip"
          ? currentqty[0].vip
          : currentqty[0].vvip;
      if (TType === "free")
        await db2.tickets.update(idx, {
          free: currentQty - Number(tQty.current),
        });
      else if (TType === "vip")
        await db2.tickets.update(idx, {
          vip: currentQty - Number(tQty.current),
        });
      else
        await db2.tickets.update(idx, {
          vvip: currentQty - Number(tQty.current),
        });
    } else console.log("couldnt update ticket dB");
    done.current = true;
    clear();
  }

  return (
    <>
      <div className="flex flex-col self-stretch gap-[12px]">
        <div className="flex flex-col sm:flex-row gap-[12px] sm:items-center self-stretch justify-between items-start">
          <h1 className="self-stretch text-[#FFF] text-[24px] sm:text[32px] leading-[normal]">
            Attendee details
          </h1>
          <p className="font-mono text-[#FAFAFA] text-[16px] leading-[150%]">
            Step 2/3
          </p>
        </div>
        <progress className="h-[4px] w-[100%]" value="66" max="100">
          66%
        </progress>
      </div>
      <div className="flex flex-col justify-center gap-[32px] sm:p-[24px] items-start self-stretch sm:rounded-[32px] sm:border-[1px] sm:border-[#0E464F] sm:bg-[#08252B]">
        <form
          className="self-stretch flex flex-col justify-between items-start gap-[32px]"
          action={submitForm}
          id="step2"
        >
          <div className="flex flex-col items-center gap-[32px] px-[24px] pt-[24px] pb-[48px] border-[#07373F] border-[1px] bg-[#052228] self-stretch rounded-[24px] sm:max-w-[556px] sm:w-[100%]">
            <label
              htmlFor="profilepic"
              className="font-mono flex sm:flex-row flex-col gap-[6px] relative text-[1rem] text-[#FAFAFA] self-stretch leading-[150%] mb-[2rem] text-start"
            >
              Upload Profile Photo:
              {imgErr && (
                <p className="animate-pulse text-red-500 text-[14px]">
                  Please pick a valid file type
                </p>
              )}
            </label>
            <div className="flex sm:self-stretch justify-center sm:bg-imageBg h-[200px]  items-center relative">
              <div className="w-[240px] h-[240px] p-[24px] rounded-[32px] border-[4px] bg-[#0E464F] border-borderColor flex flex-col items-center gap-[16px] justify-center absolute top[-20px]">
                <NextImage
                  src="/cloud-download.svg"
                  alt="upload icon"
                  width={32}
                  height={32}
                />
                <p className="font-mono text-center text-[1rem] leading-[150%] text-[#FAFAFA]">
                  Drag & drop or click to upload
                </p>
                {url && (
                  <NextImage
                    className="w-[232px] h-[232px] rounded-[28px] object-cover object-center absolute"
                    src={url}
                    alt="Profile pic"
                    width={Number(width)}
                    height={Number(height)}
                    priority
                  />
                )}
              </div>
              <input
                className="w-[240px] h-[240px] opacity-[0] absolute top-[-20px] left-[50%] border-white border-[2px]"
                type="file"
                name="profilepic"
                disabled={loading}
                onChange={handleFileChange}
                required={isEmpty.current}
                accept=".png, .jpg, .jpeg, .webp, .jfif, .pjpeg, .pjp, gif, avif, apng"
              />
            </div>
          </div>
          <div className="h-[4px] bg-[#07373F] self-stretch"></div>
          <label
            htmlFor="name"
            className="font-mono text-[1rem] text-[#FAFAFA] self-stretch leading-[150%] flex flex-col gap-[8px]"
          >
            Enter your name
            <input
              className="p-[0.75rem] self-stretch rounded-[0.75rem] border-[1px] border-[#07373F] bg-transparent"
              type="text"
              name="name"
              disabled={loading}
              required
              value={name ? (name as string) : ""}
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </label>
          <label
            className="font-mono text-[1rem] text-[#FAFAFA] self-stretch leading-[150%] flex flex-col gap-[8px] relative"
            htmlFor="email"
          >
            Enter your email *
            <NextImage
              className="absolute top-[45px] left-[10px]"
              src="/email.svg"
              alt="email icon"
              width={24}
              height={24}
            />
            <input
              className="p-[0.75rem] self-stretch rounded-[0.75rem] border-[1px] border-[#07373F] bg-transparent pl-[40px]"
              type="email"
              required
              disabled={loading}
              name="email"
              value={email ? (email as string) : ""}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </label>
          <label
            className="font-mono text-[1rem] text-[#FAFAFA] self-stretch leading-[150%] flex flex-col gap-[8px]"
            htmlFor="about"
          >
            Special request?
            <textarea
              className="txtArea p-[0.75rem] self-stretch rounded-[0.75rem] border-[1px] border-[#07373F] bg-transparent"
              name="about"
              rows={4}
              disabled={loading}
              value={request ? (request as string) : ""}
              onChange={(e) => setRequest(e.currentTarget.value)}
            ></textarea>
          </label>
        </form>
        <div className="flex flex-col sm:flex-row gap-[16px] items-start self-stretch sm:h-[48px] sm:justify-end sm:gap-[24px]">
          <Link
            className="self-stretch px-[24px] py-[12px] text-center rounded-[8px] border-[1px] border-[#24A0B5] leading-[150%] text-[#24A0B5] text-[16px] sm:grow"
            href={`/events/${Number(eventIdx.current)}`}
          >
            Back
          </Link>
          <button
            className="self-stretch px-[24px] py-[12px] text-center rounded-[8px] bg-[#24A0B5] leading-[150%] text-[#FFF] text-[16px] sm:grow"
            form="step2"
            disabled={loading}
          >
            Get My Ticket
          </button>
        </div>
      </div>
    </>
  );
}
