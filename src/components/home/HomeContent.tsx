import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import RecentKnowledgeList from "./RecentKnowledgeList";
import TeachingMapList from "./TeachingMapList";

type HomeTab = "knowledge" | "teachingMap";

const HomeContent = () => {
  const [selectedTab, setSelectedTab] =
    useState<HomeTab>("knowledge");
  const navigate = useNavigate();

  const tabButtonClass =
    "flex h-[40px] items-center gap-[10px] rounded-[5px] border px-[10px] py-[5px] transition-colors";

  return (
    <section className="h-[380px] rounded-[10px] bg-[#171722]/80">
      {/* 상단 */}
      <div className="flex items-center justify-between px-[20px] pt-[15px]">
        <div className="flex gap-[19px]">
          <button
            type="button"
            onClick={() => setSelectedTab("knowledge")}
            className={`${tabButtonClass} ${
              selectedTab === "knowledge"
                ? "border-transparent bg-[#2B2C35] text-white"
                : "border-[#2B2C35] bg-transparent text-[#717379]"
            }`}
          >
            <img
              src="/icon_최근에 저장한 지식.png"
              alt=""
              aria-hidden="true"
              className="h-5 w-5"
            />

            <span>최근에 저장한 지식</span>
          </button>

          <button
            type="button"
            onClick={() =>
              setSelectedTab("teachingMap")
            }
            className={`${tabButtonClass} ${
              selectedTab === "teachingMap"
                ? "border-transparent bg-[#2B2C35] text-white"
                : "border-[#2B2C35] bg-transparent text-[#717379]"
            }`}
          >
            <img
              src="/Subtract.png"
              alt=""
              aria-hidden="true"
              className="h-5 w-4"
            />

            <span>학습 중인 티칭맵</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => navigate("/teaching-map")}
          className="flex items-center gap-1 font-['SUIT'] text-[16px] font-medium leading-[150%] tracking-[-0.48px] text-[#917DEC] transition-colors hover:text-[#A995FF]"
        >
          전체보기

          <ChevronRight
            size={24}
            strokeWidth={2.5}
          />
        </button>
      </div>

      {/* 내용 */}
      <div className="pt-[20px]">
        {selectedTab === "knowledge" ? (
          <RecentKnowledgeList />
        ) : (
          <TeachingMapList />
        )}
      </div>
    </section>
  );
};

export default HomeContent;