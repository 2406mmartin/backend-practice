import { createSignal } from "solid-js";
import Input from "./Input.tsx";
import Break from "./Break.tsx";
import Button from "./Button.tsx";

function RegisterForm() {
  const [usernameValid, setUsernameValid] = createSignal(true);
  const [passwordValid, setPasswordValid] = createSignal(true);
  const [usernameWarning, setUsernameWarning] = createSignal("");
  const [passwordWarning, setPasswordWarning] = createSignal("");
  
  const validateUsername = (username: string) => {
    console.log(username)
    if (username === "") {
      setUsernameValid(false);
      setUsernameWarning(
        "Username is required."
      );
    } else {
      setUsernameValid(true);
      setUsernameWarning("");
    }
  };

  const validatePassword = (password: string) => {
    if (password === "") {
      setPasswordValid(false);
      setPasswordWarning(
        "Password is required."
      );
    } else {
      setPasswordValid(true);
      setPasswordWarning("");
    }
  };

  async function submit(e: SubmitEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const response = await fetch("./api/login", {
      method: "POST",
      body: formData,
    });
    console.log("got here")
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    
  }

  return (
    <form onsubmit={submit}>
      <Input
        title="Username"
        name="username"
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
      <Break size="md"></Break>
      <Button title="Login" type="lgAccented"></Button>
    </form>
  );
}

export default RegisterForm;