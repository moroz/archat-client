import { gql, useMutation } from "@apollo/client";

export const SEND_OFFER = gql`
  mutation SendOffer($chatroomId: ID!, $offer: String!) {
    sendOffer(chatroomID: $chatroomId, offer: $offer)
  }
`;

export interface SendOfferMutationVariables {
  chatroomId: string;
  offer: string;
}

export const useSendOfferMutation = () =>
  useMutation<SendOfferMutationVariables>(SEND_OFFER);
