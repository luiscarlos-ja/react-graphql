import { gql } from "@apollo/client";
import { PERSON_ALL_DETAIL_FRAGMENT } from "./queries";

export const PERSON_ADDED = gql`
  subscription {
    personAdded {
      ...PersonDetails
    }
  }

  ${PERSON_ALL_DETAIL_FRAGMENT}
`;
