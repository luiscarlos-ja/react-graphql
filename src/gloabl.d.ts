type Person = {
  id: string;
  name: string;
  phone: string;
  address: {
    street: string;
    city: string;
  };
};

type AllPerson = {
  allPersons: Person[];
};
