import { motion } from "framer-motion";
import {ChangeEvent, JSX} from "react";
import * as React from "react";
import {IoIosLink} from "react-icons/io";

interface IProps {
  change: ({ target }: ChangeEvent<HTMLInputElement>) => void,
  value: string,
  generateShortedURL: (event: React.SyntheticEvent<HTMLFormElement>) => Promise<void>
}

export default function Form({ change, value, generateShortedURL }: IProps): JSX.Element {
  return (
    <>
      <form
        onSubmit={generateShortedURL}
        className={"py-10"}
      >
        <motion.div
          initial={{
            y: 50
          }} animate={{
            y: 0
          }} transition={{
            duration: 0.3,
            type: "spring",
            stiffness: 250
          }}
          className="relative"
        >
          <IoIosLink size={23} className={"absolute left-2.5 top-1/2 transform -translate-y-1/2 z-50 text-gray-300"}/>
          <input
            value={value}
            onChange={change}
            type="text"
            placeholder={"paste link you want to shorten..."}
            className={"w-full h-12 rounded-md backdrop-blur-sm caret-emerald-500 bg-[rgba(0,0,0,0.15)] px-3 pl-9 border-none outline-none text-[16px] text-gray-300 placeholder:text-gray-400"}
          />
        </motion.div>
      </form>
    </>
  );
}
