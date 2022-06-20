import { useForm, Controller } from "react-hook-form";
import s from "./TransactionForm.module.scss";
import axios from "axios";
import transactionStatus from "data/constants/transactionStatus";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import Currency from "./Elements/Currency";
import FormText from "./Elements/FormText";
import InputMask from "react-input-mask";
import Loader from "components/Loader/Loader";

function TransactionForm({ setIsInProgress, setIsSuccessful }) {
  const { rejected, approved } = transactionStatus;

  const [isLoading, setIsLoading] = useState(false);
  const [currentValue, setCurrentValue] = useState("dollar");
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const sumRegEx = /^[0-9][0-9]*[.,]?[0-9]{0,2}$/;
  const onlyNumRegEx = new RegExp("^[0-9]+$");
  const nameRegEx = /^[a-z ,.'-]+$/i;

  const onSubmit = async (data) => {
    setIsLoading(true);
    const { tradeaccount, sum, cardnumber, name: holderName } = data;

    const operation = {
      account: tradeaccount,
      amount: sum,
      currency: currentValue,
      cardNumber: cardnumber.split(" ").join("").slice(0, 6),
      holderName: holderName,
    };
    const response = await axios
      .post("/transactions", operation)
      .catch((error) => console.log(error));

    let interval = setInterval(async () => {
      const getUpdate = await axios
        .get(`/transactions/${response.data._id}`)
        .catch((error) => console.log(error));

      if (getUpdate.data.status === approved) {
        clearInterval(interval);
        setIsSuccessful(true);
        setIsLoading(false);
        setIsInProgress(false);
      } else if (getUpdate.data.status === rejected) {
        clearInterval(interval);
        setIsSuccessful(false);
        setIsLoading(false);
        setIsInProgress(false);
      }
    }, 1000);

    reset();
  };
  return (
    <>
      {isLoading && <Loader />}
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
              <div className={`${s.TransactionForm__group}`}>
                <input
                  type="text"
                  name="tradeaccount"
                  placeholder="trading account"
                  className={s.TransactionForm__entry}
                  {...register("tradeaccount", {
                    required: true,
                    pattern: onlyNumRegEx,
                  })}
                />{" "}
                {errors.tradeaccount && (
                  <div className={s.TransactionForm__validation}>
                    Fill the entry with numbers only
                  </div>
                )}{" "}
              </div>
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
                    pattern: sumRegEx,
                  })}
                />{" "}
                {errors.sum && (
                  <div className={s.TransactionForm__validation}>
                    Letters are not allowed
                  </div>
                )}
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
                <Controller
                  control={control}
                  name="cardnumber"
                  render={({ field: { onChange, onBlur, ref } }) => (
                    <InputMask
                      mask="9999 9999 9999 9999"
                      onBlur={onBlur}
                      placeholder="0000 0000 0000 0000"
                      onChange={onChange}
                      inputRef={ref}
                      className={`${s.TransactionForm__entry} `}
                      {...register("cardnumber", {
                        required: true,
                      })}
                    />
                  )}
                />

                {errors.cardnumber && (
                  <div className={s.TransactionForm__validation}>
                    Fill the entry with 16 digits
                  </div>
                )}
              </div>{" "}
            </div>
            <div className={s.TransactionForm__card_data_wrapper}>
              {" "}
              <div
                className={`${s.TransactionForm__group} ${s.TransactionForm__name}`}
              >
                {" "}
                <input
                  type="text"
                  name="name"
                  placeholder="your name"
                  className={`${s.TransactionForm__entry} `}
                  {...register("name", {
                    required: true,
                    pattern: nameRegEx,
                  })}
                />
                {errors.name && (
                  <div className={s.TransactionForm__validation}>
                    Numbers are not allowed
                  </div>
                )}
              </div>{" "}
              <div
                className={`${s.TransactionForm__group} ${s.TransactionForm__expiration}`}
              >
                <Controller
                  control={control}
                  name="expiration"
                  render={({ field: { onChange, onBlur, ref } }) => (
                    <InputMask
                      mask="99/99"
                      onBlur={onBlur}
                      placeholder="mm/yy"
                      onChange={onChange}
                      inputRef={ref}
                      className={`${s.TransactionForm__entry} `}
                      {...register("expiration", {
                        required: true,
                        minLength: 5,
                        maxLength: 5,
                      })}
                    />
                  )}
                />{" "}
                {errors.expiration && (
                  <div className={s.TransactionForm__validation}>
                    Incorrect value
                  </div>
                )}
              </div>
            </div>
            <div className={s.TransactionForm__cvv_wrapper}>
              {" "}
              <div
                className={`${s.TransactionForm__group} ${s.TransactionForm__cvv}`}
              >
                <Controller
                  control={control}
                  name="cvv"
                  render={({ field: { onChange, onBlur, ref } }) => (
                    <InputMask
                      mask="999"
                      onBlur={onBlur}
                      placeholder="CVV"
                      onChange={onChange}
                      inputRef={ref}
                      className={`${s.TransactionForm__entry} `}
                      {...register("cvv", {
                        required: true,
                        pattern: onlyNumRegEx,
                        minLength: 3,
                        maxLength: 3,
                      })}
                    />
                  )}
                />

                {errors.cvv && (
                  <div className={s.TransactionForm__validation}>
                    Fill the entry with 3 digits
                  </div>
                )}
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
    </>
  );
}

export default TransactionForm;
