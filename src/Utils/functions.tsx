import { IOrderElement } from "@/Components/Order/OrderContext";

export function deleteOrderByname(arr: IOrderElement[], name: string) {
  return arr.filter((obj) => obj.name !== name);
}
