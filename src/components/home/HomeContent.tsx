import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import type {
  ActiveTeachingMap,
  RecentMaterial,
} from "../../apis/home";
import RecentKnowledgeList from "./RecentKnowledgeList";
import TeachingMapList from "./TeachingMapList";

type HomeTab = "knowledge" | "teachingMap";

type HomeContentProps = {
  recentMaterials: RecentMaterial[];
  activeTeachingMaps: ActiveTeachingMap[];
  isLoading?: boolean;
};

const HomeContent = ({
  recentMaterials,
  activeTeachingMaps,
  isLoading = false,
}: HomeContentProps) => {
  const [selectedTab, setSelectedTab] =
    useState<HomeTab>("knowledge");

  const navigate = useNavigate();

  const tabButtonClass =
    "flex h-[31px] w-[147px] shrink-0 box-border items-center justify-center gap-[10px] rounded-[5px] border px-[10px] py-[5px] font-normal text-[14px] leading-[21px] tracking-[-0.35px] text-[#A1A1A5] transition-colors md:h-[40px] md:w-auto md:text-[16px] md:leading-[24px] md:tracking-normal";

  const handleViewAll = () => {
    if (selectedTab === "knowledge") {
      navigate("/archive");
      return;
    }

    navigate("/teaching-map");
  };

  return (
    <section
      className="
        min-h-[380px]
        overflow-hidden
        rounded-[10px]
        bg-[#171722]/80
        p-[10px]
        md:p-0
        lg:h-[380px]
      "
    >
      <div
        className="
          flex
          flex-row
          items-center
          gap-[10px]
          md:px-[20px]
          md:py-[15px]
          lg:justify-between
          lg:gap-0
        "
      >
        <div
          className="
            flex
            min-w-0
            flex-1
            gap-[4px]
            md:gap-[12px]
            lg:w-auto
            lg:gap-[19px]
          "
        >
          <button
            type="button"
            onClick={() => setSelectedTab("knowledge")}
            className={`${tabButtonClass} ${
              selectedTab === "knowledge"
                ? "border-transparent bg-[#2B2C35]"
                : "border-[#2B2C35] bg-transparent"
            }`}
          >
            <img
              src="/icon/최근에 저장한 지식.svg"
              alt=""
              aria-hidden="true"
              className="h-[20px] w-[20px] shrink-0"
            />

            <span className="whitespace-nowrap">
              최근에 저장한 지식
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedTab("teachingMap")}
            className={`${tabButtonClass} ${
              selectedTab === "teachingMap"
                ? "border-transparent bg-[#2B2C35]"
                : "border-[#2B2C35] bg-transparent"
            }`}
          >
            <img
              src="/icon/티칭맵3.png"
              alt=""
              aria-hidden="true"
              className="h-[20px] w-[20px] shrink-0"
            />

            <span className="whitespace-nowrap">
              학습 중인 티칭맵
            </span>
          </button>
        </div>

        <button
          type="button"
          onClick={handleViewAll}
          className="
            ml-auto
            flex
            shrink-0
            items-center
            gap-1
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
          <span className="md:hidden">전체</span>
          <span className="hidden md:inline">전체보기</span>

          <ChevronRight
            size={20}
            strokeWidth={2.5}
            className="hidden md:block md:h-6 md:w-6"
          />
        </button>
      </div>

      <div className="pt-[10px] md:px-[10px] md:pt-[5px]">
        {isLoading ? (
          <div className="flex min-h-[280px] items-center justify-center">
            <p className="text-[16px] font-medium text-[#717379]">
              홈 데이터를 불러오는 중이에요.
            </p>
          </div>
        ) : selectedTab === "knowledge" ? (
          <RecentKnowledgeList
            materials={recentMaterials.slice(0, 5)}
          />
        ) : (
          <TeachingMapList
            teachingMaps={activeTeachingMaps}
          />
        )}
      </div>
    </section>
  );
};

export default HomeContent;