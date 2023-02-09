import { Chatroom } from "@interfaces";
import { gql, QueryHookOptions, useMutation, useQuery } from "@apollo/client";

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

export const GET_CHATROOM = gql`
  query GetChatroom($id: ID!) {
    chatroom(id: $id) {
      id
      name
      members {
        id
        isHuman
      }
    }
  }
`;

export interface GetChatroomResult {
  chatroom: Chatroom | null;
}

export interface GetChatroomVariables {
  id: string;
}

export const useGetChatroomQuery = (
  id: string,
  opts?: QueryHookOptions<GetChatroomResult, GetChatroomVariables>
) =>
  useQuery<GetChatroomResult, GetChatroomVariables>(GET_CHATROOM, {
    variables: { id },
    ...opts
  });
