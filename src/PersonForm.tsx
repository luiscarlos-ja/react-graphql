import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ALL_PERSONS } from "./graphql/queries.tsx";
import { CREATE_PERSON } from "./graphql/mutations.tsx";

export const PersonForm = (): JSX.Element => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");

  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
    // update: (store, response) => {
    //   const dataInStore = store.readQuery<AllPerson>({
    //     query: ALL_PERSONS,
    //   });
    //   if (dataInStore && response.data) {
    //     store.writeQuery({
    //       query: ALL_PERSONS,
    //       data: {
    //         ...dataInStore,
    //         allPersons: [...dataInStore.allPersons, response.data.addPerson],
    //       },
    //     });
    //   }
    // },
  });

  const handleSumbmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createPerson({ variables: { name, phone, street, city } });

    setName("");
    setPhone("");
    setStreet("");
    setCity("");
  };

  return (
    <div>
      <h2>Create new Person</h2>
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
        <div>
          <label htmlFor="street">Street: </label>
          <input
            name="street"
            placeholder="street"
            value={street}
            onChange={({ target }) => setStreet(target.value)}
          />
        </div>
        <div>
          <label htmlFor="city">City: </label>
          <input
            name="city"
            placeholder="city"
            value={city}
            onChange={({ target }) => setCity(target.value)}
          />
        </div>
        <button type="submit">Add!</button>
      </form>
    </div>
  );
};
