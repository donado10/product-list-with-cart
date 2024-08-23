import { useContext } from "react";
import { createContext } from "react";

const ProductCardContext = createContext<{
  image: string;
  name: string;
  category: string;
  price: number;
} | null>(null);

export const useProductCardContext = () => {
  const context = useContext(ProductCardContext);
  return context;
};

export default ProductCardContext;
