import {ChangeEvent, Fragment, JSX, SyntheticEvent, useEffect, useState} from "react";
import Form from "./components/Form.tsx";
import {colors} from "./data/colors.ts";
import axios, {AxiosResponse} from "axios";
import Generated from "./components/Generated.tsx";
import {RotatingTriangles} from "react-loader-spinner";

export interface IData {
  code: string;
  full_share_link: string;
  full_short_link: string;
  full_short_link2: string;
  full_short_link3: string;
  original_link: string;
  share_link: string;
  short_link: string;
  short_link2: string;
  short_link3: string;
}

export default function App(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [data, setData] = useState<IData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [gradientColor] = useState<string[]>(generateRandomColors());
  function generateRandomColors(): string[] {
    const generateRandomColor = () => { return colors[Math.floor(Math.random() * colors.length)]; }
    return [ generateRandomColor(), generateRandomColor() ];
  }
  const handleChangeInput = ({ target }: ChangeEvent<HTMLInputElement>): void => setInputValue(target.value.trim());
  const generateShortURL = async (e: SyntheticEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response: AxiosResponse = await axios.get(`${import.meta.env.VITE_SHORTENER_API_URL}?url=${inputValue}`);
      response && setData(response.data.result)
    } catch (err: any) { setError(slicedSTR(err.response.data.error)); }
    setIsLoading(false);
  }
  const slicedSTR = (str: string): string => str.split(",")[0];
  const reset = (): void => { setInputValue(""); setError(""); setData(null); }
  const blockContextMenu = (e: MouseEvent) => e.preventDefault();
  useEffect(() => {
    document.documentElement.addEventListener("contextmenu", blockContextMenu);
    return () => document.documentElement.removeEventListener("contextmenu", blockContextMenu);
  }, []);
  useEffect(() => {
    if(!inputValue) {
      reset();
    }
  }, [inputValue]);
  return (
    <Fragment>
      <div
        style={{background: `linear-gradient(to top, ${gradientColor[0]}, ${gradientColor[1]})`}}
        className="flex justify-center w-full h-screen"
      >
        <div className="md:w-[650px] w-full px-5">
          <Form
            generateShortedURL={generateShortURL}
            change={handleChangeInput}
            value={inputValue}
          />
          <div className="mt-4 relative w-full min-h-[250px] h-auto">
            {!error ?
              <Generated
                data={data}
                reset={reset}
              /> : null
            }
            {isLoading ?
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <RotatingTriangles
                  visible={true}
                  colors={[
                    "rgba(93,49,146,0.55)",
                    "rgba(23,203,75,0.55)",
                    "rgb(56,108,160,0.55)"
                  ]}
                  height="90"
                  width="90"
                  ariaLabel="rotating-triangels-loading"
                  wrapperStyle={{}}
                  wrapperClass="rotating-triangels-wrapper"
                />
              </div> : null
            }
            {error && <p className={"text-red-500 text-2xl font-bold text-center"}>{error}</p>}
          </div>
        </div>
      </div>
    </Fragment>
  )
}
