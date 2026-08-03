import { useState } from "react";

type SourceImageProps = {
  src?: string;
  fallbackSrc?: string;
  alt?: string;
  className?: string;
};

const SourceImage = ({
  src,
  fallbackSrc = "/icons.svg",
  alt = "",
  className = "",
}: SourceImageProps) => {
  const [hasError, setHasError] = useState(false);
  const resolvedSource = !src || hasError ? fallbackSrc : src;

  return (
    <img
      src={resolvedSource}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      className={className}
      onError={() => setHasError(true)}
    />
  );
};

export default SourceImage;