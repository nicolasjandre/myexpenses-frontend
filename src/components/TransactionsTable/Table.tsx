import { useCashFlow } from "@/hooks/useCashFlow";
import { Tr } from "./Tr";

export function Table() {
    const { data: cashFlow } = useCashFlow();

    return (
        <table className="d-flex w-full max-w-5xl rounded-xl border-black_bg-100 bg-black_bg-100 dark:border-black_bg-100 dark:bg-black_bg-100">
            <thead className="h-14">
                <tr className="text-center text-white">
                    <th scope="col">Tipo</th>
                    <th scope="col">Data</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Conta</th>
                    <th scope="col">Valor</th>
                </tr>
            </thead>
            <tbody>
                {cashFlow?.allTitlesByDueDate?.map((title) => (
                    <Tr key={title?.id + title?.type} title={title} />
                ))}
            </tbody>
        </table>
    );
}
