import { BiX, BiDotsHorizontalRounded, BiCheck } from "react-icons/bi";
import { useState } from "react";
import s from "./Status.module.scss";

function Status({ status, updStatus }) {
  const [showIcons, setShowIcons] = useState(false);
  const handleClick = () => {
    setShowIcons(true);
  };

  const handleChoice = (status) => {
    updStatus(status);
    setShowIcons(false);
  };
  return (
    <div className={s.Status}>
      {status === "pending" && (
        <BiDotsHorizontalRounded onClick={handleClick} />
      )}
      {status === "rejected" && <BiX />}
      {status === "approved" && <BiCheck />}{" "}
      {showIcons && (
        <div className={s.Status__icons}>
          <BiX onClick={() => handleChoice("rejected")} />{" "}
          <BiCheck onClick={() => handleChoice("approved")} />
        </div>
      )}
    </div>
  );
}

export default Status;
