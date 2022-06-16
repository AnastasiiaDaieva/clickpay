import TransactionForm from "components/TransactionForm/TransactionForm";
import Notification from "components/Notification/Notification";
import { useState } from "react";

function HomepageView() {
  const [isInProgress, setIsInProgress] = useState(true);
  const [isSuccessful, setIsSuccessful] = useState("");
  return (
    <>
      {isInProgress ? (
        <TransactionForm
          setIsInProgress={setIsInProgress}
          setIsSuccessful={setIsSuccessful}
        />
      ) : (
        <Notification
          isSuccessful={isSuccessful}
          setIsInProgress={setIsInProgress}
        />
      )}
    </>
  );
}

export default HomepageView;
