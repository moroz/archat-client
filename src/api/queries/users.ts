import { gql, useQuery } from "@apollo/client";
import { User } from "@interfaces";

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      email
      displayName
      isHuman
    }
  }
`;

export interface CurrentUserQueryResult {
  currentUser: User | null;
}

export const useAuth = () => {
  const { data, loading } = useQuery<CurrentUserQueryResult>(CURRENT_USER);
  const user = data?.currentUser;

  return {
    user,
    loading
  };
};
