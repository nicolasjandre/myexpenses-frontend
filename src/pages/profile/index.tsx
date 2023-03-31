import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import nookies from "nookies";
import { GetServerSideProps } from "next";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { SidebarContext } from "@/contexts/SidebarContext";
import { useCashFlow } from "@/hooks/useCashFlow";

export default function Dashboard() {
  const { isSidebarClosed } = useContext(SidebarContext);
  const { data: cashFlow } = useCashFlow("2023-02-30 00:00:00", "2023-06-30 00:00:00");

  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

  const endOfWeek = new Date();
  endOfWeek.setDate(endOfWeek.getDate() - endOfWeek.getDay() + 6);

  const actualWeek = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(date.getDate() + i);
    actualWeek.push(date.toISOString().split("T")[0]);
  }

  const weeklyExpenses = [
    {
      name: "Expense",
      data: actualWeek.map((day) => {
        const filteredData = cashFlow?.expenseTitles.filter((item) => {
          const itemDate = new Date(item.referenceDate);
          return itemDate >= startOfWeek && itemDate <= endOfWeek && itemDate.toISOString().split('T')[0] === day;
        });
        return filteredData?.reduce((acc, curr) => acc + curr.value, 0) ?? 0;
      }),
    },
  ];

  return (
    <>
      <Sidebar />

      <div
        className={`h-screen pl-10 pr-10 p-6 ml-[230px] border-l-2 border-black_bg-100
      transition-all duration-500 ${isSidebarClosed && "ml-[71px]"}`}
      >
        <Header />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  const token = cookies["myexpenses.token"];

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      userProps: {},
    },
  };
};
