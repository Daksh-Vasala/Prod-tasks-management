import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/express.types";
import { JwtPayload, UserRole } from "../types/auth.types";

export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized, no token",
      });
    }

    const jwtSecret = process.env.JWT_SECRET_KEY;
    if (!jwtSecret) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }

    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    req.userId = decoded.userId;
    req.userRole = decoded.userRole;

    next();
  } catch (error) {
    if (
      error instanceof jwt.TokenExpiredError ||
      error instanceof jwt.JsonWebTokenError ||
      error instanceof jwt.NotBeforeError
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    console.log("Error in middleware: ", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const isAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Response | void => {
  try {
    if (req.userRole !== UserRole.Admin) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Admins only",
      });
    }

    next();
  } catch (error) {
    console.error("Error during admin role verification: ", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
