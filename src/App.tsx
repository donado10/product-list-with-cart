import "./App.css";
import Cart from "./Components/Cart";
import Menu from "./Components/Menu";
import { OrderContextProvider } from "./Components/Order/OrderContext";

function App() {
  return (
    <OrderContextProvider>
      <div className="flex justify-between gap-12 px-[7rem] py-[5.5rem] xs:flex-col xs:px-[1rem] sm:px-[4rem] md:px-[7rem] xl:flex-row">
        <Menu />
        <Cart />
      </div>
    </OrderContextProvider>
  );
}

export default App;
