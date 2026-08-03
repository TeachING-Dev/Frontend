import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

export type PageContainerProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export const PageContainer = <T extends ElementType = "div">({
  as,
  children,
  className = "",
  ...props
}: PageContainerProps<T>) => {
  const Component = as ?? "div";

  return (
    <Component
      className={`mx-auto w-full max-w-[1120px] px-5 xl:px-0 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default PageContainer;
