import classNames from "classnames"

export default function Alert({variant, children, props}){
  return(
    <div
      {...props} 
      className={classNames(
        "w-full border rounded-lg flex h-10 justify-center text-sm items-center",
        {"bg-red-50 text-red-700 border-red-700": variant === "error"},
        {"bg-green-100 text-green-700 border-green-700": variant === "success"},
      )}> 
      {children}
    </div>		
  )
}