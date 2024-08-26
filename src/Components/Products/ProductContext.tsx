import { useContext } from "react";
import { createContext } from "react";

interface IProductContext {
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

const ProductCardContext = createContext<IProductContext | null>(null);

export const useProductCardContext = () => {
  const context = useContext(ProductCardContext);
  return context;
};

export default ProductCardContext;
