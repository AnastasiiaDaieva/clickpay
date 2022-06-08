import { Button, Form } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import s from "./TransactionForm.module.scss";
import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";

function TransactionForm() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const { date, description, priority, title, isDone = false } = data;
    // const convertedDate = new Date(date)
    //   .toISOString()
    //   .substring(0, 10)
    //   .split("-")
    //   .reverse()
    //   .join(".");
    // console.log(convertedDate);
    const task = {
      name: title,
      dueDate: date,
      description: description,
      priority: {
        value: priority.value,
        label: priority.label,
        number: priority.number,
      },
      isDone: isDone,
    };

    reset();
  };
  return (
    <div className={s.TransactionForm__container}>
      <Form onSubmit={handleSubmit(onSubmit)} className={s.TransactionForm}>
        <div className={s.TransactionForm__payment_info}>
          {" "}
          <Form.Group className="">
            <Form.Control
              type="text"
              name="tradeaccount"
              placeholder="your trade account"
              className={s.TransactionForm__entry}
              {...register("tradeaccount", {
                required: true,
              })}
            />{" "}
            {errors.tradeaccount && <span>Fill the entry</span>}
          </Form.Group>
          <Form.Group className={`${s.TransactionForm__group}`}>
            <Form.Control
              type="number"
              name="sum"
              placeholder="0 000 000,00"
              className={s.TransactionForm__entry}
              {...register("sum", {
                required: true,
              })}
            />
            {errors.sum && <span>Fill the entry</span>}
          </Form.Group>
        </div>
        <div className={s.TransactionForm__card_info}>
          {" "}
          <Form.Group className={`${s.TransactionForm__group}`}>
            <Form.Control
              type="number"
              name="cardnumber"
              placeholder="0000 0000 0000 0000"
              className={`${s.TransactionForm__entry} ${s.TransactionForm__number}`}
              {...register("cardnumber", {
                required: true,
              })}
            />
            {errors.cardnumber && <span>Fill the entry</span>}
          </Form.Group>{" "}
          <div className={s.TransactionForm__card_data}>
            {" "}
            <Form.Group className={`${s.TransactionForm__group}`}>
              <Form.Control
                type="text"
                name="name"
                placeholder="your name"
                className={`${s.TransactionForm__entry} ${s.TransactionForm__name}`}
                {...register("name", {
                  required: true,
                })}
              />
              {errors.name && <span>Fill the entry</span>}
            </Form.Group>{" "}
            <Form.Group className={`${s.TransactionForm__group}`}>
              <Form.Control
                type="number"
                name="expiration"
                placeholder="mm/yy"
                className={`${s.TransactionForm__entry} ${s.TransactionForm__expiration}`}
                {...register("expiration", {
                  required: true,
                })}
              />
              {errors.expiration && <span>Fill the entry</span>}
            </Form.Group>
          </div>
          <Form.Group className={`${s.TransactionForm__group}`}>
            <Form.Control
              type="number"
              name="cvv"
              placeholder="CVV"
              className={`${s.TransactionForm__entry} ${s.TransactionForm__cvv}`}
              {...register("cvv", {
                required: true,
              })}
            />
            {errors.cvv && <span>Fill the entry</span>}
          </Form.Group>
        </div>
        <Button variant="primary" type="submit">
          Pay
        </Button>
      </Form>
    </div>
  );
}

export default TransactionForm;
