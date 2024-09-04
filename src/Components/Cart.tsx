import Carbon from "@/assets/images/icon-carbon-neutral.svg";
import { OrderList, OrderSingle, OrderTotal } from "./Order/OrderItems";
import { useState } from "react";
import MyPortal from "./Overlay";
import { OrderConfirmList, OrderSingleModal } from "./Order/OrderItems";
import Success from "@/assets/images/icon-order-confirmed.svg";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/Store/store";
import { resetOrder } from "@/Store/features/cart";

const CartConfirmModal: React.FC<{ onNewOrder: React.Dispatch<any> }> = ({
  onNewOrder,
}) => {
  const cartList = useSelector((state: IRootState) => state.cart);
  const dispatch = useDispatch();
  return (
    <div className="flex h-fit flex-col gap-4 rounded-md bg-white p-8 text-rose-900 xs:w-full sm:w-[37rem]">
      <div>
        <img src={Success} alt="" />
      </div>
      <div className="flex flex-col justify-center gap-1">
        <h1 className="text-2xl font-bold">Order Confirmed</h1>
        <h2 className="text-base text-rose-500">
          We hope you enjoy your food!
        </h2>
      </div>
      <div className="rounded-sm bg-rose-50">
        <OrderConfirmList>
          {cartList.list?.map((order, i) => (
            <OrderSingleModal
              key={i}
              name={order.name}
              price={order.price}
              unit_price={order.unit_price}
              amount={order.amount}
              thumbnail={order.thumbnail}
            />
          ))}
        </OrderConfirmList>
        <OrderTotal />
      </div>
      <button
        onClick={() => {
          console.log("hey");
          dispatch(resetOrder());
          onNewOrder(false);
        }}
        className="flex w-4/5 items-center justify-center self-center rounded-md rounded-l-3xl rounded-r-3xl bg-red-custom py-2 font-semibold text-white"
      >
        <span>Start New Order</span>
      </button>
    </div>
  );
};

const Cart = () => {
  const [enableModal, setEnableModal] = useState<boolean>(false);
  const cartList = useSelector((state: IRootState) => state.cart);

  return (
    <div className="flex h-fit flex-grow flex-col gap-4 rounded-md bg-white p-4 text-rose-900">
      {enableModal && (
        <MyPortal
          isOpen={enableModal}
          onClose={() => setEnableModal(false)}
          modal={<CartConfirmModal onNewOrder={setEnableModal} />}
        />
      )}
      <div>
        <h1 className="font-bold text-red-custom xs:text-xl sm:text-2xl">
          Your Cart{" "}
          {cartList.list.length > 0 ? `(${cartList.list.length})` : ""}
        </h1>
      </div>
      <OrderList>
        {cartList.list.length > 0 &&
          cartList.list?.map((order, i) => {
            return (
              <OrderSingle
                key={i}
                name={order.name}
                amount={order.amount}
                price={order.price}
                unit_price={order.unit_price}
              />
            );
          })}
      </OrderList>
      <OrderTotal />
      <div className="flex w-[90%] items-center justify-center gap-2 self-center rounded-md bg-rose-50 py-2">
        <span>
          <img src={Carbon} alt="" />
        </span>
        <span className="xs:text-xs sm:text-base">
          This is a <span className="font-bold">carbon-neutral</span> delivery
        </span>
      </div>
      <button
        onClick={() => {
          if (cartList.list!.length > 0) {
            setEnableModal(true);
          }
        }}
        className="flex w-4/5 items-center justify-center self-center rounded-md rounded-l-3xl rounded-r-3xl bg-red-custom py-2 font-semibold text-white"
      >
        <span>Confirm Order</span>
      </button>
    </div>
  );
};

export default Cart;
