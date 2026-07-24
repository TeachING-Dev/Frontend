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
    "flex min-h-[40px] items-center justify-center gap-[8px] rounded-[5px] border px-[10px] py-[5px] text-[14px] transition-colors md:gap-[10px] md:text-[16px]";

  return (
    <section
      className="
        min-h-[380px]
        overflow-hidden
        rounded-[10px]
        bg-[#171722]/80
        lg:h-[380px]
      "
    >
      {/* 상단 */}
      <div
        className="
          flex
          flex-col
          gap-[12px]
          px-[15px]
          pt-[15px]
          md:px-[20px]
          lg:flex-row
          lg:items-center
          lg:justify-between
          lg:gap-0
        "
      >
        {/* 탭 */}
        <div
          className="
            grid
            w-full
            grid-cols-2
            gap-[8px]
            md:gap-[12px]
            lg:flex
            lg:w-auto
            lg:gap-[19px]
          "
        >
          <button
            type="button"
            onClick={() =>
              setSelectedTab("knowledge")
            }
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
              className="h-5 w-5 shrink-0"
            />

            <span className="break-keep">
              최근에 저장한 지식
            </span>
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
              className="h-5 w-4 shrink-0"
            />

            <span className="break-keep">
              학습 중인 티칭맵
            </span>
          </button>
        </div>

        {/* 전체보기 */}
        <button
          type="button"
          onClick={() => navigate("/teaching-map")}
          className="
            ml-auto
            flex
            items-center
            gap-1
            font-['SUIT']
            text-[14px]
            font-medium
            leading-[150%]
            tracking-[-0.42px]
            text-[#917DEC]
            transition-colors
            hover:text-[#A995FF]
            md:text-[16px]
            md:tracking-[-0.48px]
          "
        >
          전체보기

          <ChevronRight
            size={20}
            strokeWidth={2.5}
            className="md:h-6 md:w-6"
          />
        </button>
      </div>

      {/* 내용 */}
      <div className="pt-[15px] md:pt-[20px]">
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