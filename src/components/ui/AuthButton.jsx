export default function AuthButton({buttonText}){

  function handleButton(){
    // Do handle auth button with link here
  }

  return(
    <>
      <button 
        onClick={handleButton}
        className="border-light rounded-lg cursor-pointer h-[46px] text-xs flex justify-center 
				items-center w-[100%] md:w-[49%]">
        {buttonText}
      </button>
    </>
  )
}