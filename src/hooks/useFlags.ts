import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";

type Flag = {
  name: string;
  value: string;
}

type Data = {
    data: Flag[];
};

export async function getFlags(): Promise<any> {
    const { data }: Data = await api.get("/creditcard/flags");

    return data;
}

export function useFlags() {
    return useQuery(["flags"], () => getFlags());
}
