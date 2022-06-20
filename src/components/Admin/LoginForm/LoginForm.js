import { Form, Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import s from "./LoginForm.module.scss";
import { useForm } from "react-hook-form";
import axios from "axios";

function LoginForm({ setToken }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      const response = await axios.post("/users/login", {
        email,
        password,
      });
      setToken(response.data.user.token);
      axios.defaults.headers.common.Authorization = `Bearer ${response.data.user.token}`;
    } catch (error) {
      console.log("LOGIN CATCH", error);
    }

    reset();
  };
  return (
    <div className={s.LoginForm__container}>
      {" "}
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h2>Sign in</h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              {...register("email", {
                required: true,
              })}
            />
            {errors.email && <span>Fill the entry</span>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              {...register("password", {
                required: true,
              })}
            />{" "}
            {errors.password && <span>Fill the entry</span>}
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className={s.LoginForm__button}
          >
            Login
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default LoginForm;
