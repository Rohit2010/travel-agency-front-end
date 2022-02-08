import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";

const columns = [
  { field: "id", headerName: "ID", width: 95 },
  {
    field: "Brand",
    headerName: "Brand",
    width: 120,
    editable: true,
  },
  {
    field: "ProductName",
    headerName: "Product Name",
    width: 168,
    editable: true,
  },
  {
    field: "description",
    headerName: "Description",
    width: 150,
    editable: true,
  },
  {
    field: "TradeName",
    headerName: "Trade Name",
    width: 160,
  },
  {
    field: "pcsinbox",
    headerName: "pcs inbox",
    width: 138,
  },
  {
    field: "minimumOrder",
    headerName: "Min order",
    width: 138,
  },
  {
    field: "cost",
    headerName: "cost",
    width: 130,
  },
  {
    field: "Long",
    headerName: "Long",
    width: 130,
  },
  {
    field: "Width",
    headerName: "Width",
    width: 130,
  },
  {
    field: "Height",
    headerName: "Height",
    width: 130,
  },
  {
    field: "boxSize",
    headerName: "box Size(M)",
    width: 155,
  },
];

const rows = [
  {
    id: 1,
    ProductName: "Snow",
    Brand: "Jon",
    description: "dummy data",
    TradeName: "mobilink net",
    pcsinbox: 10,
    minimumOrder: 7,
    cost: 55,
    Long: 54,
    Width: 14,
    Height: 72,
    boxSize: 34.14,
  },
  {
    id: 2,
    ProductName: "Lannister",
    Brand: "Cersei",
    description: "dummy data",
    TradeName: "mobilink net",
    pcsinbox: 20,
    minimumOrder: 4,
    cost: 45,
    Long: 44,
    Width: 12,
    Height: 92,
    boxSize: 44.14,
  },
  {
    id: 3,
    ProductName: "Lannister",
    Brand: "Jaime",
    description: "dummy data",
    TradeName: "mobilink net",
    pcsinbox: 30,
    minimumOrder: 90,
    cost: 35,
    Long: 34,
    Width: 32,
    Height: 12,
    boxSize: 34.14,
  },
  {
    id: 4,
    ProductName: "Stark",
    Brand: "Arya",
    description: "dummy data",
    TradeName: "mobilink net",
    pcsinbox: 40,
    minimumOrder: 23,
    cost: 25,
    Long: 24,
    Width: 82,
    Height: 92,
    boxSize: 54.14,
  },
  {
    id: 5,
    ProductName: "Targaryen",
    Brand: "Daenerys",
    description: "dummy data",
    TradeName: "mobilink net",
    pcsinbox: 50,
    minimumOrder: 34,
    cost: 15,
    Long: 14,
    Width: 62,
    Height: 72,
    boxSize: 44.14,
  },
  {
    id: 6,
    ProductName: "Melisandre",
    Brand: "ayrnaa",
    description: "dummy data",
    TradeName: "mobilink net",
    pcsinbox: 60,
    minimumOrder: 32,
    cost: 55,
    Long: 24,
    Width: 42,
    Height: 52,
    boxSize: 84.14,
  },
  {
    id: 7,
    ProductName: "Clifford",
    Brand: "Ferrara",
    description: "dummy data",
    TradeName: "mobilink net",
    pcsinbox: 250,
    minimumOrder: 32,
    cost: 95,
    Long: 64,
    Width: 32,
    Height: 42,
    boxSize: 64.14,
  },
  {
    id: 8,
    ProductName: "Frances",
    Brand: "Rossini",
    description: "dummy data",
    TradeName: "mobilink net",
    pcsinbox: 13,
    minimumOrder: 12,
    cost: 85,
    Long: 24,
    Width: 12,
    Height: 22,
    boxSize: 24.14,
  },
  {
    id: 9,
    ProductName: "Roxie",
    Brand: "Harvey",
    description: "dummy data",
    TradeName: "mobilink net",
    pcsinbox: 23,
    minimumOrder: 23,
    cost: 5,
    Long: 4,
    Width: 22,
    Height: 32,
    boxSize: 54.14,
  },
];

function OrderTabel() {
  const [data, setData] = React.useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8800/api/ItemManipulate/get",
    }).then((response) => {
      let datatoprint = response.data;
      for (const element of datatoprint) {
        element.id = element._id;
        element.ProductName = element.productName;
        element.Brand = element.brand;
        element.description = element.productDescription;
        element.TradeName = element.tradeName;
        element.pcsinbox = element.pcsInbox;
        element.minimumOrder = element.minimumOrder;
        element.cost = element.cost;
        element.Long = element.long;
        element.Width = element.width;
        element.Height = element.height;
        element.boxSize = element.boxSize;
      }
      setData(datatoprint);
    });
  }, []);

  return (
    <div
      style={{
        height: "470px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={6}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

export default OrderTabel;
