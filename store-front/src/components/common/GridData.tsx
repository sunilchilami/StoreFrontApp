import React from "react";
import { StoreItemsModel } from "../../models/Interfaces/StoreData";

interface Item {
  id: string;
  imageUrl: string;
  name: string;
  description: string;
  suggestedPrice: number;
  actualPrice: number;
  discountPrice: number;
}

interface GridDataProps {
  filteredItems: Item[];
  handleSort: (key: keyof StoreItemsModel) => void;
  onBuy: (item: StoreItemsModel) => void;
}

const GridData: React.FC<GridDataProps> = ({
  filteredItems,
  handleSort,
  onBuy,
}) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th onClick={() => handleSort("name")}>
              Name <img src="/sort.png" alt="sort" height={10} width={10} />
            </th>
            <th>Description</th>
            <th onClick={() => handleSort("suggestedPrice")}>
              Suggested Price{" "}
              <img src="/sort.png" alt="sort" height={10} width={10} />
            </th>
            <th onClick={() => handleSort("actualPrice")}>
              Actual Price{" "}
              <img src="/sort.png" alt="sort" height={10} width={10} />
            </th>
            <th onClick={() => handleSort("discountPrice")}>
              Discount <img src="/sort.png" alt="sort" height={10} width={10} />
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length > 0 ? (
            filteredItems?.map((item) => (
              <tr key={item?.id}>
                <td>{item.id}</td>
                <td>
                  <img
                    src={item.imageUrl}
                    alt="Default"
                    height={100}
                    width={100}
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.suggestedPrice}</td>
                <td>{item.actualPrice}</td>
                <td>{item.discountPrice}</td>
                <td>
                  <button type="button" onClick={() => onBuy(item)}>
                    Buy
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} style={{ textAlign: "center" }}>
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default GridData;
