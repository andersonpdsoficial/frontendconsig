"use server";

import { signIn, signOut } from "@/lib/auth";

type LoginData = {
  username: string;
  password: string;
};

export const loginAction = async (data: LoginData) => {
  return signIn("credentials", { ...data, redirectTo: '/' });
};


export const logoutAction = async () => {
  await signOut({ redirectTo: '/login' })
}
