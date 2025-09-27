import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.decode(token, { complete: true });

    if (!decoded || !decoded.payload.sub) {
      return res.status(403).json({ message: "Invalid token structure" });
    }

    req.user = {
      email: decoded.payload.email,
      sub: decoded.payload.sub,
    };

    next();
  } catch (err) {
    console.error("JWT decode error:", err);
    return res.status(403).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
