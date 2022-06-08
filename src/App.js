import Header from "components/Header/Header";
import s from "./App.module.scss";
import TransactionForm from "components/TransactionForm/TransactionForm";
function App() {
  return (
    <div className={s.App}>
      <Header />
      <main>
        <TransactionForm />
      </main>
    </div>
  );
}

export default App;
