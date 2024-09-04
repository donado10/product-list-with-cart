import { ReactNode, useCallback, useContext, useState } from "react";
import { createContext } from "react";
import { IOrderElement, useOrderContext } from "../Order/OrderContext";
import React from "react";

export interface IProductData {
  image: {
    desktop: string;
    mobile: string;
    tablet: string;
    thumbnail: string;
  };
  name: string;
  category: string;
  price: number;
}

interface IProduct {
  image: {
    desktop: string;
    mobile: string;
    tablet: string;
    thumbnail: string;
  };
  name: string;
  category: string;
  price: number;
}

interface IProductContext {
  product: IProduct;
  addToCart: (order: IOrderElement) => void;
}

const ProductCardContext = createContext<IProductContext | null>(null);

export const useProductCardContext = () => {
  const context = useContext(ProductCardContext);
  return context;
};

export const ProductCardProvider: React.FC<{
  children: ReactNode;
  product: IProductData;
}> = React.memo(({ children, product }) => {
  const [productDetail, setProductDetail] = useState<IProduct>(product);
  const orderCtx = useOrderContext();
  const { list, addOrder } = { ...orderCtx! };

  const addToCart = useCallback((order: IOrderElement) => {
    addOrder(list!, order);
  }, []);
  return (
    <ProductCardContext.Provider value={{ product: productDetail, addToCart }}>
      {children}
    </ProductCardContext.Provider>
  );
});

export default ProductCardContext;
