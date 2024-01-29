import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { PersonForm } from "./PersonForm";
import { FIND_PERSON } from "./graphql/queries";
import { PhoneForm } from "./PhoneForm";

type Props = {
  persons: Person[] | undefined;
};

export const Persons = ({ persons }: Props): JSX.Element => {
  const [getPerson, result] = useLazyQuery(FIND_PERSON);
  const [person, setPerson] = useState<Person | null>(null);

  const showPerson = (name: string) => {
    getPerson({ variables: { nameToSearch: name } });
  };

  useEffect(() => {
    if (result.data) {
      setPerson(result.data.findPerson);
    }
  }, [result]);

  if (person) {
    return (
      <div className="card">
        <h2>Person</h2>
        <p>Name: {person.name}</p>
        <p>Phone: {person.phone}</p>
        <p>Street: {person.address.street}</p>
        <p>City: {person.address.city}</p>
        <button onClick={() => setPerson(null)}>close</button>
      </div>
    );
  }

  if (!persons) {
    return <p>No persons</p>;
  }
  if (persons.length === 0) {
    return <p>No persons</p>;
  }

  return (
    <>
      <PersonForm />
      <PhoneForm />
      <h2>Persons</h2>
      {persons.map((person) => (
        <div
          className="card"
          key={person.id}
          onClick={() => {
            showPerson(person.name);
          }}
        >
          <h2>{person.name}</h2>
          <p>Phone: {person.phone}</p>
          <p>Street: {person.address.street}</p>
          <p>City: {person.address.city}</p>
        </div>
      ))}
    </>
  );
};
