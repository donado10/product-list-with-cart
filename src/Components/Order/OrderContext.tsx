import { createContext, ReactNode, useContext, useState } from "react";

export interface IOrderElement {
  name: string;
  unit_price: number;
  price: number;
  amount: number;
  thumbnail: string;
}

interface IOrderContext {
  list: IOrderElement[] | null;
  addOrder: (order: IOrderElement) => void;
  updateOrder: (updatedOrder: IOrderElement, order: string) => void;
  deleteOrder: (order: string) => void;
  resetOrder: () => void;
}

const OrderContext = createContext<IOrderContext | null>(null);

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  return context;
};

export const OrderContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<IOrderElement[] | null>([]);

  const addOrder = (order: IOrderElement) => {
    setCart([...(cart as IOrderElement[]), order]);
  };
  const updateOrder = (updatedOrder: IOrderElement, orderName: string) => {
    setCart((prev) => {
      return prev!.map((obj) =>
        obj.name === orderName ? { ...obj, ...updatedOrder } : obj,
      );
    });
  };
  const deleteOrder = (orderName: string) => {
    setCart((prev) => {
      return prev!.filter((obj) => obj.name !== orderName);
    });
  };

  const resetOrder = () => {
    setCart([]);
  };

  return (
    <OrderContext.Provider
      value={{ list: cart, addOrder, updateOrder, deleteOrder, resetOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
