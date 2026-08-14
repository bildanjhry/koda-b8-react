import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import useUser from "@/hooks/useUser";
import moneyFormat from "@/utils/money-format.js"
import { UserContext } from "@/hooks/context/UserContext"

// import { useContext } from "react";
// import { CheckoutContext } from "@/hooks/context/UserContext";

// component
import CompleteCheckout from "@/components/ui/CompleteCheckout";

// assets
import Safe from "@/assets/icons/safe-blue.svg"
import Lock from "@/assets/icons/lock-white.svg"
import { useSelector } from "react-redux";

export default function Confirm() {
  const [complete, setComplete] = useState(false)
  //const [step] = useContext(CheckoutContext)
  const [globalCart, setGlobalCart] = useContext(UserContext)
  const location = useLocation()
  const navigate = useNavigate()
  const [formCheckout, setFormCheckout] = useState()
  const [totalCheckout, setTotalCheckout] = useState(0)
  const [items, setItems] = useState([])
  const [itemsPre, setItemsPre] = useState([])
  const { setCart, user, setterCheckout } = useUser()
  const session = useSelector(state => state.session.session)

  useEffect(() => {
    function getState() {
      setFormCheckout(location.state.data)
    }
    getState()
  }, [location])

  async function addOrder(data) {
    try {
      const API = import.meta.env.VITE_API_URL
      const token = session.token
      const res = await fetch(`${API}/orders`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      const result = await res.json()
      return result
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    let itemsTotal = []
    if (globalCart.length > 0) {
      setItemsPre(globalCart)
      setTotalCheckout(moneyFormat(globalCart.reduce((acc, item) => acc + (item.price * item.quantity_prod), 0))[0])
      itemsTotal = globalCart.map((item) => {
        return {
          id_product: item.id_var,
          quantity: item.quantity_prod
        }
      })
    } else {
      setItemsPre(location.state.data.items)
      setTotalCheckout(moneyFormat(location.state.data.items.reduce((acc, item) => acc + (item.price * item.qty), 0))[0])
      itemsTotal = location.state.data.order_items
    }
    setItems(itemsTotal)
  }, [globalCart, location])

  async function handleCheckout() {
    const formCheckoutProcess = {
      ...formCheckout,
      idCheckout: 1,
      checkoutDate: new Date().toLocaleString(),
      products: location.state.data.items,
      grandTotal: totalCheckout,
      status: {
        STEP: 1,
        message: "Pesanan Diterima",
        duration: new Date().toLocaleString(),
        merchantStatus: "Diterima"
      },
    }

    setCart([])
    const res = await addOrder({
      id_payment_method: parseInt(formCheckout.paymentMethod),
      id_delivery_method: parseInt(formCheckout.deliveryMethod.split(",")[0]),
      items: items
    })
    if (res.success) {
      if (globalCart.length > 0) {
        const API = import.meta.env.VITE_API_URL
        const token = session.token
        const id = globalCart[0].id_cart
        const result = await fetch(`${API}/carts/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        const data = await result.json()
        if (data.success) {
          navigate("/checkout-complete", { state: { data: formCheckoutProcess } })
          window.scrollTo({ top: 0 })
        }
      } else {
        navigate("/checkout-complete", { state: { data: formCheckoutProcess } })
        window.scrollTo({ top: 0 })
      }
    }
  }

  return (
    <>
      {complete ?
        <CompleteCheckout />
        :
        <div>
          <header>
            <h3>Konfirmasi Pesanan</h3>
          </header>
          <main className="mt-7 flex flex-col gap-5">
            <div className="w-full h-fit p-5 flex flex-col gap-1 bg-(--input-bg) rounded-xl">
              <p className="text-h">Alamat Pengiriman</p>
              <div className="flex items-center gap-2 text-sm mt-1">
                <p>{formCheckout?.fullname}</p>
                <span>·</span>
                <p>{formCheckout?.phone}</p>
              </div>
              <p className="text-sm">{formCheckout?.fulladdress}</p>
            </div>

            <div className="w-full h-fit p-5 flex flex-col gap-1 bg-(--input-bg) rounded-xl">
              <p className="text-h">Metode Pengiriman</p>
              <div className="text-sm flex items-center gap-2">
                <p>{formCheckout?.deliveryMethod.split(",")[1]}</p>
              </div>
            </div>

            <div className="w-full h-fit p-5 flex flex-col gap-1 bg-(--input-bg) rounded-xl">
              <p className="text-h">Produk yang Dipesan</p>
              <ul className="flex flex-col items-center gap-3 mt-4">
                {itemsPre.map((item, index) => (
                  <li
                    key={index}
                    className="flex w-full justify-between h-12 items-center text-sm">
                    <img
                      className="w-12 rounded-lg"
                      src={`${import.meta.env.VITE_API_URL}/${item?.image}`} alt={item?.alt} />
                    <div className="flex justify-between items-center w-[91%] h-full">
                      <div className="flex flex-col justify-center h-full">
                        <p className="text-h">{item.name}</p>
                        <p>x{item.quantity_prod}</p>
                      </div>
                      <h4 className="text-(--text-high) text-md">{moneyFormat(item.price)[0]}</h4>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full bg-(--accent-bg) mt-3 rounded-xl  flex 
						text-xs items-start px-4 gap-3 py-4">
              <img
                className="w-6"
                src={Safe} alt="safe guarantee" />
              <p>Dengan menekan "Bayar Sekarang", kamu menyetujui Syarat & Ketentuan kami. Pembayaran baru akan
                diproses setelah kamu mengkonfirmasi di langkah ini.</p>
            </div>
            <div className="flex row gap-2 justify-between items-center mt-2">
              <button
                type="button"
                onClick={() => navigate("/checkout/payment", { state: { step: 2, data: formCheckout } })}
                className="rounded-xl cursor-pointer
							text-sm w-[15%] h-13 flex justify-center items-center border-light">
                Kembali
              </button>
              <button
                type="submit"
                onClick={() => { handleCheckout() }}
                className="flex gap-2 text-sm text-white bg-(--action-bg) rounded-xl h-13 items-center
									justify-center w-[85%] cursor-pointer">
                <img
                  className="relative bottom-px"
                  src={Lock} alt="payment step" />
                <p>Bayar {totalCheckout} Sekarang</p>
              </button>
            </div>

          </main>
        </div>
      }
    </>
  )
}