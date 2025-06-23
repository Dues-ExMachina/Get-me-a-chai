import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWraper from "@/components/SessionWraper";
import localFont from "next/font/local";

const bodyFont = localFont({
  src: '../font/Fredoka/Fredoka-VariableFont_wdth,wght.ttf',
})
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Get Me a Chai - Fund your Project with Chai",
  description: "A web app to order chai",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${bodyFont.className} ${geistSans.variable} ${geistMono.variable} antialiased  `} suppressHydrationWarning={true}
      >
        <SessionWraper>
          <Navbar />
          <div className="text-white w-full min-h-[74.5vh] md:min-h-[calc(100vh-112px)] flex flex-col  bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
            {/* <div class="absolute top-0 z-[-2] h-screen w-screen"></div> */}
            {children}
          </div>
          <Footer />
        </SessionWraper>
      </body>
    </html >
  );
}
