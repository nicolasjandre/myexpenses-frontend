import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";

type CostCenter = {
  id: number;
  description: string;
  notes: string;
  inative_at: Date | null;
};

type Data = {
   data: CostCenter[];
}

export async function getCostCenters(): Promise<any> {
  const { data }: Data = await api.get("/costcenters/all");

  return data;
}

export function useCostCenters() {
  return useQuery(["costCenters"], () => getCostCenters());
}
