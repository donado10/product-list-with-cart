import React, { ReactNode } from "react";
import Carbon from "@/assets/images/icon-carbon-neutral.svg";
import Close from "@/assets/images/icon-remove-item.svg";

const OrderSingle: React.FC<{
  name: string;
  amount: number;
  unit_price: number;
  price: number;
}> = ({ name, amount, unit_price, price }) => {
  return (
    <div className="flex w-full items-center justify-between border-b-2 border-rose-100 py-4">
      <div className="flex flex-col justify-center gap-1">
        <h1 className="font-bold">{name}</h1>
        <div className="details flex items-center gap-6">
          <h2 className="text-red-custom font-bold">{amount}x</h2>
          <div className="flex items-center gap-2">
            <span className="price">@ ${unit_price.toFixed(2)}</span>
            <span className="total font-semibold">${price.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <button className="overflow-hidden rounded-full border-2 border-rose-400 p-1">
        <img src={Close} alt="" />
      </button>
    </div>
  );
};

const OrderList: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ul className="flex flex-col justify-center">
      {React.Children.map(children, (child) => (
        <li>{child}</li>
      ))}
    </ul>
  );
};

const OrderTotal = () => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">Order Total</span>
      <span className="text-2xl font-extrabold">$50.50</span>
    </div>
  );
};

const Cart = () => {
  return (
    <div className="flex h-fit flex-grow flex-col gap-4 rounded-md bg-white p-4 text-rose-900">
      <div>
        <h1 className="text-red-custom text-2xl font-bold">Your Cart</h1>
      </div>
      <OrderList>
        <div></div>
      </OrderList>
      <OrderTotal />
      <div className="flex w-4/5 items-center justify-center gap-2 self-center rounded-md bg-rose-50 py-2">
        <span>
          <img src={Carbon} alt="" />
        </span>
        <span>
          This is a <span className="font-bold">carbon-neutral</span> delivery
        </span>
      </div>
      <button className="bg-red-custom flex w-4/5 items-center justify-center self-center rounded-md rounded-l-3xl rounded-r-3xl py-2 font-semibold text-white">
        <span>Confirm Order</span>
      </button>
    </div>
  );
};

export default Cart;
