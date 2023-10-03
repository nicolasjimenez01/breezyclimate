import MultiLevelSidebar from "./Sidebar"
import ResponsiveAppBar from "./Topbar"
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}


const Layout: React.FC<LayoutProps> = ( { children } ) => {
  return (
    <div style={{
      backgroundImage: "url(../../public/Logo4.png)",
      backgroundSize: "cover",
      minHeight: "100vh",
      zIndex: 1
    }}>
      <div className="flex h-screen">
        <MultiLevelSidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <ResponsiveAppBar />
              <main className="flex-1 overflow-x-hidden overflow-y-auto">
                {children}
              </main>
          </div>
      </div>
    </div>
  );
};

export default Layout;