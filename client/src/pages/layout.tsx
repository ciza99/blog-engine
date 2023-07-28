import { Outlet } from "react-router-dom";

import { Header } from "components/header";

export const Layout = () => {
  return (
    <>
      <Header />
      <main className="pt-14 container mx-auto flex flex-col h-full">
        <Outlet />
      </main>
    </>
  );
};
