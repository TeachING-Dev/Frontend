import {
  useEffect,
  useRef,
  useState,
} from "react";

type ProgressBarProps = {
  value?: number;
  duration?: number;
  autoPlay?: boolean;
  isActive?: boolean;
  ariaLabel?: string;
  className?: string;
  trackClassName?: string;
  indicatorClassName?: string;
  onComplete?: () => void;
};

const clampProgress = (value: number) => {
  return Math.min(Math.max(value, 0), 100);
};

const ProgressBar = ({
  value,
  duration = 5000,
  autoPlay = false,
  isActive = true,
  ariaLabel = "진행률",
  className = "",
  trackClassName = "",
  indicatorClassName = "",
  onComplete,
}: ProgressBarProps) => {
  const [progress, setProgress] = useState(
    clampProgress(value ?? 0),
  );

  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (value === undefined) {
      return;
    }

    setProgress(clampProgress(value));
  }, [value]);

  useEffect(() => {
    if (
      !autoPlay ||
      !isActive ||
      value !== undefined ||
      duration <= 0
    ) {
      return;
    }

    setProgress(0);

    const startedAt = performance.now();
    let animationFrameId = 0;

    const updateProgress = (currentTime: number) => {
      const elapsedTime = currentTime - startedAt;
      const nextProgress = clampProgress(
        (elapsedTime / duration) * 100,
      );

      setProgress(nextProgress);

      if (nextProgress < 100) {
        animationFrameId =
          window.requestAnimationFrame(updateProgress);
        return;
      }

      onCompleteRef.current?.();
    };

    animationFrameId =
      window.requestAnimationFrame(updateProgress);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [
    autoPlay,
    duration,
    isActive,
    value,
  ]);

  const displayedProgress =
    value === undefined
      ? progress
      : clampProgress(value);

  return (
    <div
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(displayedProgress)}
      className={`w-full ${className}`}
    >
      <div
        className={`h-2 w-full overflow-hidden rounded-full bg-[#42444C] ${trackClassName}`}
      >
        <div
          className={`h-full rounded-full bg-[linear-gradient(90deg,#917DEC_0%,#D9CDFF_100%)] ${indicatorClassName}`}
          style={{
            width: `${displayedProgress}%`,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;