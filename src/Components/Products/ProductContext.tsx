import { useContext } from "react";
import { createContext } from "react";

const ProductCardContext = createContext<{
  image: {
    desktop: string;
    mobile: string;
    tablet: string;
    thumbnail: string;
  };
  name: string;
  category: string;
  price: number;
} | null>(null);

export const useProductCardContext = () => {
  const context = useContext(ProductCardContext);
  return context;
};

export default ProductCardContext;
