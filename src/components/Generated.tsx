import {JSX} from "react";
import ReadOnlyInput from "./ReadOnlyInput.tsx";
import {IData} from "../App.tsx";
import {AnimatePresence, motion} from "framer-motion";

export default function Generated({data, reset}:
{
  data: IData | null,
  reset: () => void
}): JSX.Element {
  return (
    <>
      <AnimatePresence>
        {data ? <motion.div
          initial={{
            y: 50
          }} animate={{
            y: 0
          }} transition={{
          staggerChildren: 0.5,
          duration: 0.3,
          type: "spring",
          stiffness: 250
        }}
          className="w-full select-none rounded-md backdrop-blur-sm bg-[rgba(0,0,0,0.15)] py-6 px-2 flex flex-col gap-5"
        >
          <ReadOnlyInput title={"link 1"} value={data?.["full_short_link2"]}/>
          <ReadOnlyInput title={"link 2"} value={data?.["full_short_link"]}/>
          <div className="mt-2">
            <motion.button
              initial={{
                scale: 1,
                y: 50
              }} animate={{
                y: 0
              }}  whileTap={{
                scale: 0.92
              }} transition={{
                duration: 0.2,
                type: "spring",
                stiffness: 150
              }}
              onClick={reset}
              className={"w-full h-12 flex items-center justify-center rounded-md bg-[rgba(93,49,146,0.20)] text-gray-300 font-medium"}
            >
              generate new URL
            </motion.button>
          </div>
        </motion.div> : null}
      </AnimatePresence>
    </>
  );
}
