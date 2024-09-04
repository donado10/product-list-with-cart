import React, { ReactNode } from "react";
import Close from "@/assets/images/icon-remove-item.svg";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/Store/store";
import { deleteOrder } from "@/Store/features/cart";

const OrderName: React.FC<{ name: string }> = ({ name }) => {
  return <h1 className="font-bold xs:text-sm sm:text-base">{name}</h1>;
};

const OrderAmount: React.FC<{ amount: number }> = ({ amount }) => {
  return (
    <h2 className="font-bold text-red-custom xs:text-xs sm:text-base">
      {amount}x
    </h2>
  );
};

const OrderUnitPrice: React.FC<{ unit_price: number }> = ({ unit_price }) => {
  return (
    <span className="price xs:text-xs sm:text-base">
      @ ${unit_price.toFixed(2)}
    </span>
  );
};
const OrderPrice: React.FC<{ price: number }> = ({ price }) => {
  return (
    <span className="total font-semibold xs:text-xs sm:text-base">
      ${price.toFixed(2)}
    </span>
  );
};

export const OrderSingle: React.FC<{
  name: string;
  amount: number;
  unit_price: number;
  price: number;
}> = ({ name, amount, unit_price, price }) => {
  const dispatch = useDispatch();
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
        className="overflow-hidden rounded-full border-2 border-rose-400 xs:p-[2px] sm:p-1"
        onClick={() => {
          dispatch(deleteOrder({ orderName: name }));
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
    <div className={`custom-scrollbar max-h-56 overflow-y-scroll p-2`}>
      <ul className="flex flex-col justify-center">
        {React.Children.map(children, (child) => (
          <li>{child}</li>
        ))}
      </ul>
    </div>
  );
};

export const OrderTotal = () => {
  const cartList = useSelector((state: IRootState) => state.cart);
  const value = cartList.list?.reduce((prev, curr) => {
    return curr.price + prev;
  }, 0);
  return (
    <div className="flex items-center justify-between p-2">
      <span className="text-sm">Order Total</span>
      <span className="font-extrabold xs:text-xl sm:text-2xl">
        ${value?.toFixed(2)}
      </span>
    </div>
  );
};

export const OrderSingleModal: React.FC<{
  name: string;
  amount: number;
  unit_price: number;
  price: number;
  thumbnail: string;
}> = ({ name, amount, unit_price, price, thumbnail }) => {
  return (
    <div className="flex w-full items-center gap-4 border-b-2 border-rose-100 py-4">
      <div className="aspect-square w-12 overflow-hidden rounded-l-md rounded-r-md">
        <img src={thumbnail} className="h-full w-full" alt="" />
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex w-full flex-col justify-center gap-1">
          <OrderName name={name} />
          <div className="details flex items-center gap-6">
            <OrderAmount amount={amount} />
            <div className="flex items-center gap-2">
              <OrderUnitPrice unit_price={unit_price} />
            </div>
          </div>
        </div>

        <OrderPrice price={price} />
      </div>
    </div>
  );
};
