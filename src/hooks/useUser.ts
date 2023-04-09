import api from "@/services/api";
import { formatCurrency } from "@/utils/formatCurrency";
import { useQuery } from "@tanstack/react-query";

type User = {
  id: number;
  email: string;
  name: string;
  created_at: string;
  image: string;
  inative_at: string;
  updated_at: string;
  userBalance : string;
};

export async function getUser(): Promise<User> {
  const { data } = await api.get("/users");

  return {
    id: data?.id,
    name: data?.name,
    email: data?.email,
    image: data?.image,
    created_at: data?.created_at,
    inative_at: data?.inative_at,
    updated_at: data?.updated_at,
    userBalance: formatCurrency(data?.userBalance)
  };
}

export function useUser() {
  return useQuery(["users"], () => getUser());
}
