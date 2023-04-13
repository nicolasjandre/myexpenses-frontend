import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";

type CreditCard = {
  id: number;
  name: string;
  creditLimit: number;
  availableLimit: number;
  closingDay: number;
  dueDay: number;
  flag: string;
  bank: string;
  inative_at: Date | null;
};

type Data = {
   data: CreditCard[];
}

export async function getCreditCards(): Promise<any> {
  const { data }: Data = await api.get("creditcard/all");

  return data;
}

export function useCreditCards() {
  return useQuery(["creditCards"], () => getCreditCards());
}
