'use client'
import React, { createContext, useEffect, useState } from 'react';

const SideBarContext = createContext({
  isCollapsed: false,
  toggleSideBar: () => {}
});

function SideBarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const storedValue = localStorage.getItem('sidebar');
    if (storedValue !== null) setIsCollapsed(JSON.parse(storedValue));
  }, []);
  useEffect(() => {
    localStorage.setItem('sidebar', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const toggleSideBar = () => setIsCollapsed(!isCollapsed);

  return (
    <SideBarContext.Provider value={{ isCollapsed, toggleSideBar }}>
      {children}
    </SideBarContext.Provider>
  );
}

export { SideBarContext, SideBarProvider };
