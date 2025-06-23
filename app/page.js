import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";
const myFont = localFont({
  src: '../font/Nevol.woff2',
})
export default function Home() {
  return (
    <>
      {/* //top section */}
      <div className="flex flex-col items-center justify-center gap-4 h-[48vh] w-full text-white p-2">
        <div className={`text-5xl flex gap-2 justify-center items-center font-bold ${myFont.className}`}>Buy me a chai <span><Image
          src="/images/tea.gif"
          alt="Tea pouring"
          width={88}
          height={88}
          className="invertImg"
        /></span></div>
        <p className="text-center text-lg">
          a crowdfunding platform to fund your project with chai. Get funded by your supporters and enjoy a cup of chai together!
        </p>
        <div>
          <Link href={"/login"}>
            <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-xl md:text-sm px-5 py-2.5 text-center me-2 mb-2 ">
              Start Now!
            </button>
          </Link>

          <Link href={"/about"}>
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-xl md:text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="relative px-4.5 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                Read More
              </span>
            </button>
          </Link>
        </div>
      </div>

      {/* //Separation Line 1*/}
      <div className="line bg-white h-[2px] opacity-10 w-full"></div>

      {/* //bottom section 1*/}
      <div className="text-center text-white container mx-auto pt-8 pb-12 md:pt-16 md:pb-24">
        <h1 className="text-2xl font-bold mb-8">Your fans can buy you a chai</h1>
        <div className="flex gap-8 md:gap-4 justify-around items-center flex-wrap sm:flex-col md:flex-row">
          <div className="item space-y-3 flex flex-col items-center">
            <Image
              src="/images/man.gif"
              alt="Profile picture"
              width={88}
              height={88}
              className="bg-slate-500 p-2 rounded-full"
            />
            <p className="text-white font-bold">Fans want to help</p>
            <p>Your fans are availabe for you</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center">
            <Image
              src="/images/coin.gif"
              alt="Profile picture"
              width={88}
              height={88}
              className="bg-slate-500 p-2 rounded-full"
            />
            <p className="text-white font-bold">Fans want to help</p>
            <p>Your fans are availabe for you</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center">

            <Image
              src="/images/group.gif"
              alt="Profile picture"
              width={88}
              height={88}
              className="bg-slate-500 p-2 rounded-full"
            />
            <p className="text-white font-bold">Fans want to help</p>
            <p>Your fans are availabe for you</p>
          </div>
        </div>
      </div>
      {/* //Separation Line 2*/}
      <div className="line bg-white h-[2px] opacity-10 w-full"></div>

      {/* //Ad section 2*/}
      <div className="text-center text-white container mx-auto pt-16 pb-24 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-8">Place your AD here</h1>

        <div className="w-full max-w-2xl aspect-video">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/UsNdgJY6tCY?si=MsjakqL38lKQBV61"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
}
