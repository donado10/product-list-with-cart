import React, { ReactNode } from "react";

interface ProductListProps {
  children: ReactNode;
}

const ProductList = ({ children }: ProductListProps) => {
  return (
    <ul className="grid grid-cols-3 gap-8">
      {React.Children.map(children, (child) => (
        <li>{child}</li>
      ))}
    </ul>
  );
};

const Menu = () => {
  return (
    <div className="flex flex-col justify-center">
      <div>
        <h1 className="text-3xl font-bold">Desserts</h1>
      </div>
      <div className="">
        <ProductList></ProductList>
      </div>
    </div>
  );
};

export default Menu;
