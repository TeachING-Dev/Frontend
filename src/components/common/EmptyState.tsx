interface EmptyStateProps {
  imageSrc: string;
  imageAlt?: string;
  message: string;
  containerClassName: string;
  imageClassName: string;
  messageClassName: string;
}

const EmptyState = ({
  imageSrc,
  imageAlt = "",
  message,
  containerClassName,
  imageClassName,
  messageClassName,
}: EmptyStateProps) => {
  return (
    <div className={containerClassName}>
      <img
        src={imageSrc}
        alt={imageAlt}
        aria-hidden={imageAlt ? undefined : true}
        className={imageClassName}
      />
      <p className={messageClassName}>{message}</p>
    </div>
  );
};

export default EmptyState;
