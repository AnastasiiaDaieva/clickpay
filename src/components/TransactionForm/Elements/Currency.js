import s from "./Currency.module.scss";

function Currency({ currentValue, setCurrentValue }) {
  return (
    <div className={s.Currency}>
      <fieldset className={s.Currency__radios}>
        <div className={s.Currency__radios_wrapper}>
          <span
            className={s.Currency__label}
            style={{
              backgroundColor:
                currentValue === "dollar"
                  ? "var(--main-color)"
                  : "var(--inactive-color)",
              borderColor:
                currentValue === "dollar"
                  ? "var(--main-color)"
                  : "var(--inactive-color)",
            }}
            onClick={() => setCurrentValue("dollar")}
          >
            $
          </span>
        </div>

        <div className={s.Currency__radios_wrapper}>
          <span
            className={s.Currency__label}
            onClick={() => setCurrentValue("euro")}
            style={{
              backgroundColor:
                currentValue === "euro"
                  ? "var(--main-color)"
                  : "var(--inactive-color)",
              borderColor:
                currentValue === "euro"
                  ? "var(--main-color)"
                  : "var(--inactive-color)",
            }}
          >
            €
          </span>
        </div>
      </fieldset>
    </div>
  );
}

export default Currency;
