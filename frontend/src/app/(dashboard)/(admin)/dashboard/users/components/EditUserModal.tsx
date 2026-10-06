"use client";
import { UpdateUserInput, User } from "@/features/users/types/users.types";
import { PencilLine, X } from "lucide-react";
import { useEffect, useState } from "react";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onEdit: (data: UpdateUserInput) => void;
}

export default function EditUserModal({
  isOpen,
  onClose,
  user,
  onEdit,
}: EditUserModalProps) {
  const [userName, setUserName] = useState(user.userName);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [firstName, setFirstName] = useState(user.firstName ?? "");
  const [lastName, setLastName] = useState(user.lastName ?? "");

  const handleEdit = async () => {
    onEdit({
      userName,
      email,
      phoneNumber,
      firstName: firstName.trim() || null,
      lastName: lastName.trim() || null,
    });
  };

  useEffect(() => {
    setUserName(user.userName);
    setEmail(user.email);
    setPhoneNumber(user.phoneNumber);
    setFirstName(user.firstName ?? "");
    setLastName(user.lastName ?? "");
  }, [user]);

  if (!isOpen) return null;

  return (
    <div
      className="bg-black/40 fixed inset-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-lg  p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full border-b border-zinc-200 pb-3">
          <div className="text-blue-600 bg-blue-100/50 rounded-lg px-3 py-3">
            <PencilLine />
          </div>
          <div className="w-full text-left ml-4">
            <h3 className="text-xl font-semibold">Edit user</h3>
            <p className="text-zinc-500">Update profile</p>
          </div>
          <div>
            <button
              className="hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 cursor-pointer transition-all rounded-lg px-2 py-2"
              onClick={onClose}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="bg-gray-100/50 items-center rounded-lg p-3 flex mt-5">
          <div className="border border-zinc-400 bg-white p-1.5 text-center rounded-full w-8 h-8">
            {user.userName[0]}
          </div>
          <div className="w-full text-left flex flex-col ml-2">
            <h4 className="font-semibold">{user.userName}</h4>
            <h5 className="text-zinc-500">User Id: {user.id}</h5>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-5">
          <div className="flex gap-2 items-center justify-between">
            <label htmlFor="username" className="text-left text-md ">
              Username:{" "}
            </label>
            <input
              type="text"
              id="username"
              title="username"
              className="border border-zinc-300 px-3 py-1 rounded-lg w-full outline-zinc-800/50 transition max-w-sm"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="flex gap-2 items-center justify-between">
            <label htmlFor="email" className="text-left text-md ">
              Email:{" "}
            </label>
            <input
              type="email"
              id="email"
              title="email"
              className="border border-zinc-300 px-3 py-1 rounded-lg w-full outline-zinc-800/50 transition max-w-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex gap-2 items-center justify-between">
            <label htmlFor="phoneNumber" className="text-left text-md ">
              Phone no.:{" "}
            </label>
            <input
              type="text"
              id="phoneNumber"
              title="phoneNumber"
              className="border border-zinc-300 px-3 py-1 rounded-lg w-full outline-zinc-800/50 transition max-w-sm"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="flex gap-2 items-center justify-between">
            <label htmlFor="firstName" className="text-left text-md ">
              First name:{" "}
            </label>
            <input
              type="text"
              id="firstName"
              title="firstName"
              className="border border-zinc-300 px-3 py-1 rounded-lg w-full outline-zinc-800/50 transition max-w-sm"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="flex gap-2 items-center justify-between">
            <label htmlFor="lastName" className="text-left text-md ">
              Last name:{" "}
            </label>
            <input
              type="text"
              id="lastName"
              title="lastName"
              className="border border-zinc-300 px-3 py-1 rounded-lg w-full outline-zinc-800/50 transition max-w-sm"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end border-t border-zinc-200 mt-4 gap-2 py-4">
          <button
            className=" border border-zinc-300 rounded-lg px-3 py-2 cursor-pointer text-zinc-500 hover:text-white transition hover:bg-zinc-400 active:bg-zinc-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="text-white bg-blue-600 px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-500 transition-all active:bg-blue-600"
            onClick={handleEdit}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
