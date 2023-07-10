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

## Mutations

The following mutations are available for performing domain registration operations:

- `createDomain(input: DomainInput!)`: Domain: Creates a new domain with the provided registration details.
- `updateDomain(id: ID!, input: DomainInput!)`: Domain: Updates the details of an existing domain.
- `deleteDomain(id: ID!): Domain`: Deletes a domain by its ID.

## Data Types

The project uses the following data types:

- Domain: Represents a domain with properties such as ID, name, registrant information, expiration date, and DNS records.
- DomainInput: Input type for creating or updating a domain, including properties such as name, registrant information, expiration date, and DNS records.

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
