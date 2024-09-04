/* import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

export interface IOrderElement {
  name: string;
  unit_price: number;
  price: number;
  amount: number;
  thumbnail: string;
}

interface IOrderContext {
  list: IOrderElement[] | null;
  addOrder: (cart: IOrderElement[], order: IOrderElement) => void;
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

  const addOrder = useCallback(
    (cartList: IOrderElement[], order: IOrderElement) => {
      if (order != undefined) {
        setCart([...(cartList as IOrderElement[]), order]);
      }
    },
    [],
  );

  const updateOrder = useCallback(
    (updatedOrder?: IOrderElement, orderName?: string) => {
      if (updateOrder !== undefined && orderName !== undefined) {
        setCart((prev) => {
          return prev!.map((obj) =>
            obj.name === orderName ? { ...obj, ...updatedOrder } : obj,
          );
        });
        return;
      }
      return;
    },
    [],
  );

  const deleteOrder = useCallback((orderName?: string) => {
    if (orderName) {
      setCart((prev) => {
        return prev!.filter((obj) => obj.name !== orderName);
      });
      return;
    }
    return;
  }, []);

  const resetOrder = useCallback(() => {
    setCart([]);
  }, []);

  return (
    <OrderContext.Provider
      value={{ list: cart, addOrder, updateOrder, deleteOrder, resetOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
 */
