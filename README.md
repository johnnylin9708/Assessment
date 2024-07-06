## About

To create a login API with JWT token using Node.js, Express.js, and TypeScript, with either MongoDB as the database.

### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

- Node.js
- Express.js
- TypeScript
- Mongoose & MongoDB
- jsonwebtoken
- uuid

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.
FYI: Database is set up in the cloud. It can be use directly.

### Installation

#### running in localhost

1. Clone the repo
   ```sh
   git clone https://github.com/johnnylin9708/assessment.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run
   ```sh
   npm run dev
   ```

#### running in Docker

1. Clone the repo
   ```sh
   git clone https://github.com/johnnylin9708/assessment.git
   ```
2. Build Docker image
   ```sh
   docker build -t assessment .
   ```
3. Run
   ```sh
   docker run -p 3000:3000 assessment
   ```
4. Stop
   ```sh
   docker ps
   docker stop <container>
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>
