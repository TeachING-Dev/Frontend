import { useState } from "react";
import TeachingMapAnalysisCard from "./TeachingMapAnalysisCard";
import TeachingMapAnalysisDropdown from "./TeachingMapAnalysisDropdown";

interface TeachingMapAnalysisSectionProps {
  label: string;
  title: string;
  descriptions: string[];
  defaultOpen?: boolean;
}

const TeachingMapAnalysisSection = ({
  label,
  title,
  descriptions,
  defaultOpen = false,
}: TeachingMapAnalysisSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section>
      <p className="text-[15px] font-normal leading-[160%] tracking-[-0.15px] text-white">
        {label}
      </p>

      <div className="mt-[12px]">
        <TeachingMapAnalysisDropdown
          title={title}
          isOpen={isOpen}
          onToggle={() => setIsOpen((previous) => !previous)}
        />
      </div>

      {isOpen && (
        <div className="mt-[12px] flex flex-col gap-[10px]">
          {descriptions.map((description, index) => (
            <TeachingMapAnalysisCard
              key={`${description}-${index}`}
              description={description}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default TeachingMapAnalysisSection;