import "./App.css";
import Cart from "./Components/Cart";
import Menu from "./Components/Menu";
import { OrderContextProvider } from "./Components/Order/OrderContext";

function App() {
  return (
    <OrderContextProvider>
      <div className="xs:flex-col flex justify-between gap-12 px-[7rem] py-[5.5rem] xl:flex-row">
        <Menu />
        <Cart />
      </div>
    </OrderContextProvider>
  );
}

export default App;
