### README
Author: Duy Linh Nguyen
Date: 8th June 2025

Welcome to my codetest, it is a NodeJS express server. 
Datastore: MongoDB (NoSQL).
Software Pattern is Controller-Service-Repository (CSR).

Please explore my attempt, and feedback is very welcome! The tests are a mix unit tests and integrations tests. To get all tests to pass, please follow the `Setup Local Unit/Integration Tests`. 

### Pre-requisites

- `node: v22.14.0`
- `Docker version 28.0.0, build f9ced58158`
- `npm 10.9.2`

### Setup Local Unit/Integration test

1. Setup pre-requisites
2. Initialise Docker Desktop
3. `npm run docker:setup` -> this script will init a docker container on host port and container port 27018, Test Suites will connect to `mongodb://localhost:27018` which contains an image of MongoDB. 
4. Verify image `mongo-local` is running in the background by finding the container `docker ps`
5. If there are issues, try removing the image and re-creating it. Refer to package.json scripts for examples
6. `npm run tests`


### Rationale
My rationale for my approach as follows

#### Seperation of Concerns of Connection Management, and the Database Client

Pros

`IDatabaseConnection` and `IDatabaseClient` have seperate, single responsibilities. Respectively, to manage the global connection and exposes the operations of the AccountBalances Model. 
- components are de-coupled, the lifecycle of the connection is not tied to the DatabaseClient.
- mocking the connection is easier as demonstrated in the test suites
- Each repository, is injected with a DatabaseClient that looks after a Model. This opens extension of the Client for other future models

Cons

- Because the connection is managed elsewhere, it can be tricky if the connection is not properly instantiated.
- If the application requires multi-tiered and shards of databases, managing this could be tricky

#### CSR Pattern

Pros
- Each layer has its own concerns. The controller interfaces with clients, services handle the business logic and calculation that may be required, and repository interfaces with the datastore. 
- Each layer santises the raw data from the data store, if the data store contained sensitive or irrelevant information that the client is requesting. Each layer forms the data payload response until it reaches the client
- The layers are decoupled, as each layer is only concerned about its internal contract between other internal layers. Changes in one layer does not ripple through to all layers and be caught in compile time

Cons
- If the application was for a different use-case not CRUD (Create Read Update and Delete), other patterns would be suited for it. For example, if it was an event bus that recieve messages from a subscribed topic in a Pub/Sub architecture. Would other patterns such as Observer be more appropriate. Examples could be, IoT Type Applications with Real-Time Data from sensors
- Can increase in complexity to maintain, with more layers as the application grows if requirements and the domain grows.
- 'Can' be tightly coupled to the type of database chosen (I think my case it may be)



### Future Improvements
Given the time constraints, and I felt improvements could've kept me working on this for a while. Here some thoughts on future improvements

1. Seperate Testing between unit and integration
2. Configuration Injection with different .env.<test/staging/production>
3. A module for Dependency Injection to inforce singleton/transients pattern depending on the dependency. Such as the mongoDB connection
   1. This would open deployments of different stages of with different versions of the datastore for `<test, staging, production>`
   2. Dependency Injection is bare bones, occurs in setup of routes, and on server init for connections.
4. Increased test coverage accounting for edge cases pertaining to balance calculation
5. Schema for CSV to ensure to, from do not get mixed between recipient and sender (my tests caught this last minute!!!)
6. Seperate 'processing' of transactions into a different service, load csv data into datastore for record keeping
7. Appropriate Middleware for handing logging, and santising http responses
   