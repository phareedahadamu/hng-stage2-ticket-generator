import StepThree from "@/components/StepThree";
export default async function Page({
  params,
}: {
  params: Promise<{ ticket: number }>;
}) {
  const idx = (await params).ticket;
  return (
    <section className="flex flex-col max-w-[700px] w-[99%] sm:p-[48px] p-[24px] gap-[32px] justify-center items-center bg-[#041E23] rounded-[2.5rem] border-[1px] border-[#0E464F] mt-[18px] sm:mt-[46px]">
      <StepThree idx={idx} />
    </section>
  );
}
