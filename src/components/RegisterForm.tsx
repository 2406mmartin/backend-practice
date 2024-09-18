import { createSignal } from "solid-js";
import Input from "./Input.tsx";
import Break from "./Break.tsx";
import Button from "./Button.tsx";

function RegisterForm() {
  const [usernameInput, setUsernameInput] = createSignal("");
  const [usernameValid, setUsernameValid] = createSignal(true);
  const [passwordInput, setPasswordInput] = createSignal("");
  const [passwordValid, setPasswordValid] = createSignal(true);
  const [confirmInput, setConfirmInput] = createSignal("");
  const [confirmValid, setConfirmValid] = createSignal(true);
  const [usernameWarning, setUsernameWarning] = createSignal("");
  const [passwordWarning, setPasswordWarning] = createSignal("");
  const [confirmWarning, setConfirmWarning] = createSignal("");

  const usernamePattern = /^(?!.*__)(?!.*_$)(?!^_)[a-zA-Z0-9_]{3,20}(?<!_)$/;

  const validateUsername = (username: string) => {
    setUsernameInput(username);
    if (!usernamePattern.test(username)) {
      setUsernameValid(false);
      setUsernameWarning(
        "Usernames must be 3-20 characters, no consecutive or leading/trailing underscores."
      );
    } else {
      setUsernameValid(true);
      setUsernameWarning("");
    }
  };

  const validatePassword = (password: string) => {
    setPasswordInput(password);
    if (password.length < 6 || password.length > 200) {
      setPasswordValid(false);
      setPasswordWarning("Passwords must be 6-200 characters long.");
    } else {
      setPasswordValid(true);
      setPasswordWarning("");
    }
    confirmPassword(confirmInput());
  };

  const confirmPassword = (confirmation: string) => {
    setConfirmInput(confirmation);
    if (passwordInput() != confirmation) {
      setConfirmValid(false);
      setConfirmWarning("Passwords don't match.");
    } else {
      setConfirmValid(false);
      setConfirmWarning("");
    }
  };

  return (
    <form action="./api/register" method="post">
      <Input
        title="Username"
        name="username"
        description="This will be your public display name."
        {...(!usernameValid() && { warning: usernameWarning() })}
        onBlur={(e: Event) => {
          const target = e.target as HTMLInputElement;
          validateUsername(target.value);
        }}
      ></Input>
      <Break size="sm"></Break>
      <Input
        title="Password"
        name="password"
        type="password"
        {...(!passwordValid() && { warning: passwordWarning() })}
        onBlur={(e: Event) => {
          const target = e.target as HTMLInputElement;
          validatePassword(target.value);
        }}
      ></Input>
      <Break size="sm"></Break>
      <Input
        title="Confirm Password"
        type="password"
        {...(!confirmValid() && { warning: confirmWarning() })}
        onBlur={(e: Event) => {
          const target = e.target as HTMLInputElement;
          confirmPassword(target.value);
        }}
      ></Input>
      <Break size="md"></Break>
      <Button title="Register" type="lgAccented"></Button>
    </form>
  );
}

export default RegisterForm;