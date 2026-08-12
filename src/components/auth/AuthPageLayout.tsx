import type { ReactNode } from "react";

type AuthPageLayoutProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

const AuthPageLayout = ({ children, className = "", contentClassName = "" }: AuthPageLayoutProps) => {
  return (
    <main className={`relative flex h-[100dvh] w-full overflow-hidden bg-[#0B0A18] lg:h-screen ${className}`}>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[19vh] min-h-[150px] bg-gradient-to-b from-[rgba(134,111,241,0)] to-[rgba(134,111,241,0.3)]" />

      <section
        className={`relative z-10 mx-auto flex h-[100dvh] w-full max-w-[1440px] flex-col items-center px-6 lg:h-screen ${contentClassName}`}
      >
        {children}
      </section>
    </main>
  );
};

export default AuthPageLayout;
