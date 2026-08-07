import { useState } from "react";
import type { CSSProperties } from "react";

type SourceImageProps = {
  src?: string;
  fallbackSrc?: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
};

const SourceImage = ({
  src,
  fallbackSrc = "/icons.svg",
  alt = "",
  className = "",
  style,
}: SourceImageProps) => {
  const [hasError, setHasError] = useState(false);
  const resolvedSource = !src || hasError ? fallbackSrc : src;

  return (
    <img
      src={resolvedSource}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      className={className}
      style={style}
      onError={() => setHasError(true)}
    />
  );
};

export default SourceImage;
