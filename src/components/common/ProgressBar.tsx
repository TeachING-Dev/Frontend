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
  onProgressChange?: (progress: number) => void;
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
  onProgressChange,
  onComplete,
}: ProgressBarProps) => {
  const [progress, setProgress] = useState(0);

  const onProgressChangeRef =
    useRef(onProgressChange);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onProgressChangeRef.current =
      onProgressChange;
  }, [onProgressChange]);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // value가 직접 전달되는 controlled 방식
  useEffect(() => {
    if (value === undefined) {
      return;
    }

    const nextProgress = clampProgress(value);

    onProgressChangeRef.current?.(
      nextProgress,
    );
  }, [value]);

  // 자동으로 진행되는 uncontrolled 방식
  useEffect(() => {
    if (
      !autoPlay ||
      !isActive ||
      value !== undefined ||
      duration <= 0
    ) {
      return;
    }

    let animationFrameId = 0;
    let startedAt = 0;

    const updateProgress = (
      currentTime: number,
    ) => {
      const elapsedTime =
        currentTime - startedAt;

      const nextProgress = clampProgress(
        (elapsedTime / duration) * 100,
      );

      setProgress(nextProgress);
      onProgressChangeRef.current?.(
        nextProgress,
      );

      if (nextProgress < 100) {
        animationFrameId =
          window.requestAnimationFrame(
            updateProgress,
          );

        return;
      }

      onCompleteRef.current?.();
    };

    // effect 내부에서 바로 setState하지 않고
    // 다음 애니메이션 프레임에서 초기화
    animationFrameId =
      window.requestAnimationFrame(
        (currentTime) => {
          startedAt = currentTime;

          setProgress(0);
          onProgressChangeRef.current?.(0);

          animationFrameId =
            window.requestAnimationFrame(
              updateProgress,
            );
        },
      );

    return () => {
      window.cancelAnimationFrame(
        animationFrameId,
      );
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
      aria-valuenow={Math.round(
        displayedProgress,
      )}
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