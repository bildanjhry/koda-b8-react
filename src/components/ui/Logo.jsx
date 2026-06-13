import { Link } from "react-router"

export default function Logo({scheme}) {

  const handleTextCol = () => scheme === "dark" ? 'text-light' : 'text-h'
  return(
    <div id="logo" className=" h-fit flex items-center w-fit">
      <Link to={"/"} className="flex gap-2 items-center h-fit w-[100%]">
        <div className="w-[32px] h-[32px] main-bg rounded-lg text-light flex justify-center items-center">
						B
        </div>
        <p className={`text-sm ${handleTextCol()}`}>BeliMudah</p>
      </Link>
    </div>       
  )
}