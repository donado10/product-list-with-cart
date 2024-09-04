import React, { ReactNode } from "react";
import {
  ProductImage,
  ProductName,
  ProductCategory,
  ProductPrice,
  ProductAddCartBtn,
  ProductEditQuantityBtn,
} from "./ProductItems";
import { IOrderElement } from "@/Store/features/cart";
import isEqual from "lodash.isequal";

interface ProductCardProps {
  children: ReactNode;
}

interface ProductCardComponents extends React.FC<ProductCardProps> {
  Image: React.FC<{
    image: {
      desktop: string;
      mobile: string;
      tablet: string;
      thumbnail: string;
    };
    isSelected?: boolean;
  }>;
  Name: React.FC<{ name: string }>;
  Category: React.FC<{ category: string }>;
  Price: React.FC<{ price: number }>;
  AddCartBtn: React.FC<{
    order: IOrderElement;
  }>;
  EditQuantityBtn: React.FC<{
    productName: string;
    order: IOrderElement;
  }>;
}

const ProductCard: ProductCardComponents = ({ children }: ProductCardProps) => {
  return (
    <div className="relative flex flex-col justify-center">{children}</div>
  );
};

export default ProductCard;

ProductCard.Image = ProductImage;
ProductCard.Name = ProductName;
ProductCard.Category = ProductCategory;
ProductCard.Price = ProductPrice;
ProductCard.AddCartBtn = React.memo(
  ProductAddCartBtn,
  (
    prevProps: Readonly<{
      order: IOrderElement;
    }>,
    nextProps: Readonly<{
      order: IOrderElement;
    }>,
  ) => {
    return isEqual(prevProps, nextProps);
  },
);
ProductCard.EditQuantityBtn = React.memo(
  ProductEditQuantityBtn,
  (
    prevProps: Readonly<{
      order: IOrderElement;
    }>,
    nextProps: Readonly<{
      order: IOrderElement;
    }>,
  ) => {
    return isEqual(prevProps, nextProps);
  },
);
