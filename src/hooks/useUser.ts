import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";

type User = {
  id: number;
  email: string;
  name: string;
  created_at: string;
  avatar: string;
  inative_at: string;
  updated_at: string;
};

export async function getUser(): Promise<User> {
  const { data } = await api.get("/users");

  return {
    id: data?.id,
    name: data?.name,
    email: data?.email,
    avatar: data?.avatar,
    created_at: data?.created_at,
    inative_at: data?.inative_at,
    updated_at: data?.updated_at,
  };
}

export function useUser() {
  return useQuery(["users"], () => getUser());
}
