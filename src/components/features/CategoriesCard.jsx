import { Laptop, Shirt, Home, Sparkles, Dumbbell, BookOpen, ArrowRight } from "lucide-react"

const categories = [
  { icon: Laptop, name: "Elektronik", count: "7 Produk" },
  { icon: Shirt, name: "Fashion", count: "5 Produk" },
  { icon: Home, name: "Rumah & Dapur", count: "4 Produk" },
  { icon: Sparkles, name: "Kecantikan", count: "7 Produk" },
  { icon: Dumbbell, name: "Olahraga", count: "3 Produk" },
  { icon: BookOpen, name: "Buku & Alat Tulis", count: "2 Produk" },
]

export default function CategoriesCard() {
  return (
    <section className="mx-auto w-full px-6 py-16 md:px-0 md:py-18">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-leaf">Jelajahi</p>
          <h2 className="text-3xl text-(--text-h) font-semibold tracking-tight text-balance md:text-4xl">
            Belanja per kategori
          </h2>
        </div>
        <a
          href="#"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-brand/80"
        >
          Lihat Semua
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-0.5"
            strokeWidth={2}
            aria-hidden="true"
          />
        </a>
      </div>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map(({ icon: Icon, name, count }) => (
          <li key={name}>
            <a
              href="#"
              className="group flex h-full flex-col items-center gap-4 rounded-2xl border border-(--border) bg-card p-6 text-center transition-all hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <span className="flex size-14 text-(--text-h) items-center justify-center rounded-full bg-(--main-bg)/20 text-leaf transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                <Icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <div className="flex text-(--text-h) flex-col gap-0.5">
                <p className="text-sm font-semibold tracking-tight text-foreground text-balance">{name}</p>
                <p className="text-xs text-muted-foreground">{count}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
