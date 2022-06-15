import { BiX, BiDotsHorizontalRounded, BiCheck } from "react-icons/bi";
import { useState } from "react";
import s from "./Status.module.scss";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

function Status({ status, updStatus, id }) {
  const [showIcons, setShowIcons] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [chosenStatus, setChosenStatus] = useState("pending");
  const handleClick = () => {
    setShowIcons(true);
  };
  // updStatus(status, id);

  const handleChoice = (status) => {
    setChosenStatus(status);
    setModalIsOpen(true);
    console.log(id);
    setShowIcons(false);
  };
  return (
    <div className={s.Status}>
      {modalIsOpen && (
        <ConfirmModal
          updStatus={updStatus}
          id={id}
          status={chosenStatus}
          setModalIsOpen={setModalIsOpen}
        />
      )}
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
