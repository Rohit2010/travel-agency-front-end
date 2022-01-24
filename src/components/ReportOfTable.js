import React from "react";
import { styled } from "@mui/system";
import TablePaginationUnstyled from "@mui/base/TablePaginationUnstyled";

function createData(ProductName, QNT, cost, total, state, totalsize) {
  return { ProductName, QNT, cost, total, state, totalsize };
}

const rows = [
  createData("Cupcake", 305, 3.7, "$2456", "recived", 0.345),
  createData("Donut", 452, 25.0, "$2456", "cancelld", 0.645),
  createData("Eclair", 262, 16.0, "$2456", "recived", 0.945),
  createData("Frozen yoghurt", 159, 6.0, "$2456", "recived ", 0.245),
  createData("Gingerbread", 356, 16.0, "$2456", "cancelled", 0.645),
  createData("Honeycomb", 408, 3.2, "$2456", "cancelld", 0.545),
  createData("Ice cream sandwich", 237, 9.0, "$2456", "recived", 0.845),
  createData("Jelly Bean", 375, 0.0, "$2456", "cancelld", 0.45),
  createData("KitKat", 518, 26.0, "$2456", "recived ", 0.59),
  createData("Lollipop", 392, 0.2, "$2456", "recived ", 0.145),
  createData("Marshmallow", 318, 0, "$2456", "cancelled", 0.345),
  createData("Nougat", 360, 19.0, "$2456", "cancelled", 0.645),
  createData("Oreo", 437, 18.0, "$2456", "cancelled", 0.745),
].sort((a, b) => (a.QNT < b.QNT ? -1 : 1));

const Root = styled("div")`
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid #ddd;
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: #ddd;
  }
`;

const CustomTablePagination = styled(TablePaginationUnstyled)`
  & .MuiTablePaginationUnstyled-toolbar {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .MuiTablePaginationUnstyled-selectLabel {
    margin: 0;
  }

  & .MuiTablePaginationUnstyled-displayedRows {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .MuiTablePaginationUnstyled-spacer {
    display: none;
  }

  & .MuiTablePaginationUnstyled-actions {
    display: flex;
    gap: 0.25rem;
  }
`;

function ReportOfTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      {" "}
      <Root sx={{ maxWidth: "100%", width: 1000 }}>
        <table aria-label="custom pagination table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>QNT</th>
              <th>Cost</th>
              <th>total</th>
              <th>state</th>
              <th>state size</th>
            </tr>
          </thead>
          <tbody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <tr key={row.ProductName}>
                <td style={{ width: 350 }}>{row.ProductName}</td>
                <td style={{ width: 250 }} align="right">
                  {row.QNT}
                </td>
                <td style={{ width: 160 }} align="right">
                  {row.cost}
                </td>
                <td style={{ width: 160 }} align="right">
                  {row.total}
                </td>
                <td style={{ width: 160 }} align="right">
                  {row.state}
                </td>
                <td style={{ width: 360 }} align="right">
                  {row.totalsize}
                </td>
              </tr>
            ))}

            {emptyRows > 0 && (
              <tr style={{ height: 41 * emptyRows }}>
                <td colSpan={3} />
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <CustomTablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={6}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                componentsProps={{
                  select: {
                    "aria-label": "rows per page",
                  },
                  actions: {
                    showFirstButton: true,
                    showLastButton: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </tr>
          </tfoot>
        </table>
      </Root>
    </div>
  );
}

export default ReportOfTable;
