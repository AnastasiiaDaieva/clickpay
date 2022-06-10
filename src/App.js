import Header from "components/Header/Header";
import s from "./App.module.scss";
import TransactionForm from "components/TransactionForm/TransactionForm";
import { useState } from "react";
import Notification from "components/Notification/Notification";
function App() {
  const [isInProgress, setIsInProgress] = useState(true);
  const [isSuccessful, setIsSuccessful] = useState(true);

  return (
    <div className={s.App}>
      <Header />
      <main>
        {isInProgress ? (
          <TransactionForm setIsInProgress={setIsInProgress} />
        ) : (
          <Notification
            isSuccessful={isSuccessful}
            setIsInProgress={setIsInProgress}
          />
        )}
      </main>
    </div>
  );
}

export default App;
