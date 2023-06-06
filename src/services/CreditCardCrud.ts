import { extractNumberFromString } from "@/utils/extractNumberFromString";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import api from "./api";

interface CreateCreditCardData {
  id?: number;
  name: string;
  creditLimit: any;
  flag: string;
  bank: string;
  closingDay: number | string;
  dueDay: number | string;
}

interface CreateCreditCardData {
  id?: number;
  name: string;
  creditLimit: any;
  flag: string;
  bank: string;
  closingDay: number | string;
  dueDay: number | string;
  actionType: string | null;
}

type CreditCard = {
  id: number;
  name: string;
  creditLimit: any;
  availableLimit: number;
  closingDay: number;
  dueDay: number;
  flag: string;
  bank: string;
  inative_at: Date | null;
  actionType: string | null;
};

const CreditCardCrud = () => {
  const queryClient = useQueryClient();

  const createCreditCardMutation = useMutation(
    async (data: CreateCreditCardData | CreditCard) => {
      const response = await api.post("/creditcard", {
        name: data?.name,
        creditLimit: extractNumberFromString(data?.creditLimit),
        flag: data?.flag,
        bank: data?.bank,
        closingDay: data?.closingDay,
        dueDay: data?.dueDay,
      });

      return response.data;
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["creditCards"]);
        toast.success("Cartão cadastrado com sucesso");
      },
    }
  );

  const editCreditCardMutation = useMutation(
    async (data: CreateCreditCardData | CreditCard) => {
      const response = await api.put(`/creditcard/${data?.id}`, {
        name: data?.name,
        creditLimit: extractNumberFromString(data?.creditLimit),
        flag: data?.flag,
        bank: data?.bank,
        closingDay: data?.closingDay,
        dueDay: data?.dueDay,
      });

      return response.data;
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["creditCards"]);
        toast.success("Cartão editado com sucesso");
      },
    }
  );

  const deleteCreditCardMutation = useMutation(
    async (creditCardBeingEdited: CreditCard | CreateCreditCardData) => {
      const response = await api.delete(`/creditcard/${creditCardBeingEdited?.id}`);

      return response.data;
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["creditCards"]);
        toast.success("Cartão deletado com sucesso");
      },
    }
  );

  return {
    createCreditCard: createCreditCardMutation,
    editCreditCard: editCreditCardMutation,
    deleteCreditCard: deleteCreditCardMutation,
  };
};

export default CreditCardCrud;