import React, { useState } from "react";
import { StoreItemsModel, StoreItems } from "../models/Interfaces/StoreData";
import "./styles/StoreItemsList.css";
import GridData from "./common/GridData";

interface StoreItemsListProps {
  onBuy: (item: StoreItemsModel) => void;
}

const StoreItemList: React.FC<StoreItemsListProps> = ({ onBuy }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof StoreItemsModel;
    direction: "asc" | "desc";
  }>({ key: "name", direction: "asc" });

  const [filter, setFilter] = useState<string>("");

  const sortedItems = [...StoreItems].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key])
      return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key])
      return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const filteredItems = sortedItems.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleSort = (key: keyof StoreItemsModel) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <>
      <h2 style={{ color: "green", textAlign: "center", margin: 20 }}>
        Storefront App
      </h2>
      <div className="store-item-list">
        <div className="searchContainer">
          <input
            type="text"
            placeholder="Filter by name..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <GridData
          filteredItems={filteredItems}
          handleSort={handleSort}
          onBuy={onBuy}
        />
      </div>
    </>
  );
};
export default StoreItemList;
