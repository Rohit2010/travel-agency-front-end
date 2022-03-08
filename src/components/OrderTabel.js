import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import { REQUESTURL } from "../Constants";

// const columns = [
//   { field: "id", headerName: "ID", width: 95 },
//   {
//     field: "Brand",
//     headerName: "Brand",
//     width: 120,
//     editable: true,
//   },
//   {
//     field: "ProductName",
//     headerName: "Product Name",
//     width: 168,
//     editable: true,
//   },
//   {
//     field: "description",
//     headerName: "Description",
//     width: 150,
//     editable: true,
//   },
//   {
//     field: "TradeName",
//     headerName: "Trade Name",
//     width: 160,
//   },
//   {
//     field: "pcsinbox",
//     headerName: "pcs inbox",
//     width: 138,
//   },
//   {
//     field: "minimumOrder",
//     headerName: "Min order",
//     width: 138,
//   },
//   {
//     field: "cost",
//     headerName: "cost",
//     width: 130,
//   },
//   {
//     field: "Long",
//     headerName: "Long",
//     width: 130,
//   },
//   {
//     field: "Width",
//     headerName: "Width",
//     width: 130,
//   },
//   {
//     field: "Height",
//     headerName: "Height",
//     width: 130,
//   },
//   {
//     field: "boxSize",
//     headerName: "box Size(M)",
//     width: 155,
//   },
// ];

// const rows = [
//   {
//     id: 1,
//     ProductName: "Snow",
//     Brand: "Jon",
//     description: "dummy data",
//     TradeName: "mobilink net",
//     pcsinbox: 10,
//     minimumOrder: 7,
//     cost: 55,
//     Long: 54,
//     Width: 14,
//     Height: 72,
//     boxSize: 34.14,
//   },
//   {
//     id: 2,
//     ProductName: "Lannister",
//     Brand: "Cersei",
//     description: "dummy data",
//     TradeName: "mobilink net",
//     pcsinbox: 20,
//     minimumOrder: 4,
//     cost: 45,
//     Long: 44,
//     Width: 12,
//     Height: 92,
//     boxSize: 44.14,
//   },
//   {
//     id: 3,
//     ProductName: "Lannister",
//     Brand: "Jaime",
//     description: "dummy data",
//     TradeName: "mobilink net",
//     pcsinbox: 30,
//     minimumOrder: 90,
//     cost: 35,
//     Long: 34,
//     Width: 32,
//     Height: 12,
//     boxSize: 34.14,
//   },
//   {
//     id: 4,
//     ProductName: "Stark",
//     Brand: "Arya",
//     description: "dummy data",
//     TradeName: "mobilink net",
//     pcsinbox: 40,
//     minimumOrder: 23,
//     cost: 25,
//     Long: 24,
//     Width: 82,
//     Height: 92,
//     boxSize: 54.14,
//   },
//   {
//     id: 5,
//     ProductName: "Targaryen",
//     Brand: "Daenerys",
//     description: "dummy data",
//     TradeName: "mobilink net",
//     pcsinbox: 50,
//     minimumOrder: 34,
//     cost: 15,
//     Long: 14,
//     Width: 62,
//     Height: 72,
//     boxSize: 44.14,
//   },
//   {
//     id: 6,
//     ProductName: "Melisandre",
//     Brand: "ayrnaa",
//     description: "dummy data",
//     TradeName: "mobilink net",
//     pcsinbox: 60,
//     minimumOrder: 32,
//     cost: 55,
//     Long: 24,
//     Width: 42,
//     Height: 52,
//     boxSize: 84.14,
//   },
//   {
//     id: 7,
//     ProductName: "Clifford",
//     Brand: "Ferrara",
//     description: "dummy data",
//     TradeName: "mobilink net",
//     pcsinbox: 250,
//     minimumOrder: 32,
//     cost: 95,
//     Long: 64,
//     Width: 32,
//     Height: 42,
//     boxSize: 64.14,
//   },
//   {
//     id: 8,
//     ProductName: "Frances",
//     Brand: "Rossini",
//     description: "dummy data",
//     TradeName: "mobilink net",
//     pcsinbox: 13,
//     minimumOrder: 12,
//     cost: 85,
//     Long: 24,
//     Width: 12,
//     Height: 22,
//     boxSize: 24.14,
//   },
//   {
//     id: 9,
//     ProductName: "Roxie",
//     Brand: "Harvey",
//     description: "dummy data",
//     TradeName: "mobilink net",
//     pcsinbox: 23,
//     minimumOrder: 23,
//     cost: 5,
//     Long: 4,
//     Width: 22,
//     Height: 32,
//     boxSize: 54.14,
//   },
// ];
const columns = [
  { field: "id", headerName: "ID", width: 95 },
  {
    field: "ordername",
    headerName: "Order Name",
    width: 160,
    editable: true,
  },
  {
    field: "ProductName",
    headerName: "Product Name",
    width: 168,
    editable: true,
  },
  {
    field: "customer",
    headerName: "customer",
    width: 160,
    editable: true,
  },
  {
    field: "state",
    headerName: "state",
    width: 160,
  },
  {
    field: "QNT",
    headerName: "QNT",
    width: 138,
  },
  {
    field: "cost",
    headerName: "Cost",
    width: 138,
  },
  {
    field: "total",
    headerName: "total",
    width: 138,
  },
  {
    field: "partno",
    headerName: "Part no",
    width: 138,
  },
  {
    field: "totalsize",
    headerName: "Total Size",
    width: 145,
  },
  {
    field: "TotalBoxes",
    headerName: "Total Boxes",
    width: 155,
  },
  {
    field: "BKNO",
    headerName: "BK NO",
    width: 130,
  },
  {
    field: "date",
    headerName: "date",
    width: 145,
  },
  {
    field: "availabilityDate",
    headerName: "availability Date",
    width: 175,
  },
  {
    field: "deliveryDate",
    headerName: "delivery Date",
    width: 175,
  },
  {
    field: "Notes",
    headerName: "Notes",
    width: 155,
  },
];

const rows = [
  {
    id: 1,
    ProductName: "Snow",
    ordername: "Jon",
    customer: "dummy data",
    state: "Pending",
    QNT: 10,
    cost: 7,
    total: 54,
    partno: 14,
    totalsize: 72,
    TotalBoxes: 34.14,
    BKNO: 72,
    date: "2/4/2020",
    availabilityDate: "7/4/2021",
    deliveryDate: "4/9/2022",
    Notes: "Dummy notes",
  },
  {
    id: 2,
    ProductName: "Lannister",
    ordername: "Cersei",
    customer: "dummy data",
    state: "Available",
    QNT: 20,
    cost: 4,

    total: 44,
    partno: 12,
    totalsize: 92,
    TotalBoxes: 44.14,
    BKNO: 74,
    date: "2/4/2020",
    availabilityDate: "7/4/2021",
    deliveryDate: "4/9/2022",
    Notes: "Dummy notes",
  },
  {
    id: 3,
    ProductName: "Lannister",
    ordername: "Jaime",
    customer: "dummy data",
    state: "Shipping",
    QNT: 30,
    cost: 90,

    total: 34,
    partno: 32,
    totalsize: 12,
    TotalBoxes: 34.14,
    BKNO: 72,
    date: "2/4/2020",
    availabilityDate: "7/4/2021",
    deliveryDate: "4/9/2022",
    Notes: "Dummy notes",
  },
  {
    id: 4,
    ProductName: "Stark",
    ordername: "Arya",
    customer: "dummy data",
    state: "Received",
    QNT: 40,
    cost: 23,

    total: 24,
    partno: 82,
    totalsize: 92,
    TotalBoxes: 54.14,
    BKNO: 98,
    date: "2/4/2020",
    availabilityDate: "7/4/2021",
    deliveryDate: "4/9/2022",
    Notes: "Dummy notes",
  },
  {
    id: 5,
    ProductName: "Targaryen",
    ordername: "Daenerys",
    customer: "Delayed",
    state: "Canceled",
    QNT: 50,
    cost: 34,

    total: 14,
    partno: 62,
    totalsize: 72,
    TotalBoxes: 44.14,
    BKNO: 89,
    date: "2/4/2020",
    availabilityDate: "7/4/2021",
    deliveryDate: "4/9/2022",
    Notes: "Dummy notes",
  },
  {
    id: 6,
    ProductName: "Melisandre",
    ordername: "ayrnaa",
    customer: "dummy data",
    state: "Archived",
    QNT: 60,
    cost: 32,

    total: 24,
    partno: 42,
    totalsize: 52,
    TotalBoxes: 84.14,
    BKNO: 56,
    date: "2/4/2020",
    availabilityDate: "7/4/2021",
    deliveryDate: "4/9/2022",
    Notes: "Dummy notes",
  },
  {
    id: 7,
    ProductName: "Clifford",
    ordername: "Ferrara",
    customer: "dummy data",
    state: "pending",
    QNT: 250,
    cost: 32,
    total: 64,
    partno: 32,
    totalsize: 42,
    TotalBoxes: 64.14,
    BKNO: 85,
    date: "2/4/2020",
    availabilityDate: "7/4/2021",
    deliveryDate: "4/9/2022",
    Notes: "Dummy notes",
  },
  {
    id: 8,
    ProductName: "Frances",
    ordername: "Rossini",
    customer: "dummy data",
    state: "shipping",
    QNT: 13,
    cost: 12,
    total: 24,
    partno: 12,
    totalsize: 22,
    TotalBoxes: 24.14,
    BKNO: 76,
    date: "2/4/2020",
    availabilityDate: "7/4/2021",
    deliveryDate: "4/9/2022",
    Notes: "Dummy notes",
  },
  {
    id: 9,
    ProductName: "Roxie",
    ordername: "Harvey",
    customer: "dummy data",
    state: "Archived",
    QNT: 23,
    cost: 23,
    total: 4,
    partno: 22,
    totalsize: 32,
    TotalBoxes: 54.14,
    BKNO: 85,
    date: "2/4/2020",
    availabilityDate: "7/4/2021",
    deliveryDate: "4/9/2022",
    Notes: "Dummy notes",
  },
];

function OrderTabel() {
  const [data, setData] = React.useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: `${REQUESTURL}/api/OrderManipulate/get`,
    }).then((response) => {
      let datatoprint = response.data;
      for (const element of datatoprint) {
        element.id = element._id;
      }
      console.log(datatoprint);
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
