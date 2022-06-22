import { Table } from "react-bootstrap";
import Status from "../Status/Status";

function AdminTable({ transactions, updStatus }) {
  const headings = [
    "Time",
    "Account",
    "Amount",
    "Card",
    "Name",
    "Status",
    "Updated at",
  ];
  const convertDate = (date) => {
    const newDate = new Date(date)
      .toISOString()
      .substring(0, 10)
      .split("-")
      .reverse()
      .join(".");

    const newTime = new Date(date).toISOString().substring(11, 19);
    const array = newTime.split(":");
    const hours = array[0] * 1 + 3;
    const uaTime = [hours, array[1], array[2]].join(":");
    console.log(uaTime);

    const final = [uaTime, newDate].join(", ");
    return final;
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
            <td>
              {`${item.amount}`} {item.currency === "euro" ? "€" : "$"}
            </td>
            <td>{item.cardNumber}</td>
            <td>{item.holderName}</td>
            <td>
              <Status
                status={item.status}
                updStatus={updStatus}
                id={item._id}
              />
            </td>
            <td>
              {item.createdAt === item.updatedAt
                ? "-"
                : convertDate(item.updatedAt)}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default AdminTable;
