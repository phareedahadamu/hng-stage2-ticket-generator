import { SyntheticEvent, useState, useRef } from "react";
import { redirect } from "next/navigation";
import { db, db2 } from "@/db/db.model";
import Image from "next/image";
interface Data {
  name: string;
  email: string;
  request: string;
  imageUrl: string;
  quantity: number;
  ticketType: string;
  imageWidth: number;
  imageHeight: number;
}
export default function StepTwo(props: {
  data: Data | null;
  updateData: (newData: Data | null) => void;
  prevStep: () => void;
  idx: number;
}) {
  const dbId = useRef(0);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [picUrl, setPicUrl] = useState("");
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setImage(e.target.files[0]);
      setPicUrl(URL.createObjectURL(e.target.files[0]));
      setImageDimensions({ width: 0, height: 0 });
      // console.log(e.target.files[0]);
    }
  }
  const handleImageLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    console.log(e.currentTarget);
    const width = e.currentTarget.width;
    const height = e.currentTarget.height;
    setImageDimensions({ width: width, height: height });
  };

  async function submitForm(fd: FormData) {
    if (!image) {
      alert("Please select an image!");
      return;
    }
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "my-preset");

    setLoading(true);

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dxepgzv5c/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data);
      const username = fd.get("name") as string;
      const email = fd.get("email") as string;
      const request = fd.get("about") as string;
      const url = data?.url ? data.url : "";
      const width = data?.width ? Number(data.width) : 0;
      const height = data?.height ? Number(data.height) : 0;

      const newData =
        props.data === null
          ? null
          : {
              ...props.data,
              name: username,
              email: email,
              request: request,
              imageUrl: url,
              imageWidth: width,
              imageHeight: height,
            };
      props.updateData(newData);
      const id = await db.user.add({
        name: username,
        email: email,
        request: request !== "" ? request : "Nil",
        imageUrl: url,
        quantity: props.data?.quantity as number,
        ticketType: props.data?.ticketType as string,
        imageWidth: width,
        imageHeight: height,
        event:
          Number(props.idx) === 1
            ? 'Techember Fest "25'
            : "Valentines Splash 2025",
        dateBooked: new Date().toString(),
      });
      console.log(id);
      if (id) dbId.current = id;
      const currentqty = await db2.tickets
        .where("id")
        .equals(Number(props.idx))
        .toArray();
      const tType = props.data?.ticketType;
      const currentQty =
        tType === "free"
          ? currentqty[0].free
          : tType === "vip"
          ? currentqty[0].vip
          : currentqty[0].vvip;
      if (props.data)
        if (tType === "free")
          await db2.tickets.update(Number(props.idx), {
            free: currentQty - props.data.quantity,
          });
        else if (tType === "vip")
          await db2.tickets.update(Number(props.idx), {
            vip: currentQty - props.data.quantity,
          });
        else
          await db2.tickets.update(Number(props.idx), {
            vvip: currentQty - props.data.quantity,
          });
    } catch (error) {
      alert({ error });
    } finally {
      setLoading(false);
    }
    if (dbId.current !== 0) redirect(`/tickets/${dbId.current}`);
    else alert("oops!");
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
              className="font-mono text-[1rem] text-[#FAFAFA] self-stretch leading-[150%] flex flex-col gap-[8px] mb-[2rem] text-start"
            >
              Upload Profile Photo:
            </label>
            <div className="flex sm:self-stretch justify-center sm:bg-imageBg h-[200px]  items-center relative">
              <div className="w-[240px] h-[240px] p-[24px] rounded-[32px] border-[4px] bg-[#0E464F] border-borderColor flex flex-col items-center gap-[16px] justify-center absolute top[-20px]">
                <Image
                  src="/cloud-download.svg"
                  alt="upload icon"
                  width={32}
                  height={32}
                />
                <p className="font-mono text-center text-[1rem] leading-[150%] text-[#FAFAFA]">
                  Drag & drop or click to upload
                </p>
                {picUrl !== "" && (
                  <Image
                    className="w-[232px] h-[232px] rounded-[28px] object-cover object-center absolute"
                    src={picUrl}
                    alt="Profile pic"
                    onLoad={handleImageLoad}
                    width={imageDimensions.width}
                    height={imageDimensions.height}
                  />
                )}
              </div>

              <input
                className="w-[240px] h-[240px] opacity-[0] absolute top[-20px]"
                type="file"
                name="profilepic"
                onChange={handleFileChange}
                required
                disabled={loading}
              />
            </div>
          </div>
          <div className="h-[4px] bg-[#07373F] self-stretch"></div>
          <label
            htmlFor="name"
            className="font-mono text-[1rem] text-[#FAFAFA] self-stretch leading-[150%] flex flex-col gap-[8px]"
          >
            Enter your name*
            <input
              className="p-[0.75rem] self-stretch rounded-[0.75rem] border-[1px] border-[#07373F] bg-transparent"
              type="text"
              name="name"
              required
            />
          </label>
          <label
            className="font-mono text-[1rem] text-[#FAFAFA] self-stretch leading-[150%] flex flex-col gap-[8px]"
            htmlFor="email"
          >
            Enter your email *
            <input
              className="p-[0.75rem] self-stretch rounded-[0.75rem] border-[1px] border-[#07373F] bg-transparent"
              type="email"
              required
              name="email"
            />
          </label>
          <label
            className="font-mono text-[1rem] text-[#FAFAFA] self-stretch leading-[150%] flex flex-col gap-[8px]"
            htmlFor="about"
          >
            Special request?
            <textarea
              className="p-[0.75rem] self-stretch rounded-[0.75rem] border-[1px] border-[#07373F] bg-transparent"
              name="about"
              rows={4}
            ></textarea>
          </label>
        </form>
        <div className="flex flex-col sm:flex-row gap-[16px] items-start self-stretch sm:h-[48px] sm:justify-end sm:gap-[24px]">
          <button
            className="self-stretch px-[24px] py-[12px] text-center rounded-[8px] border-[1px] border-[#24A0B5] leading-[150%] text-[#24A0B5] text-[16px] sm:grow"
            onClick={props.prevStep}
          >
            Back
          </button>
          <button
            className="self-stretch px-[24px] py-[12px] text-center rounded-[8px] bg-[#24A0B5] leading-[150%] text-[#FFF] text-[16px] sm:grow"
            form="step2"
          >
            Get My Ticket
          </button>
        </div>
      </div>
    </>
  );
}
