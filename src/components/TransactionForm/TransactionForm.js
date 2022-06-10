import { useForm } from "react-hook-form";
import s from "./TransactionForm.module.scss";
import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

function TransactionForm({ setIsInProgress }) {
  const [currentValue, setCurrentValue] = useState("dollar");
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  console.log(currentValue);
  const onSubmit = (data) => {
    console.log(data);
    const {
      tradeaccount,
      sum,
      cardnumber,
      name: holderName,
      expiration,
      cvv,
    } = data;

    const operation = {
      tradeaccount: tradeaccount,
      sum: sum,
      cardnumber: cardnumber,
      holderName: holderName,
      expiration: expiration,
      cvv: cvv,
      currency: currentValue,
    };
    console.log(operation);
    setIsInProgress(false);
    reset();
  };
  return (
    <div className={s.TransactionForm__container}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.TransactionForm}>
        <div className={s.TransactionForm__payment_info}>
          {" "}
          <div className={s.TransactionForm__account}>
            <input
              type="text"
              name="tradeaccount"
              placeholder="your trade account"
              className={s.TransactionForm__entry}
              {...register("tradeaccount", {
                required: true,
              })}
            />{" "}
            {errors.tradeaccount && <span>Fill the entry</span>}
          </div>
          <div className={s.TransactionForm__payment_data}>
            {" "}
            <div
              className={`${s.TransactionForm__group} ${s.TransactionForm__sum}`}
            >
              <input
                type="number"
                name="sum"
                placeholder="0 000 000,00"
                className={s.TransactionForm__entry}
                {...register("sum", {
                  required: true,
                })}
              />
              {errors.sum && <span>Fill the entry</span>}
            </div>
            <div className={s.TransactionForm__currency}>
              {" "}
              <fieldset className={s.TransactionForm__radios}>
                <div className={s.TransactionForm__radios_wrapper}>
                  <span
                    className={s.TransactionForm__currency_label}
                    style={{
                      backgroundColor:
                        currentValue === "dollar"
                          ? "var(--main-color)"
                          : "var(--inactive-color)",
                    }}
                    onClick={() => setCurrentValue("dollar")}
                  >
                    $
                  </span>
                </div>

                <div className={s.TransactionForm__radios_wrapper}>
                  <span
                    className={s.TransactionForm__currency_label}
                    onClick={() => setCurrentValue("euro")}
                    style={{
                      backgroundColor:
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
          </div>
        </div>
        <div className={s.TransactionForm__card_info}>
          <div
            className={`${s.TransactionForm__group} ${s.TransactionForm__number}`}
          >
            <input
              type="number"
              name="cardnumber"
              placeholder="0000 0000 0000 0000"
              className={`${s.TransactionForm__entry} `}
              {...register("cardnumber", {
                required: true,
              })}
            />
            {errors.cardnumber && <span>Fill the entry</span>}
          </div>{" "}
          <div className={s.TransactionForm__card_data}>
            {" "}
            <div
              className={`${s.TransactionForm__group} ${s.TransactionForm__name}`}
            >
              <input
                type="text"
                name="name"
                placeholder="your name"
                className={`${s.TransactionForm__entry} `}
                {...register("name", {
                  required: true,
                })}
              />
              {errors.name && <span>Fill the entry</span>}
            </div>{" "}
            <div
              className={`${s.TransactionForm__group} ${s.TransactionForm__expiration}`}
            >
              <input
                type="number"
                name="expiration"
                placeholder="mm/yy"
                className={`${s.TransactionForm__entry} `}
                {...register("expiration", {
                  required: true,
                })}
              />
              {errors.expiration && <span>Fill the entry</span>}
            </div>
          </div>
          <div
            className={`${s.TransactionForm__group} ${s.TransactionForm__cvv}`}
          >
            <input
              type="number"
              name="cvv"
              placeholder="CVV"
              className={`${s.TransactionForm__entry} `}
              {...register("cvv", {
                required: true,
              })}
            />
            {errors.cvv && <span>Fill the entry</span>}
          </div>
        </div>
        <button type="submit" className={s.TransactionForm__submit}>
          Pay
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;
