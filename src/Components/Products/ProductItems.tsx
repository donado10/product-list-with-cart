import React, { useEffect, useState } from "react";
import AddCartLogo from "@/assets/images/icon-add-to-cart.svg";
import IncrementQuantity from "@/assets/images/icon-increment-quantity.svg";
import DecrementQuantity from "@/assets/images/icon-decrement-quantity.svg";

import useMediaQuery from "@/Hooks/useMediaQuery";
import { MediaQuery } from "@/Shared/enum";
import { useDispatch } from "react-redux";
import {
  addOrder,
  deleteOrder,
  IOrderElement,
  updateOrder,
} from "@/Store/features/cart";

import { isEqual } from "lodash";

export const ProductImage: React.FC<{
  image: {
    desktop: string;
    mobile: string;
    tablet: string;
    thumbnail: string;
  };
  isSelected?: boolean;
}> = React.memo(({ image, isSelected = false }) => {
  const isBig = useMediaQuery(MediaQuery.BIG);
  const isSmall = useMediaQuery(MediaQuery.SMALL);
  const isMobile = useMediaQuery(MediaQuery.MOBILE);

  const handleSelectStyle = isSelected ? "border-[3px] border-red-custom" : "";

  return (
    <>
      {isMobile && !isSmall && !isBig && (
        <div
          className={`aspect-[1/0.6] w-full overflow-hidden rounded-lg ${handleSelectStyle}`}
        >
          <img className={`h-full w-full`} src={image.mobile} alt="" />
        </div>
      )}
      {isSmall && !isBig && (
        <div
          className={`aspect-square w-52 overflow-hidden rounded-lg ${handleSelectStyle}`}
        >
          <img className={`h-full w-full`} src={image.tablet} alt="" />
        </div>
      )}
      {isBig && (
        <div
          className={`aspect-square w-56 overflow-hidden rounded-lg ${handleSelectStyle}`}
        >
          <img className={`h-full w-full`} src={image.desktop} alt="" />
        </div>
      )}
    </>
  );
});

export const ProductName: React.FC<{ name: string }> = React.memo(
  ({ name }) => {
    return <h2 className="text-xs text-rose-500">{name}</h2>;
  },
);

export const ProductCategory: React.FC<{ category: string }> = React.memo(
  ({ category }) => {
    return (
      <h1 className="text-base font-semibold text-rose-900">{category}</h1>
    );
  },
);

export const ProductPrice: React.FC<{ price: number }> = React.memo(
  ({ price }) => {
    return (
      <h2 className="text-base font-semibold text-red-custom">
        ${price.toFixed(2)}
      </h2>
    );
  },
);

export const ProductAddCartBtn: React.FC<{
  order: IOrderElement;
}> = React.memo(({ order }) => {
  const dispatch = useDispatch();

  console.log("ProductAddCartBtn");

  return (
    <button
      onClick={() => {
        dispatch(addOrder(order));
      }}
      className="flex w-40 items-center justify-center gap-4 rounded-l-3xl rounded-r-3xl border-[1px] border-rose-400 bg-white py-2"
    >
      <span>
        <img src={AddCartLogo} alt="" />
      </span>
      <span className="text-sm font-semibold">Add to Cart</span>
    </button>
  );
});

export const ProductEditQuantityBtn: React.FC<{
  productName: string;
  order: IOrderElement;
}> = React.memo(({ productName, order }) => {
  const [value, setValue] = useState<number>(1);

  console.log("ProductAddCartBtn");

  const dispatch = useDispatch();

  useEffect(() => {
    if (value <= 0) {
      dispatch(deleteOrder({ orderName: productName }));
    }

    const newOrder = { ...order };

    newOrder!.amount = value;
    newOrder!.price = value * newOrder!.unit_price;

    dispatch(updateOrder({ orderToUpdate: newOrder, orderName: productName }));

    return;
  }, [value]);

  return (
    <div className="flex w-40 items-center justify-between gap-4 rounded-l-3xl rounded-r-3xl bg-red-custom px-2 py-2 text-white">
      <button
        onClick={() => {
          if (value < 0) {
            return;
          }
          setValue(value - 1);
        }}
        className="flex aspect-square w-4 items-center justify-center rounded-full border-[1px] border-white"
      >
        <img src={DecrementQuantity} alt="" />
      </button>
      <span className="text-sm font-semibold">{value >= 0 ? value : 0}</span>
      <button
        onClick={() => {
          setValue(value + 1);
        }}
        className="flex aspect-square w-4 items-center justify-center rounded-full border-[1px] border-white"
      >
        <img src={IncrementQuantity} alt="" />
      </button>
    </div>
  );
});
