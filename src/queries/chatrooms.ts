import { gql, useQuery } from "@apollo/client";

export const LIST_CHATROOMS = gql`
  {
    chatrooms {
      id
      name
      members {
        id
      }
    }
  }
`;

export const useListChatroomsQuery = () => useQuery(LIST_CHATROOMS);
