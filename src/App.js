import logo from "./logo.svg";
import "./App.css";

import { Amplify, Auth, PubSub } from "aws-amplify";
import { AWSIoTProvider } from "@aws-amplify/pubsub";
import { customLogger } from "./utility/Logger";
const logger = customLogger("cognito");
logger.info("cognito");

try {
  Amplify.addPluggable(
    new AWSIoTProvider({
      aws_pubsub_region: process.env.AWS_PUBSUB_REGION,
      aws_pubsub_endpoint: process.env.AWS_PUBSUB_ENDPOINT,
    })
  );
  console.log("Amplify.addPluggable");
} catch (error) {
  console.log("error", error);
}

function App() {
  Auth.currentCredentials().then((credentials) => {
    const cognitoIdentityId = credentials.identityId;
    console.log("cognitoIdentityId", cognitoIdentityId);
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
