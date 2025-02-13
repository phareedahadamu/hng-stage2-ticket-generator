"use client";
import { useState } from "react";
import StepOne from "@/components/StepOne";
import StepTwo from "@/components/StepTwo";

export default function Book(props: { idx: number }) {
  const [step, setStep] = useState<number>(1);
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
  const [data, setData] = useState<Data | null>(null);

  function updateData(newData: Data | null) {
    setData(newData);
  }
  function nextStep() {
    setStep((prev: number) => prev + 1);
  }
  function prevStep() {
    setStep((prev: number) => prev - 1);
  }

  const page =
    step === 1 ? (
      <StepOne
        idx={props.idx}
        data={data}
        updateData={updateData}
        nextStep={nextStep}
      />
    ) : (
      <StepTwo
        data={data}
        updateData={updateData}
        prevStep={prevStep}
        idx={props.idx}
      />
    );

  return <>{page}</>;
}
