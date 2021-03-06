import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";

const LoginForm = ({ show, setError, setToken, setPage, fetchCurrentUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, { data }] = useMutation(LOGIN, {
    onError: (error) => {
      console.error("Error", error);
      setError(error.graphQLErrors[0].message);
    },
    onCompleted: () => {
      setUsername("");
      setPassword("");
      setPage("books");
    },
  });

  useEffect(() => {
    if (data) {
      const token = data.login.value;
      setToken(token);
      localStorage.setItem("user-token", token);
    }
  }, [data]); // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault();
    await login({ variables: { username, password } });
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
