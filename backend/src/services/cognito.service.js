import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";

// Initialize Cognito client
const client = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION,
});

// User sign-up using email and password
export const signUp = async ({ email, password }) => {
  const command = new SignUpCommand({
    ClientId: process.env.COGNITO_CLIENT_ID,
    Username: email,
    Password: password,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
    ],
  });
  return await client.send(command);
};

// Confirm signup 
export const confirmUser = async ({ email, code }) => {
  const command = new ConfirmSignUpCommand({
    ClientId: process.env.COGNITO_CLIENT_ID,
    Username: email,
    ConfirmationCode: code,
  });
  return await client.send(command);
};

// Login(only email and pass)
export const login = async ({ email, password }) => {
  const command = new InitiateAuthCommand({
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: process.env.COGNITO_CLIENT_ID,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  });
  return await client.send(command);
};
