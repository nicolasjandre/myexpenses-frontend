import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";

type Bank = {
  name: string;
  value: string;
}

type Data = {
    data: Bank[];
};

export async function getBanks(): Promise<any> {
    const { data }: Data = await api.get("/creditcard/banks");

    return data;
}

export function useBanks() {
    return useQuery(["banks"], () => getBanks());
}
