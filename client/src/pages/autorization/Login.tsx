import { FC, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import More from "./More";
import Input from "../../components/Input";
import Button from "../../components/Button";

import authStyles from "./authStyles.module.css";
import { loginAction } from "../../redux/auth/authSlice";
import { authState } from "../../types/authTypes";

const Login: FC = () => {
  const dispatch = useDispatch();
  // const email = useRef();
  // const password = useRef();
  const [state, setState] = useState<authState>({
    email: "",
    password: "",
  });
  const submit = async () => {
    dispatch(loginAction(state));
  };
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value } as Pick<
      authState,
      keyof authState
    >);
    return;
  };

  return (
    <div className={authStyles.login}>
      <div className={authStyles.names}>
        <h1>Login</h1>
      </div>
      <Input
        type="text"
        name="email"
        required={true}
        className={""}
        onChange={handleInput}
      />
      <Input
        type="password"
        name="password"
        required={true}
        className={""}
        onChange={handleInput}
      />
      <Button
        buttonName="Login"
        className={authStyles.button}
        onClick={submit}
      />
      <More auth="Sign Up" to="/register" about="Don't have an account?" />
    </div>
  );
};

export default Login;
