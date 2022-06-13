import { Table } from "react-bootstrap";
import Status from "../Status/Status";

function AdminTable({ transactions }) {
  const headings = ["Time", "Account", "Amount", "Card", "Name", "Status"];
  const convertDate = (date) => {
    const newDate = new Date(date)
      .toISOString()
      .substring(0, 10)
      .split("-")
      .reverse()
      .join(".");
    return newDate;
  };
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>#</th>
          {headings.map((heading, index) => (
            <th key={index}>{heading}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {transactions.map((item, index) => (
          <tr key={item._id}>
            <td>{index + 1}</td>
            <td>{convertDate(item.createdAt)}</td>
            <td>{item.account}</td>
            <td>{`${item.amount} ${item.currency}`}</td>
            <td>{item.cardNumber}</td>
            <td>{item.holderName}</td>
            <td>
              <Status status={item.status} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default AdminTable;
