import "./App.css";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import { Persons } from "./Persons.tsx";
import { ALL_PERSONS } from "./graphql/queries.tsx";
import { PERSON_ADDED } from "./graphql/graphql-subscriptions.tsx";
import { useState } from "react";
import LoginForm from "./login/LoginForm.tsx";

function App() {
  const client = useApolloClient();
  const { loading, error, data } = useQuery<AllPerson>(ALL_PERSONS);

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("phonenumbers-user-token")
  );

  // Suscription Code
  const { data: dataSubscription, loading: loadingSubscription } =
    useSubscription<Person>(PERSON_ADDED);
  console.log(dataSubscription, loadingSubscription);
  // End Suscription Code

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (error) return <p>Error :(</p>;
  return (
    <>
      <h1>GraphQL + React</h1>
      {token ? (
        <>
          <button onClick={logout}>Cerrar Sesión</button>
          {loading ? <p>Loading...</p> : <Persons persons={data?.allPersons} />}
        </>
      ) : (
        <LoginForm setToken={setToken} />
      )}
    </>
  );
}

export default App;
