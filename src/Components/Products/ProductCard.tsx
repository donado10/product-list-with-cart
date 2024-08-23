import React, { ReactElement, ReactNode } from "react";
import {
  ProductImage,
  ProductName,
  ProductCategory,
  ProductPrice,
  ProductAddCartBtn,
} from "./ProductItems";

interface ProductCardProps {
  children: ReactNode;
}

interface ProductCardComponents extends React.FC<ProductCardProps> {
  Image: React.FC;
  Name: React.FC;
  Category: React.FC;
  Price: React.FC;
  AddCartBtn: React.FC;
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
