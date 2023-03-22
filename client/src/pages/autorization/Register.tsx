import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import More from "./More";
import Input from "../../components/Input";
import Button from "../../components/Button";

import authStyles from "./authStyles.module.css";
import { authState } from "../../types/authTypes";
import { signUp } from "../../services/authService";

const Register: FC = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<authState>({
    name: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    const response = await signUp(state);
    if (response.status === 201 && response.ok) {
      navigate("/login");
      return;
    }
  };
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, [e.target.name]: e.target.value } as Pick<
      authState,
      keyof authState
    >);
  };
  return (
    <div className={authStyles.register}>
      <div className={authStyles.names}>
        <h1>Register</h1>
      </div>
      <Input type="text" name="name" required={true} onChange={handleInput} />
      <Input type="text" name="email" required={true} onChange={handleInput} />
      <Input
        type="password"
        name="password"
        required={true}
        onChange={handleInput}
      />
      <Button
        buttonName="REGISTER"
        className={authStyles.button}
        onClick={submit}
      />
      <More to="/login" auth="Log in" about="Already have an account?" />
    </div>
  );
};

export default Register;
