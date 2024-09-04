import React, { ReactNode, useCallback, useEffect, useState } from "react";
import ProductCard from "./Products/ProductCard";
import ProductCardContext, {
  ProductCardProvider,
} from "./Products/ProductContext";
import { useOrderContext } from "./Order/OrderContext";

import { IProductData } from "./Products/ProductContext";

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

  const cartCtx = useOrderContext()!;
  useCallback(cartCtx?.addOrder, []);

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
                  <ProductCardProvider product={d}>
                    <div className="relative mb-7 h-fit w-fit">
                      <ProductCard.Image
                        image={d.image}
                        isSelected={cartCtx?.list?.some(
                          (order) => order.name === d.name,
                        )}
                      />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                        {!cartCtx?.list?.find(
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
                        {cartCtx?.list?.find(
                          (value) => value.name === d.name,
                        ) && (
                          <ProductCard.EditQuantityBtn
                            productName={d.name}
                            order={
                              cartCtx.list!.find(
                                (order) => order.name === d.name,
                              )!
                            }
                            onUpdateOrder={cartCtx.updateOrder.bind(
                              null,
                              cartCtx.list!.find(
                                (order) => order.name === d.name,
                              )!,
                              d.name,
                            )}
                            onDeleteOrder={cartCtx.deleteOrder.bind(
                              null,
                              d.name,
                            )}
                          />
                        )}
                      </div>
                    </div>
                    <ProductCard.Name name={d.name} />
                    <ProductCard.Category category={d.category} />
                    <ProductCard.Price price={d.price} />
                  </ProductCardProvider>
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
