import { createContext, ReactNode, useContext, useState } from "react";

interface IOrderElement {
  name: string;
  unit_price: number;
  price: number;
  amount: number;
}

interface IOrderContext {
  list: IOrderElement[] | null;
  addOrder: (order: IOrderElement) => void;
  updateOrder: (order: string) => void;
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
  const updateOrder = (orderName: string) => {
    setCart((prev) => {
      return [...(prev as IOrderElement[])];
    });
  };

  return (
    <OrderContext.Provider value={{ list: cart, addOrder, updateOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
