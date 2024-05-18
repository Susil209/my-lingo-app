import React from "react";
import { Sidebar } from "../../components/sidebar";
import { Mobileheader } from "@/components/mobileheader";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
    <Mobileheader />
    <Sidebar className="hidden lg:flex"/>
    <main className="lg:pl-[256px] h-full pt-[50px] lg:pt-0">
        <div className="max-w-[1056px] mx-auto h-full ">
            {children}
        </div>
    </main>
    </>
  )
};

export default MainLayout;
