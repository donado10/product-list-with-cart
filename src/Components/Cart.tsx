import React from "react";
import Carbon from "@/assets/images/icon-carbon-neutral.svg";

type Props = {};

const OrderSingle = () => {
  return (
    <div className="w-full">
      <div>
        <h1></h1>
      </div>
      <div></div>
    </div>
  );
};

const OrderList = () => {};

const OrderTotal = () => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">Order Total</span>
      <span className="text-2xl font-extrabold">$50.50</span>
    </div>
  );
};

const Cart = (props: Props) => {
  return (
    <div className="flex h-fit flex-grow flex-col gap-4 rounded-md bg-white p-4 text-rose-900">
      <div>
        <h1 className="text-red-custom text-2xl font-bold">Your Cart</h1>
      </div>
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
