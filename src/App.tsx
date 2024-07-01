import React, { useState } from "react";
import "./App.css";
import StoreItemList from "./components/StoreItemsList";
import { StoreItemsModel } from "../src/models/Interfaces/StoreData";
import CheckoutForm from "./components/CheckoutForm";
import OrderConfirmation from "./components/OrderConfirmation";

const App: React.FC = () => {
  const [page, setPage] = useState<"list" | "checkout" | "confirmation">(
    "list"
  );

  const [selectedItem, setSelectedItem] = useState<StoreItemsModel | null>(
    null
  );

  const [order, setOrder] = useState<{
    item: StoreItemsModel;
    customerInfo: any;
  } | null>(null);

  const handleBuy = (item: StoreItemsModel) => {
    setSelectedItem(item);
    setPage("checkout");
  };

  const handleSubmitOrder = (order: {
    item: StoreItemsModel;
    customerInfo: any;
  }) => {
    setOrder(order);
    setPage("confirmation");
  };

  const handleBackToList = () => {
    setPage("list");
    setSelectedItem(null);
    setOrder(null);
  };

  return (
    <div className="App">
      {page === "list" && <StoreItemList onBuy={handleBuy} />}

      {page === "checkout" && selectedItem && (
        <CheckoutForm
          item={selectedItem}
          onSubmit={handleSubmitOrder}
          onBack={handleBackToList}
        />
      )}

      {page === "confirmation" && order && (
        <OrderConfirmation order={order} onBack={handleBackToList} />
      )}
    </div>
  );
};

export default App;
