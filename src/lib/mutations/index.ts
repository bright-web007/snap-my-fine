import { gql } from '@apollo/client';

export const SEND_PAY_LATER_EMAIL = gql`
  mutation SendPayLaterEmail(
    $to: String!
    $subject: String!
    $body: String!
    $fineDetails: FineDetailsInput!
  ) {
    sendPayLaterEmail(
      input: {
        to: $to
        subject: $subject
        body: $body
        fineDetails: $fineDetails
      }
    ) {
      success
      message
    }
  }
`;

export type SendPayLaterEmailVariables = {
  to: string;
  subject: string;
  body: string;
  fineDetails: {
    council: string;
    pcnNumber: string;
    vehicleNumber: string;
    fineAmount: string;
  };
};

export type SendPayLaterEmailResponse = {
  sendPayLaterEmail: {
    success: boolean;
    message?: string;
  };
};