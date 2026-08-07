import { Fragment } from "react";
import type { ReactNode } from "react";

export const renderFormattedText = (children: ReactNode) => {
  if (typeof children !== "string") {
    return children;
  }

  return children.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={`${part}-${index}`} className="font-bold max-md:font-normal">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return <Fragment key={`${part}-${index}`}>{part}</Fragment>;
  });
};
