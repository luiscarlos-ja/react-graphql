import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "./graphql-queries";

type Props = {
  setToken: (token: string) => void;
};

const LoginForm = ({ setToken }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, { data, loading, error }] = useMutation(LOGIN_USER);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ variables: { username, password } });
  };

  useEffect(() => {
    if (data) {
      const { value: token } = data.login;
      setToken(token);
      localStorage.setItem("phonenumbers-user-token", token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (error) return <p>Error :(</p>;

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      )}
    </>
  );
};

export default LoginForm;
