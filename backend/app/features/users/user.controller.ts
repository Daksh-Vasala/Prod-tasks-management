import { UserRole } from "@/app/types/auth.types";
import { AuthRequest } from "@/app/types/express.types";
import { Response } from "express";
import {
  deactivateUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
} from "./user.service";

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await getAllUsersService();

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.log("Error in fetching all users: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getUserById = async (req: AuthRequest, res: Response) => {
  try {
    const userIdParams = req.params.id;
    const userId = Number(userIdParams);

    if (!Number.isInteger(userId) || userId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid user id",
      });
    }

    const user = await getUserByIdService(
      userId,
      req.userRole as UserRole,
      req.userId as number,
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    console.log("Error in fetching user: ", error);
    if (error instanceof Error && error.message === "FORBIDDEN") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Admins only",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const userIdParams = req.params.id;
    const userId = Number(userIdParams);

    if (!Number.isInteger(userId) || userId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid user id",
      });
    }

    const updatedUser = await updateUserService(
      userId,
      req.body,
      req.userRole as UserRole,
      req.userId as number,
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log("Error in updating user: ", error);
    if (error instanceof Error && error.message === "FORBIDDEN") {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    if (error instanceof Error && error.message === "NOFIELDSTOUPDATE") {
      return res.status(400).json({
        success: false,
        message: "No fields to update",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deactivateUser = async (req: AuthRequest, res: Response) => {
  try {
    const userIdParams = req.params.id;
    const userId = Number(userIdParams);

    if (!Number.isInteger(userId) || userId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid user id",
      });
    }

    const deactivatedUser = await deactivateUserService(userId);

    if (!deactivatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deactivated successfully",
      data: deactivatedUser,
    });
  } catch (error) {
    console.log("Error in deactivating user: ", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
