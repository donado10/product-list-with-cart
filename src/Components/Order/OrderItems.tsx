import React, { ReactNode } from "react";
import { useOrderContext } from "./OrderContext";
import Close from "@/assets/images/icon-remove-item.svg";

const OrderName: React.FC<{ name: string }> = ({ name }) => {
  return <h1 className="font-bold">{name}</h1>;
};

const OrderAmount: React.FC<{ amount: number }> = ({ amount }) => {
  return <h2 className="font-bold text-red-custom">{amount}x</h2>;
};

const OrderUnitPrice: React.FC<{ unit_price: number }> = ({ unit_price }) => {
  return <span className="price">@ ${unit_price.toFixed(2)}</span>;
};
const OrderPrice: React.FC<{ price: number }> = ({ price }) => {
  return <span className="total font-semibold">${price.toFixed(2)}</span>;
};

export const OrderSingle: React.FC<{
  name: string;
  amount: number;
  unit_price: number;
  price: number;
}> = ({ name, amount, unit_price, price }) => {
  const cartCtx = useOrderContext();
  return (
    <div className="flex w-full items-center justify-between border-b-2 border-rose-100 py-4">
      <div className="flex flex-col justify-center gap-1">
        <OrderName name={name} />
        <div className="details flex items-center gap-6">
          <OrderAmount amount={amount} />
          <div className="flex items-center gap-2">
            <OrderUnitPrice unit_price={unit_price} />
            <OrderPrice price={price} />
          </div>
        </div>
      </div>
      <button
        className="overflow-hidden rounded-full border-2 border-rose-400 p-1"
        onClick={() => {
          cartCtx?.deleteOrder(name);
        }}
      >
        <img src={Close} alt="" />
      </button>
    </div>
  );
};

export const OrderList: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ul className="flex flex-col justify-center">
      {React.Children.map(children, (child) => (
        <li>{child}</li>
      ))}
    </ul>
  );
};
export const OrderConfirmList: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <ul className="flex flex-col justify-center">
      {React.Children.map(children, (child) => (
        <li>{child}</li>
      ))}
    </ul>
  );
};

export const OrderTotal = () => {
  const cartCtx = useOrderContext()!;
  const value = cartCtx!.list?.reduce((prev, curr) => {
    return curr.price + prev;
  }, 0);
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">Order Total</span>
      <span className="text-2xl font-extrabold">${value?.toFixed(2)}</span>
    </div>
  );
};

export const OrderSingleModal: React.FC<{
  name: string;
  amount: number;
  unit_price: number;
  price: number;
}> = ({ name, amount, unit_price, price }) => {
  return (
    <div className="flex w-full items-center justify-between border-b-2 border-rose-100 py-4">
      <div className="flex flex-col justify-center gap-1">
        <OrderName name={name} />
        <div className="details flex items-center gap-6">
          <OrderAmount amount={amount} />
          <div className="flex items-center gap-2">
            <OrderUnitPrice unit_price={unit_price} />
            <OrderPrice price={price} />
          </div>
        </div>
      </div>
    </div>
  );
};
