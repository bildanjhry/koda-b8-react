// component
import ProfileLayout from "@/components/layouts/ProfileLayout";

// hooks
import useInitial from "@/hooks/useInitial.js";

// assets
import Edit from "@/assets/icons/edit-blue.svg"

export default function ProfileSettings(){
  const [initial] = useInitial()
  
  return(
    <ProfileLayout>
      <div className="w-[95%] pt-1 h-full">
        <div className="flex justify-between items-center">
          <h3>Pengaturan Profil</h3>
          <button className="w-[7rem] justify-center rounded-xl flex items-center gap-2 text-sm 
          h-[38px] text-(--text-high) border border-(--main-border)">
            <img src={Edit} alt="edit profiles" />
            <p>Simpan</p>
          </button>
        </div>
        <div className="mt-6 w-full border-light bg-white rounded-2xl 
        py-5 px-5">
          <form
            onSubmit={null}
            className="w-full flex flex-col gap-5 text-sm"
            action="">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 flex justify-center items-center rounded-full bg-(--accent-bg)">
                <h4 className="text-(--text-high) text-xl font-semibold">{initial}</h4>
              </div>
              <button className="text-(--text-high) cursor-pointer">Ganti Foto Profil</button>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="name">Nama Lengkap</label>
              <input 
                placeholder="Nama Lengkap Anda"
                className="w-full h-[46px] text-sm pl-4 bg-(--input-bg) rounded-xl"
                type="text" id="name" />
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="email">Email</label>
              <input 
                placeholder="Email Anda"
                className="w-full h-[46px] text-sm pl-4 bg-(--input-bg) rounded-xl"
                type="email" id="email" />
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="phone">Nomor Telepon</label>
              <input 
                placeholder="Nama Lengkap Anda"
                className="w-full h-[46px] text-sm pl-4 bg-(--input-bg) rounded-xl"
                type="text" id="phone" />
            </div>    
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="date">Tanggal Lahir</label>
              <input 
                placeholder="dd/mm/yyy"
                className="w-full h-[46px] text-sm px-4 bg-(--input-bg) rounded-xl"
                type="date" id="date" name="date"/>
            </div>   
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="gender">Jenis Kelamin</label>
              <select
                placeholder=""
                className="w-full h-[46px] text-sm px-4 bg-(--input-bg) rounded-xl"
                type="date" id="date">
                  <option value="male" name="gender" id="male" >Laki-laki</option>
                  <option value="female" name="gender" id="female" >Perempuan</option>
              </select> 
            </div>                              
          </form>
        </div>
        
        <div className="w-full h-fit mt-5 bg-white rounded-2xl border-light 
        items-start flex flex-col gap-3 px-6 py-5">
          <h4 className="text-(--text-h) mb-1 font-semibold">Keamanan Akun</h4>
          <button className="text-(--text-high) text-sm cursor-pointer">Ubah Kata Sandi</button>
          <button className="text-(--text-high) text-sm cursor-pointer">Aktifkan Verifikasi 2 langkah</button>
        </div>
      </div>
    </ProfileLayout>
  )
}