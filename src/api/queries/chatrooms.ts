import { Chatroom } from "@interfaces";
import { gql, useMutation, useQuery } from "@apollo/client";

export const LIST_CHATROOMS = gql`
  query ListChatrooms {
    chatrooms {
      id
      name
      members {
        id
      }
    }
  }
`;

export interface ListChatroomsQueryResult {
  chatrooms: Chatroom[];
}

export const useListChatroomsQuery = () =>
  useQuery<ListChatroomsQueryResult>(LIST_CHATROOMS);

export const CREATE_CHATROOM = gql`
  mutation CreateChatroom($name: String!) {
    createChatroom(name: $name) {
      success
      chatroom {
        id
        name
      }
    }
  }
`;

export interface CreateChatroomMutationResult {
  createChatroom: {
    success: boolean;
    chatroom: Chatroom | null;
  };
}

export interface CreateChatroomMutationVariables {
  name: string;
}

export const useCreateChatroomMutation = () =>
  useMutation<CreateChatroomMutationResult, CreateChatroomMutationVariables>(
    CREATE_CHATROOM
  );
