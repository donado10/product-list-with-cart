import React, { ReactNode, useEffect, useState } from "react";
import ProductCard from "./Products/ProductCard";
import ProductCardContext from "./Products/ProductContext";

import { IProductData } from "./Products/ProductContext";
import { useSelector } from "react-redux";
import { IRootState } from "@/Store/store";

interface ProductListProps {
  children: ReactNode;
}

const ProductList = ({ children }: ProductListProps) => {
  return (
    <ul className="grid w-full xs:grid-cols-1 xs:gap-8 sm:grid-cols-3 sm:gap-4">
      {React.Children.map(children, (child) => (
        <li className="xs:self-center xs:justify-self-center sm:self-start sm:justify-self-start">
          {child}
        </li>
      ))}
    </ul>
  );
};

const Menu = () => {
  const [data, setData] = useState<IProductData[] | []>([]);

  const cartList = useSelector((state: IRootState) => state.cart);

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((newData) => {
        return setData(newData);
      });
  }, []);

  return (
    <>
      {data.length > 0 && (
        <div className="flex flex-col justify-center gap-4 xs:w-full xl:w-fit">
          <div>
            <h1 className="text-3xl font-bold">Desserts</h1>
          </div>
          <ProductList>
            {data?.map((d, i) => {
              return (
                <ProductCard key={i}>
                  <ProductCardContext.Provider value={d}>
                    <div className="relative mb-7 h-fit w-fit">
                      <ProductCard.Image
                        image={d.image}
                        isSelected={cartList.list?.some(
                          (order) => order.name === d.name,
                        )}
                      />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                        {!cartList.list?.find(
                          (value) => value.name === d.name,
                        ) && (
                          <ProductCard.AddCartBtn
                            order={{
                              name: d.name,
                              amount: 1,
                              unit_price: d.price,
                              price: d.price * 1,
                              thumbnail: d.image.thumbnail,
                            }}
                          />
                        )}
                        {cartList.list?.find(
                          (value) => value.name === d.name,
                        ) && (
                          <ProductCard.EditQuantityBtn
                            productName={d.name}
                            order={
                              cartList.list!.find(
                                (order) => order.name === d.name,
                              )!
                            }
                          />
                        )}
                      </div>
                    </div>
                    <ProductCard.Name name={d.name} />
                    <ProductCard.Category category={d.category} />
                    <ProductCard.Price price={d.price} />
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
