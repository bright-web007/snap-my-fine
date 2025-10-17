import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
//if sentry is not installed in project, then dont add it to the code.

const getHeraclesUrl = () => {
  const url =
    process.env.HERACLES_GRAPHQL_ENDPOINT ||
    process.env.NEXT_PUBLIC_HERACLES_URL!;
  if (!url) {
    throw new Error(
      "HERACLES_GRAPHQL_ENDPOINT or NEXT_PUBLIC_HERACLES_URL environment variable is required",
    );
  }
  new URL(url);
  return url;
};

const errorLink = onError(({ graphQLErrors, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      const error = new Error(`GraphQL error: ${message}`);
      error.name = "GraphQLRequestError";

      // // Enhance error with metadata for Sentry
      // Sentry.withScope((scope) => {
      //   scope.setTags({
      //     errorType: 'graphql',
      //     operationName: operation.operationName,
      //   });

      //   scope.setExtras({
      //     message,
      //     locations,
      //     path,
      //     extensions,
      //     variables: operation.variables,
      //   });

      //   Sentry.captureException(error);
      // });
    });
  }
});

// Create Apollo client for server-side usage (no auth required)
export const createApolloClient = () => {
  return new ApolloClient({
    link: from([
      errorLink,
      createHttpLink({
        uri: getHeraclesUrl(),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    ]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        errorPolicy: "all",
      },
      query: {
        errorPolicy: "all",
      },
      mutate: {
        errorPolicy: "all",
      },
    },
  });
};

export const apolloHeraclesClient =
  typeof window !== "undefined"
    ? new ApolloClient({
        link: from([
          errorLink,
          createHttpLink({
            uri: getHeraclesUrl(),
          }),
        ]),
        cache: new InMemoryCache(),
        defaultOptions: {
          watchQuery: {
            errorPolicy: "all",
          },
          query: {
            errorPolicy: "all",
          },
          mutate: {
            errorPolicy: "all",
          },
        },
      })
    : null;
