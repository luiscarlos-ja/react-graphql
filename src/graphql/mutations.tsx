import { gql } from "@apollo/client";
import { PERSON_ALL_DETAIL_FRAGMENT } from "./queries";

export const CREATE_PERSON = gql`
  mutation ($name: String!, $street: String!, $city: String!, $phone: String) {
    addPerson(name: $name, street: $street, city: $city, phone: $phone) {
      ...PersonDetails
    }
  }

  ${PERSON_ALL_DETAIL_FRAGMENT}
`;

export const EDIT_NUMBER = gql`
  mutation editNumber($name: String!, $phone: String!) {
    editNumber(name: $name, phone: $phone) {
      name
      phone
      address {
        street
        city
      }
      id
    }
  }
`;
