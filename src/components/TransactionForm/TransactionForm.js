import { useForm } from "react-hook-form";
import s from "./TransactionForm.module.scss";
import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import Currency from "./Elements/Currency";
import FormText from "./Elements/FormText";

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
    // console.log(data);
    const { tradeaccount, sum, cardnumber, name: holderName } = data;

    const operation = {
      tradeaccount: tradeaccount,
      sum: sum,
      currency: currentValue,
      cardnumber: cardnumber.slice(0, 6),
      holderName: holderName,
    };
    console.log(operation);
    setIsInProgress(false);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.TransactionForm}>
      <div className={s.TransactionForm__wrapper}>
        {" "}
        <FormText
          headingFirstPart="Lorem "
          headingSecondPart="sit amet consectetur"
          coloredHeading="ipsum dolor"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia fuga id
        libero provident et inventore. Harum voluptatem modi labore at. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Officia fuga id
        libero provident et inventore. Harum voluptatem modi labore at."
        />
        <div className={s.TransactionForm__payment_info}>
          <div className={s.TransactionForm__payment_account}>
            <input
              type="text"
              name="tradeaccount"
              placeholder="trading account"
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
            <Currency
              currentValue={currentValue}
              setCurrentValue={setCurrentValue}
            />
          </div>
        </div>
      </div>
      <div className={s.TransactionForm__wrapper}>
        <div className={s.TransactionForm__card}>
          <div className={s.TransactionForm__cardnumber_wrapper}>
            {" "}
            <div
              className={`${s.TransactionForm__group} ${s.TransactionForm__cardnumber}`}
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
          </div>
          <div className={s.TransactionForm__card_data_wrapper}>
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
          <div className={s.TransactionForm__cvv_wrapper}>
            {" "}
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
        </div>
        <div className={s.TransactionForm__button}>
          {" "}
          <button type="submit" className={s.TransactionForm__submit}>
            Pay
          </button>
        </div>
      </div>
    </form>
  );
}

export default TransactionForm;
