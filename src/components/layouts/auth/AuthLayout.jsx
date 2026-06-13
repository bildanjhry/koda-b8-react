// component
import InfoSection from "./particles/InfoSection.jsx"
import FormSection from "./particles/FormSection.jsx"


export default function AuthLayout({type}){

  return(
    <div className="w-full h-[100vh] flex flex-row">
      <InfoSection type={type}/>
      <section className="w-[50%] flex justify-center container-bg items-center">
        <FormSection type={type}/>
      </section>
    </div>
  )
}
