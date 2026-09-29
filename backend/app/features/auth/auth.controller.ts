import { verifyEmailFormat } from "@/app/helpers/helpers";
import { AuthRequest } from "@/app/types/express.types";
import { Response } from "express";
import {
  getMeService,
  loginService,
  registerService,
  updateMeService,
  updatePasswordService,
} from "./auth.service";
import { UserRole } from "@/app/types/auth.types";

export const login = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      email.trim() === "" ||
      password === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Both fields are required",
      });
    }

    const normalizedEmail = email.trim();

    if (!verifyEmailFormat(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Email is invalid",
      });
    }

    const token = await loginService(normalizedEmail, password);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.error("Error in logging in: ", error);

    if (error instanceof Error && error.message === "INVALIDCREDENTIALS") {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const register = async (req: AuthRequest, res: Response) => {
  try {
    const {
      userName,
      email,
      password,
      phoneNumber,
      userRole = UserRole.Subscriber,
      firstName,
      lastName,
    } = req.body;

    if (!userName || !email || !password || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!verifyEmailFormat(email)) {
      return res.status(400).json({
        success: false,
        message: "Email is invalid",
      });
    }

    const insertedUser = await registerService(
      userName,
      email,
      password,
      phoneNumber,
      userRole,
      firstName,
      lastName,
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: insertedUser,
    });
  } catch (error) {
    console.log("Error in registering user: ", error);

    if (error instanceof Error && error.message === "ALREADYREGISTERED") {
      return res.status(409).json({
        success: false,
        message: "User is already registered",
      });
    }

    if (error instanceof Error && error.message === "FORBIDDEN") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You can't create admin role",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    if (
      typeof userId !== "number" ||
      !Number.isInteger(userId) ||
      userId <= 0
    ) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await getMeService(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Fetched user's details successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error in getting user's info: ", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateMe = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    if (
      typeof userId !== "number" ||
      !Number.isInteger(userId) ||
      userId <= 0
    ) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { userName, firstName, lastName, phoneNumber } = req.body;

    const user = await updateMeService(
      userId,
      userName,
      firstName,
      lastName,
      phoneNumber,
    );

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Fail to update user",
      });
    }
  } catch (error) {
    console.log("Error in updating user: ", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updatePassword = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    if (
      typeof userId !== "number" ||
      !Number.isInteger(userId) ||
      userId <= 0
    ) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { password, changedPassword } = req.body ?? {};

    if (
      typeof password !== "string" ||
      typeof changedPassword !== "string" ||
      password.trim() === "" ||
      changedPassword.trim() === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Both fields are required",
      });
    }

    await updatePasswordService(userId, password, changedPassword);

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Error in changing passowrd: ", error);

    if (error instanceof Error && error.message === "PASSWORDSDONTMATCH") {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    if (error instanceof Error && error.message === "USERNOTFOUND") {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
