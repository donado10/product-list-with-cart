import React, { ReactNode, useEffect, useState } from "react";
import ProductCard from "./Products/ProductCard";
import ProductCardContext from "./Products/ProductContext";
import { useOrderContext } from "./Order/OrderContext";

interface ProductListProps {
  children: ReactNode;
}

const ProductList = ({ children }: ProductListProps) => {
  return (
    <ul className="xs:grid-cols-1 xs:gap-8 grid w-full sm:grid-cols-3 sm:gap-4">
      {React.Children.map(children, (child) => (
        <li className="xs:self-center xs:justify-self-center sm:self-start sm:justify-self-start">
          {child}
        </li>
      ))}
    </ul>
  );
};

const Menu = () => {
  const [data, setData] = useState<
    { image: string; name: string; category: string; price: number }[] | []
  >([]);

  const cartCtx = useOrderContext()!;

  useEffect(() => {
    fetch("http://localhost:5173/data/data.json")
      .then((res) => res.json())
      .then((newData) => {
        const refactorData = newData.map((data: any) => {
          return {
            image: data.image.desktop,
            name: data.name,
            category: data.category,
            price: data.price,
          };
        });
        return setData(refactorData);
      });
  }, []);

  return (
    <>
      {data.length > 0 && (
        <div className="xs:w-full flex flex-col justify-center gap-4 xl:w-fit">
          <div>
            <h1 className="text-3xl font-bold">Desserts</h1>
          </div>
          <ProductList>
            {data?.map((d, i) => {
              return (
                <ProductCard key={i}>
                  <ProductCardContext.Provider value={d}>
                    <div className="relative mb-7 h-fit w-fit">
                      <ProductCard.Image />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                        {!cartCtx?.list?.find(
                          (value) => value.name === d.name,
                        ) && <ProductCard.AddCartBtn />}
                        {cartCtx?.list?.find(
                          (value) => value.name === d.name,
                        ) && <ProductCard.EditQuantityBtn />}
                      </div>
                    </div>
                    <ProductCard.Name />
                    <ProductCard.Category />
                    <ProductCard.Price />
                  </ProductCardContext.Provider>
                </ProductCard>
              );
            })}
          </ProductList>
        </div>
      )}
    </>
  );
};

export default Menu;
