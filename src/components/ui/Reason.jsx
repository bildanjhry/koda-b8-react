import { Truck, ShieldCheck, RotateCcw, Headset } from "lucide-react"

const reasons = [
  {
    icon: Truck,
    title: "Gratis Ongkir",
    description: "Pembelian di atas Rp 100.000 gratis ongkir ke seluruh Indonesia.",
  },
  {
    icon: ShieldCheck,
    title: "Pembayaran Aman",
    description: "Data kamu terenkripsi dengan standar keamanan tertinggi.",
  },
  {
    icon: RotateCcw,
    title: "Retur Mudah",
    description: "Produk tidak sesuai? Kembalikan dalam 30 hari tanpa ribet.",
  },
  {
    icon: Headset,
    title: "CS 24/7",
    description: "Tim kami siap membantu kamu kapan saja, di mana saja.",
  },
]

export default function Reason() {
  return (
    <section className="mx-auto w-full px-2 py-20 md:py-28">
      <div className="mb-14 max-w-xl">
        <p className="mb-3 text-sm font-medium tracking-widest text-muted-foreground uppercase">BeliMudah</p>
        <h2 className="text-3xl font-semibold text-(--text-h) tracking-tight text-balance md:text-4xl">
          Kenapa belanja di BeliMudah?
        </h2>
      </div>

      <ul className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((reason) => {
          const Icon = reason.icon
          return (
            <li key={reason.title} className="flex flex-col gap-4">
              <span className="flex size-11 items-center justify-center rounded-full bg-(--main-bg)/20 text-foreground">
                <Icon className="size-5 text-(--text-h)" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-base font-medium tracking-tight">{reason.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{reason.description}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
