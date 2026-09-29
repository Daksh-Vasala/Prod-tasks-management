import { strToMd5 } from "@/app/helpers/helpers";
import { UserRole } from "@/app/types/auth.types";
import db from "@/db/db";
import { users } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { RegisterInput, UpdateProfileInput } from "./auth.types";

export const loginService = async (email: string, password: string) => {
  const normalizedEmail = email.trim();

  const [user] = await db
    .select({
      id: users.id,
      email: users.email,
      password: users.password,
      userRole: users.userRole,
    })
    .from(users)
    .where(and(eq(users.email, normalizedEmail), eq(users.isActive, true)));
  if (!user) {
    throw new Error("INVALIDCREDENTIALS");
  }

  if (user.password !== strToMd5(password)) {
    throw new Error("INVALIDCREDENTIALS");
  }

  const tokenExpiry = 2 * 60 * 60;
  const payload = { userId: user.id, userRole: user.userRole };

  const jwtSecret = process.env.JWT_SECRET_KEY;

  if (!jwtSecret) {
    throw new Error("JWTSECRETERROR");
  }

  const token = jwt.sign(payload, jwtSecret, { expiresIn: tokenExpiry });
  return token;
};

export const registerService = async (
  userName: string,
  email: string,
  password: string,
  phoneNumber: string,
  userRole: UserRole,
  firstName?: string,
  lastName?: string,
) => {
  if (userRole === UserRole.Admin) {
    throw new Error("FORBIDDEN");
  }
  const normalizedEmail = email.trim();

  const [user] = await db
    .select({
      id: users.id,
      email: users.email,
      userRole: users.userRole,
    })
    .from(users)
    .where(eq(users.email, normalizedEmail));

  if (user) {
    throw new Error("ALREADYREGISTERED");
  }

  const hashedPassword = strToMd5(password);

  const dataToAdd: RegisterInput = {
    userName,
    email: normalizedEmail,
    password: hashedPassword,
    phoneNumber,
    userRole,
  };

  if (firstName && firstName.trim() !== "") {
    dataToAdd.firstName = firstName;
  }

  if (lastName && lastName.trim() !== "") {
    dataToAdd.lastName = lastName;
  }

  const [newUser] = await db.insert(users).values(dataToAdd).returning();

  return newUser;
};

export const getMeService = async (userId: number) => {
  const [user] = await db
    .select({
      id: users.id,
      userName: users.userName,
      email: users.email,
      userRole: users.userRole,
      phoneNumber: users.phoneNumber,
      firstName: users.firstName,
      lastName: users.lastName,
    })
    .from(users)
    .where(eq(users.id, userId));

  return user;
};

export const updateMeService = async (
  userId: number,
  userName: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
) => {
  const dataToUpdate: UpdateProfileInput = {};

  if (userName !== undefined) {
    dataToUpdate.userName = userName;
  }

  if (firstName !== undefined) {
    dataToUpdate.firstName = firstName;
  }

  if (lastName !== undefined) {
    dataToUpdate.lastName = lastName;
  }

  if (phoneNumber !== undefined) {
    dataToUpdate.phoneNumber = phoneNumber;
  }

  if (dataToUpdate === null || dataToUpdate === undefined) {
    throw new Error("No fields to update");
  }

  const [updatedUser] = await db
    .update(users)
    .set(dataToUpdate)
    .where(eq(users.id, userId))
    .returning();

  return updatedUser;
};

export const updatePasswordService = async (
  userId: number,
  password: string,
  changedPassword: string,
) => {
  const [user] = await db
    .select({
      userid: users.id,
      password: users.password,
    })
    .from(users)
    .where(eq(users.id, userId));

  if (!user) {
    throw new Error("USERNOTFOUND");
  }

  if (user.password !== strToMd5(password)) {
    throw new Error("PASSWORDSDONTMATCH");
  }

  await db
    .update(users)
    .set({ password: strToMd5(changedPassword) })
    .where(eq(users.id, userId));
};
