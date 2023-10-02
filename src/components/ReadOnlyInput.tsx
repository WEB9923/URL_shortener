import { motion } from "framer-motion";
import {JSX, useEffect, useRef, useState} from "react";
import {BsBoxArrowInUpRight, BsCheckCircleFill} from "react-icons/bs";
import {PiCopySimpleThin} from "react-icons/pi";

export default function ReadOnlyInput({title, value}:
{
  title: string,
  value: string
}): JSX.Element {
  const ref = useRef(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const handleCopy = async (text: string) => {
    try {
      if(navigator.clipboard) {
        await navigator.clipboard.writeText(text).then(() => {
          setIsCopied(true);
        })
      }
    } catch (err) {
      console.error(err);
    }
  }
  const handleOpenLinkInNewTab = () => {
    if(ref?.current?.value) {
      window.open(ref?.current?.value, "_blank");
    }
  }
  useEffect(() => {
    let timeOutId: number | undefined;
    if(isCopied) {
      timeOutId = setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    }
    return () => clearTimeout(timeOutId);
  }, [isCopied]);

  return (
    <>
      <motion.div
        initial={{
          y: 50
        }} animate={{
          y: 0
        }} transition={{
          duration: 0.2,
          type: "spring",
          stiffness: 150
        }}
        className="relative"
      >
        <label className={"text-gray-300 font-medium text-[16px]"}>{title}</label>
        <div className="relative">
          <input
            value={value}
            ref={ref}
            type="text"
            onContextMenu={(e): void => e.preventDefault()}
            readOnly={true}
            className={"w-full h-12 rounded-md backdrop-blur-sm caret-emerald-500 bg-[rgba(0,0,0,0.15)] px-3 border-none outline-none text-[16px] text-gray-300 placeholder:text-gray-400"}
          />
          <div className="flex items-center absolute right-0 top-1/2 transform -translate-y-1/2 h-full">
            <button
              onClick={() => handleCopy(ref?.current?.value)}
              className={"w-12 h-full flex bg-[rgba(23,203,75,0.10)] justify-center items-center text-gray-300 rounded-l-md border-none outline-none"}
            >
              {isCopied ? <BsCheckCircleFill size={22}/> : <PiCopySimpleThin size={22}/>}
            </button>
            <button
              onClick={handleOpenLinkInNewTab}
              className={"w-12 h-full flex items-center bg-[rgba(93,49,146,0.10)] justify-center rounded-r-md text-gray-300 border-none outline-none"}
            >
              <BsBoxArrowInUpRight size={21}/>
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
