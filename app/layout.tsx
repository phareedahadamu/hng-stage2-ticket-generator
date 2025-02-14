import type { Metadata } from "next";
import localFont from "next/font/local";
import Nav from "@/components/Nav";
import "./globals.css";
import { Road_Rage, Roboto, Alatsi } from "next/font/google";

const rageFont = Road_Rage({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rage",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});
const alatsi = Alatsi({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-alatsi",
});

const myFont = localFont({
  src: "./JejuMyeongjo-Regular.ttf",
});

export const metadata: Metadata = {
  title: "Ticz Ticket generator",
  description: "Get your conference tickets here!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rageFont.variable} ${roboto.variable} ${alatsi.variable} ${myFont.className} antialiased flex py-[1.5rem] items-center flex-col min-h-[100dvh]`}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
