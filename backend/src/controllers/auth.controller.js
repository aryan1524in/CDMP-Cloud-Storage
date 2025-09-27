import { signUp, login, confirmUser } from "../services/cognito.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const handleSignUp = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const response = await signUp({ email, password });
  res.status(201).json({ message: "Signup successful", data: response });
});

export const handleConfirmSignup = asyncHandler(async (req, res) => {
  const { email, code } = req.body;
  await confirmUser({ email, code });
  res.status(200).json({ message: "User confirmed successfully" });
});

export const handleLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const response = await login({ email, password });

  if (!response.AuthenticationResult) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  res.status(200).json({
    message: "Login successful",
    accessToken: response.AuthenticationResult.AccessToken,
    idToken: response.AuthenticationResult.IdToken,
    refreshToken: response.AuthenticationResult.RefreshToken,
    expiresIn: response.AuthenticationResult.ExpiresIn,
    tokenType: response.AuthenticationResult.TokenType,
  });
});
