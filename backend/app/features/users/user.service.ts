import { UserRole } from "@/app/types/auth.types";
import db from "@/db/db";
import { users } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { UserUpdateInput } from "./user.types";

const userColumns = {
  id: users.id,
  userName: users.userName,
  email: users.email,
  phoneNumber: users.phoneNumber,
  firstName: users.firstName,
  lastName: users.lastName,
  isActive: users.isActive,
  createdAt: users.createdAt,
  updatedAt: users.updatedAt,
};

export const getAllUsersService = async () => {
  const allUsers = await db.select(userColumns).from(users);

  return allUsers;
};

export const getUserByIdService = async (
  userId: number,
  userRole: UserRole,
  authenticatedUserId: number,
) => {
  if (userRole !== UserRole.Admin && authenticatedUserId !== userId) {
    throw new Error("FORBIDDEN");
  }

  const [user] = await db
    .select(userColumns)
    .from(users)
    .where(and(eq(users.id, userId), eq(users.isActive, true)));

  return user;
};

export const updateUserService = async (
  userId: number,
  data: UserUpdateInput,
  userRole: UserRole,
  authenticatedUserId: number,
) => {
  if (userRole !== UserRole.Admin && authenticatedUserId !== userId) {
    throw new Error("FORBIDDEN");
  }

  let dataToUpdate: UserUpdateInput = {};

  if (data.userName !== undefined) {
    dataToUpdate.userName = data.userName;
  }

  if (data.email !== undefined) {
    dataToUpdate.email = data.email;
  }

  if (data.phoneNumber !== undefined) {
    dataToUpdate.phoneNumber = data.phoneNumber;
  }

  if (data.firstName !== undefined) {
    dataToUpdate.firstName = data.firstName;
  }

  if (data.lastName !== undefined) {
    dataToUpdate.lastName = data.lastName;
  }

  if (Object.keys(dataToUpdate).length <= 0) {
    throw new Error("NOFIELDSTOUPDATE");
  }

  const [user] = await db
    .update(users)
    .set(dataToUpdate)
    .where(and(eq(users.id, userId), eq(users.isActive, true)))
    .returning(userColumns);

  return user;
};

export const deactivateUserService = async (userId: number) => {
  const [user] = await db
    .update(users)
    .set({
      isActive: false,
    })
    .where(and(eq(users.id, userId), eq(users.isActive, true)))
    .returning(userColumns);

  return user;
};
