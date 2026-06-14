// components
import ProfileLayout from "@/components/layouts/ProfileLayout";

// asset
import Edit from "@/assets/icons/edit-mute.svg"
import Delete from "@/assets/icons/delete-mute.svg"

export default function Address(){
  return(
    <ProfileLayout>
      <div className="w-[95%] pt-1 h-full">
        <div className="flex justify-between items-start">
          <h3>Alamat Saya</h3>
          <button className="w-[10rem] rounded-xl text-light 
		  text-sm h-[38px] main-bg">
				Tambah Alamat
          </button>
        </div>
        <div className="mt-6 w-full border-light bg-white rounded-2xl 
        py-5 px-5">
          <header className="flex w-full justify-between items-center">
            <div>
              <p className="text-h font-[600]">Rumah Utama</p>
            </div>
            <div className="flex gap-2">
              <button className="cursor-pointer px-1">
                <img src={Edit} alt="" />
              </button>
              <button className="cursor-pointer px-1">
                <img src={Delete} alt="" />
              </button>
            </div>
          </header>
          <main className=" py-5 flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <p>Lorem ipsum dolor sit amet.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur aperiam omnis ipsa ratione. Voluptatum, cupiditate?</p>
            </div>
          </main>
        </div>

        <div className="mt-6 w-full border-light bg-white rounded-2xl 
        py-5 px-5">
          <header className="flex w-full justify-between items-center">
            <div>
              <p className="text-h font-[600]">Kantor</p>
            </div>
            <div className="flex gap-2">
              <button className="cursor-pointer px-1">
                <img src={Edit} alt="" />
              </button>
              <button className="cursor-pointer px-1">
                <img src={Delete} alt="" />
              </button>
            </div>
          </header>
          <main className=" py-5 flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <p>Lorem ipsum dolor sit amet.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur aperiam omnis ipsa ratione. Voluptatum, cupiditate?</p>
            </div>
          </main>
          <footer className="h-[3rem] flex items-center justify-between">
            <div className="flex items-center gap-1">
              <p className="text-(--text-high)">Jadikan Alamat Utama</p>
            </div>
          </footer>
        </div>
      </div>
    </ProfileLayout>
  )
}