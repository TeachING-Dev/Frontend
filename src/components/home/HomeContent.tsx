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
    "flex h-[30px] w-[130px] items-center justify-center gap-[4px] rounded-[5px] border px-[10px] py-[5px] text-[10px] transition-colors md:min-h-[40px] md:h-auto md:w-auto md:gap-[10px] md:text-[16px]";  const handleViewAll = () => {
    
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
          md:py-[15px]
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
              src="/icon/최근에 저장한 지식.png"
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
              src="/icon/티칭맵3.png"
              alt=""
              aria-hidden="true"
              className="h-5 w-5 shrink-0"
            />

            <span className="break-keep">
              학습 중인 티칭맵
            </span>
          </button>
        </div>

        {/* 전체보기 */}
        <button
          type="button"
          onClick={handleViewAll}
          className="
            ml-auto
            flex
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
          전체보기

          <ChevronRight
            size={20}
            strokeWidth={2.5}
            className="md:h-6 md:w-6"
          />
        </button>
      </div>

      {/* 내용 */}
      <div className="md:pt-[5px]">
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