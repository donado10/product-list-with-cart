import React, { ReactNode } from "react";
import {
  ProductImage,
  ProductName,
  ProductCategory,
  ProductPrice,
  ProductAddCartBtn,
  ProductEditQuantityBtn,
} from "./ProductItems";
import { IOrderElement } from "../Order/OrderContext";

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
    onAddCart: (order?: IOrderElement) => void;
  }>;
  EditQuantityBtn: React.FC<{
    productName: string;
    order: IOrderElement;
    onUpdateOrder: (order: IOrderElement, name: string) => any;
    onDeleteOrder: (name: string) => any;
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
ProductCard.AddCartBtn = ProductAddCartBtn;
ProductCard.EditQuantityBtn = ProductEditQuantityBtn;
