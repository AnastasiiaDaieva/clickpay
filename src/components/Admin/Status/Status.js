import { BiX, BiDotsHorizontalRounded, BiCheck } from "react-icons/bi";

function Status({ status }) {
  return (
    <>
      {status === "pending" && <BiDotsHorizontalRounded />}
      {status === "rejected" && <BiX />}

      {status === "approved" && <BiCheck />}
    </>
  );
}

export default Status;
