import classNames from "classnames"
import { Link } from "react-router"

export default function Logo({scheme}) {
  return(
    <div id="logo" className=" h-fit flex items-center w-fit">
      <Link to={"/"} className="flex gap-2 items-center h-fit w-full">
        <div className="w-8 h-8 main-bg rounded-lg text-light flex justify-center 
        items-center">
						B
        </div>
        <p className={classNames(
          'text-sm hidden md:visible',
          {'text-light' : scheme == "dark:"},
          {'text-h' : scheme !== "dark"}
        )}>BeliMudah</p>
      </Link>
    </div>       
  )
}