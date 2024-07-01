import React from "react";
import "../components/styles/OrderConfirmation.css";
import { StoreItemsModel } from "../models/Interfaces/StoreData";

interface OrderConfirmationProps {
  order: {
    item: StoreItemsModel;
    customerInfo: any;
  };
  onBack: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  order,
  onBack,
}) => {
  return (
    <div>
      <button className="backBtn" onClick={onBack}>
        Back to Store
      </button>
      <div className="order-confirmation">
        <h2>Order Confirmation</h2>
        <hr />
        <div style={{ display: "flex" }}>
          <img
            src={order.item.imageUrl}
            alt={order.item.name}
            width={150}
            height={150}
          />
          <div>
            <h3>{order.item.name}</h3>
            <p>{order.item.description}</p>
            <p>Price: ${order.item.actualPrice.toFixed(2)}</p>
          </div>
        </div>
        <div className="customer-info">
          <h3 className="headerBorder">Customer Information</h3>

          <p>
            <strong>Order Number : </strong>#
            {Math.floor(Math.random() * 100000)}
          </p>
          <p>
            <strong>Name : </strong>
            {order.customerInfo.fullName}
          </p>
          <p>
            <strong>Email : </strong>
            {order.customerInfo.email}
          </p>
          <p>
            <strong>Phone : </strong>
            {order.customerInfo.phone}
          </p>
          <p>
            <strong>Address : </strong>
            {order.customerInfo.address}
          </p>
        </div>
      </div>
    </div>
  );
};
export default OrderConfirmation;
