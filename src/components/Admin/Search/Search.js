import s from "./Search.module.scss";
import { BsXCircleFill } from "react-icons/bs";

function Search({ setSearchQuery, searchQuery }) {
  const onChange = (e) => {
    localStorage.setItem("query", e.currentTarget.value);
    setSearchQuery(e.currentTarget.value);
  };
  return (
    <div className={s.Search}>
      {" "}
      <label htmlFor="search" className={s.Search}>
        <input
          id="search"
          type="text"
          placeholder="search query"
          onChange={onChange}
          className={s.Search__input}
          value={searchQuery}
        />
        {/* <button className={s.Filter__clear} onClick={onClear}>
        <BsXCircleFill />
      </button> */}
      </label>
    </div>
  );
}

export default Search;
