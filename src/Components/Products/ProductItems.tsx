import React from "react";
import AddCartLogo from "@/assets/images/icon-add-to-cart.svg";

import { useProductCardContext } from "./ProductContext";

export const ProductImage: React.FC = () => {
  const productCtx = useProductCardContext();
  return (
    <div className="aspect-square w-56 overflow-hidden rounded-lg">
      <img className="h-full w-full" src={productCtx?.image} alt="" />
    </div>
  );
};

export const ProductName: React.FC = () => {
  const productCtx = useProductCardContext();

  return <h2 className="text-xs text-rose-500">{productCtx?.name}</h2>;
};

export const ProductCategory: React.FC = () => {
  const productCtx = useProductCardContext();
  return (
    <h1 className="text-base font-semibold text-rose-900">
      {productCtx?.category}
    </h1>
  );
};

export const ProductPrice: React.FC = () => {
  const productCtx = useProductCardContext();

  return (
    <h2 className="text-red-custom text-base font-semibold">
      ${productCtx?.price.toFixed(2)}
    </h2>
  );
};

export const ProductAddCartBtn = () => {
  const productCtx = useProductCardContext();

  return (
    <button className="flex w-40 items-center justify-center gap-4 rounded-l-3xl rounded-r-3xl border-[1px] border-rose-400 bg-white py-2">
      <span>
        <img src={AddCartLogo} alt="" />
      </span>
      <span className="text-sm font-semibold">Add to Cart</span>
    </button>
  );
};
