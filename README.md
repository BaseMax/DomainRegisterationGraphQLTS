# Domain Registeration GraphQL TS

DomainRegistrationGraphQLTS is a TypeScript-based project that implements a GraphQL API for managing domain registration. It provides a set of queries and mutations to perform various operations related to domain registration, including creating new domains, retrieving domain information, updating domain details, and deleting domains.

## Features

- Create a new domain with registration details.
- Retrieve domain information by ID or domain name.
- Update domain details such as registrant information, expiration date, and DNS records.
- Delete a domain by ID.

## Routes

The project exposes a single GraphQL endpoint for accessing the domain registration functionality.

**Endpoint: /graphql**

## Queries

The following queries are available for retrieving domain information:

- `domain(id: ID!)`: Domain: Retrieves a domain by its unique ID.
- `domains: [Domain]`: Retrieves a list of all registered domains.
- `searchDomains(keyword: String!): [Domain]`: Searches for domains using a keyword.
- `checkAvailability(domainName: String!): Boolean`: Checks the availability of a domain name.
- `myDomains: [Domain]`: Retrieves a list of domains registered by the authenticated user.

## Mutations

The following mutations are available for performing domain registration operations:

- `register(username: String!, password: String!): User`: Registers a new user with the provided username and password.
- `login(username: String!, password: String!): Token`: Authenticates a user and returns an access token.
- `registerDomain(input: DomainInput!): Domain`: Registers a new domain with the provided details.
- `updateDomain(id: ID!, input: DomainInput!): Domain`: Updates the details of an existing domain.
- `updateDomainDNS(id: ID!, dns: [String]!): Domain`: Updates the DNS/nameserver of a domain.
- `deleteDomain(id: ID!): Domain`: Deletes a domain by its ID.
- `transferDomain(id: ID!, recipientUsername: String!): Domain`: Transfers a domain from the authenticated user's account to another user's account.

## GraphQL Examples

### domain(id: ID!): Domain

```graphql
query {
  domain(id: "123456") {
    id
    name
    registrant {
      name
      email
    }
    expirationDate
    dnsRecords
  }
}
```

### domains: [Domain]

```graphql
query {
  domains {
    id
    name
    registrant {
      name
      email
    }
    expirationDate
    dnsRecords
  }
}
```

### searchDomains(keyword: String!): [Domain]

```graphql
query {
  searchDomains(keyword: "example") {
    id
    name
    registrant {
      name
      email
    }
    expirationDate
    dnsRecords
  }
}
```

### checkAvailability(domainName: String!): Boolean

```graphql
query {
  checkAvailability(domainName: "example.com")
}
```

### myDomains: [Domain]

```graphql
query {
  myDomains {
    id
    name
    registrant {
      name
      email
    }
    expirationDate
    dnsRecords
  }
}
```

### register(username: String!, password: String!): User

```graphql
mutation {
  register(username: "example_user", password: "password") {
    id
    username
  }
}
```

### login(username: String!, password: String!): Token

```graphql
mutation {
  login(username: "example_user", password: "password") {
    accessToken
  }
}
```

### registerDomain(input: DomainInput!): Domain

```graphql
mutation {
  registerDomain(input: {
    name: "example.com",
    userId: 1,
    expirationDate: "2024-07-10",
    dnsRecords: ["ns1.example.com", "ns2.example.com"]
  }) {
    id
    name
    registrant {
      name
      email
    }
    expirationDate
    dnsRecords
  }
}
```

### updateDomain(id: ID!, input: DomainInput!): Domain

```graphql
mutation {
  updateDomain(id: "123456", input: {
    userId: 1,
    expirationDate: "2025-07-10",
    dnsRecords: ["ns1.updated-example.com", "ns2.updated-example.com"]
  }) {
    id
    name
    registrant {
      name
      email
    }
    expirationDate
    dnsRecords
  }
}
```

### updateDomainDNS(id: ID!, dns: [String]!): Domain

```graphql
mutation {
  updateDomainDNS(id: "123456", dns: ["ns1.example.com", "ns2.example.com", "ns3.example.com"]) {
    id
    name
    registrant {
      name
      email
    }
    expirationDate
    dnsRecords
  }
}
```

### deleteDomain(id: ID!): Domain

```graphql
mutation {
  deleteDomain(id: "123456") {
    id
    name
    registrant {
      name
      email
    }
    expirationDate
    dnsRecords
  }
}
```

### transferDomain(id: ID!, recipientUsername: String!): Domain

```graphql
mutation {
  transferDomain(id: "123456", recipientUsername: "new_user") {
    id
    name
    registrant {
      name
      email
    }
    expirationDate
    dnsRecords
  }
}
```

## Data Types

The project uses the following data types:

- `User`: Represents a user with properties such as ID and username.
- `Token`: Represents an authentication token.
- `Domain`: Represents a domain with properties such as ID, name, registrant information, expiration date, and DNS records.
- `DomainInput`: Input type for creating or updating a domain, including properties such as name, registrant information, expiration date, and DNS records.

## Getting Started

To run the DomainRegistrationGraphQLTS project locally, follow these steps:

- Clone the repository: `git clone https://github.com/basemax/DomainRegisterationGraphQLTS.git`
- Navigate to the project directory: `cd DomainRegisterationGraphQLTS`
- Install the dependencies: `npm install`
- Build the project: `npm run build`
- Start the server: `npm start`
- Once the server is running, you can access the GraphQL API at `http://localhost:3000/graphql`.

## Dependencies

The project relies on the following dependencies:

- `express`: Web framework for Node.js.
- `graphql`: GraphQL implementation for JavaScript.
- `graphql-tools`: Tools for building and manipulating GraphQL schemas.
- `apollo-server-express`: Integration of Apollo Server with Express.
- `typescript`: TypeScript compiler and language tools.

Please ensure that these dependencies are installed before running the project.

## License

This project is licensed under the MIT License. Feel free to use and modify the code as per your requirements.

## Contributions

Contributions to the DomainRegistrationGraphQLTS project are welcome. If you find any issues or have suggestions for improvement,

Copyright 2023, Max Base
