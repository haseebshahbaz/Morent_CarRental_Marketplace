import Image from "next/image"
import { FormInput } from "./form-input"
import Visa from "../../assets/Visa.png"
import Mastercard from "../../assets/mc.png"
import Paypal from "../../assets/PayPal.png"
import Bitcoin from "../../assets/Bitcoin.png"

export function PaymentMethod() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 p-4 bg-[#F6F7F9] rounded-[10px] border-2 border-[#3563E9]">
        <input
          type="radio"
          name="payment"
          value="credit-card"
          checked
          className="w-4 h-4 text-[#3563E9]"
        />
        <span className="flex-1 font-semibold">Credit Card</span>
        <div className="flex gap-2">
          <Image src={Visa.src} alt="Visa" width={60} height={20} />
          <Image src={Mastercard.src} alt="Mastercard" width={32} height={20} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <FormInput
          label="Card Number"
          placeholder="Card number"
          name="cardNumber"
        />
        <FormInput
          label="Expiration Date"
          placeholder="DD/MM/YY"
          name="expirationDate"
        />
        <FormInput
          label="Card Holder"
          placeholder="Card holder"
          name="cardHolder"
        />
        <FormInput
          label="CVC"
          placeholder="CVC"
          name="cvc"
        />
      </div>

      <div className="flex items-center gap-4 p-4 bg-[#F6F7F9] rounded-[10px]">
        <input
          type="radio"
          name="payment"
          value="paypal"
          className="w-4 h-4 text-[#3563E9]"
        />
        <span className="flex-1 font-semibold">PayPal</span>
      <Image src={Paypal.src} alt="PayPal" width={77} height={20} />
      </div>

      <div className="flex items-center gap-4 p-4 bg-[#F6F7F9] rounded-[10px]">
        <input
          type="radio"
          name="payment"
          value="bitcoin"
          className="w-4 h-4 text-[#3563E9]"
        />
        <span className="flex-1 font-semibold">Bitcoin</span>
        <Image src={Bitcoin.src} alt="Bitcoin" width={77} height={20} />
      </div>
    </div>
  )
}

