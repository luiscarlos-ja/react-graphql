import { useMutation } from "@apollo/client";
import { useState } from "react";
import { EDIT_NUMBER } from "./graphql/mutations";

export const PhoneForm = (): JSX.Element => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [changePhone] = useMutation(EDIT_NUMBER, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const handleSumbmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    changePhone({ variables: { name, phone } });
    setName("");
    setPhone("");
  };

  return (
    <div>
      <h2>Edit Phone Number</h2>
      <form onSubmit={handleSumbmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            name="name"
            placeholder="name"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone: </label>
          <input
            name="phone"
            placeholder="phone"
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <button type="submit">Edit!</button>
      </form>
    </div>
  );
};
