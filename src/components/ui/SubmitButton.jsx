export default function SubmitButton({img, buttonText, order = "left-to-right"}){
  return order === "left-to-right" ?
    (
      <button
        type="submit"
        className="rounded-xl main-bg h-[46px] w-full flex gap-2 text-light 
        justify-center cursor-pointer items-center"> 
        { img && <img src={img} alt="" />}
        <p>{buttonText}</p>
      </button> 
    ) :
    (
      <button
        type="submit"
        className="rounded-xl action-bg h-[46px] w-full flex gap-2 text-light 
        justify-center cursor-pointer items-center">
        <p>{buttonText}</p>
        { img && <img src={img} alt="" />}
      </button>
    )
}