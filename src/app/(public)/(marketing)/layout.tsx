import FooterPage from "@/components/layout/public/footer";
import HeaderPage from "@/components/layout/public/header";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderPage />
      {/* <HomePageLoading> */}
      <main className="flex-1">{children}</main>
      {/* </HomePageLoading> */}
      <FooterPage />
    </div>
  );
};

export default layout;
