export interface User {
  __typename: "User";
  id: string;
  displayName: string;
  isHuman: boolean;
  email: string | null;
}
