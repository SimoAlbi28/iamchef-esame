import React from 'react';
import { Outlet } from 'react-router-dom';

interface LayoutProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

function Layout({ header, footer }: LayoutProps) {
  return (
    <main className="w-screen max-w-96 h-screen flex flex-col mx-auto bg-gradient-to-b from-purple-950 via-purple-950 to-purple-900 text-purple-100">
      
      {/* Header section */}
      <header className="mb-6 shrink-0">
        {header}
      </header>

      {/* Main content section - Usa Outlet per renderizzare le rotte figlie */}
      <section className="w-full flex-1 flex justify-center items-start min-h-0 p-0">
        <Outlet />
      </section>

      {/* Footer section */}
      {footer && (
        <footer className="mt-4 p-4 text-center text-purple-200 border-t border-purple-700">
          {footer}
        </footer>
      )}

    </main>
  );
}

export default Layout;
