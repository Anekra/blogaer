import Footer from "@/lib/components/Footer";
import Navbar from "@/lib/components/Navbar";
import SideBar from "@/lib/components/SideBar";
import { SideBarProvider } from "@/lib/contexts/SideBarContext";
import React from "react";

export default async function ExploreLayout({ children }: { children: React.ReactNode;}) {
  return (
    <div className="relative flex min-h-screen">
      <Navbar />
      <SideBarProvider>
        <SideBar />
      </SideBarProvider>
      {children}
      <Footer />
    </div>
  );
}