import { createPortal } from "react-dom";
import s from "./ConfirmModal.module.scss";
import { useEffect } from "react";
import { BiX } from "react-icons/bi";
import { Button } from "react-bootstrap";

const modalRoot = document.getElementById("modal-root");

function ConfirmModal({ id, updStatus, status, setModalIsOpen }) {
  const closeModal = () => {
    setModalIsOpen(false);
    console.log(id);
    document.body.style.overflow = "unset";
  };

  const confirmAction = (confirm) => {
    if (confirm) {
      updStatus(status, id);
      console.log(confirm);
    } else {
      console.log(confirm);
      setModalIsOpen(false);
    }
  };

  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.code === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleEscClose);

    return () => {
      window.removeEventListener("keydown", handleEscClose);
    };
  });

  const closeOverlay = (e) => {
    if (e.currentTarget === e.target || e.code === "Escape") {
      closeModal();
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={closeOverlay}>
      <div className={s.ConfirmModal}>
        <BiX className={s.ConfirmModal__close} onClick={closeModal} />
        <div className={s.ConfirmModal__body}>
          Are you sure you want to{" "}
          {status === "rejected" ? "reject" : "approve"} the transaction?
          <div className={s.ConfirmModal__controllers}>
            <Button
              className={s.ConfirmModal__button}
              onClick={() => confirmAction(true)}
            >
              Yes
            </Button>
            <Button
              className={s.ConfirmModal__button}
              onClick={() => confirmAction(false)}
            >
              No
            </Button>
          </div>
        </div>
      </div>
    </div>,
    modalRoot
  );
}

export default ConfirmModal;
