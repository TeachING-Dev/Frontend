import { useNavigate } from "react-router-dom";

import type { RecentMaterial } from "../../apis/home";
import EmptyHomeContent from "./EmptyHomeContent";
import RecentKnowledgeItem from "./RecentKnowledgeItem";

type RecentKnowledgeListProps = {
  materials: RecentMaterial[];
};

const platformIconMap: Record<string, string> = {
  VELOG: "/icon/velog.png",
  YOUTUBE: "/icon/youtube-app-icon.png",
  CAFE: "/icon/cafe.png",
};

const formatSavedAt = (createdAt: string) => {
  const utcCreatedAt =
    createdAt.endsWith("Z")
      ? createdAt
      : `${createdAt}Z`;

  const createdDate =
    new Date(utcCreatedAt);

  const now = new Date();

  const differenceInMilliseconds =
    now.getTime() -
    createdDate.getTime();

  const differenceInMinutes = Math.floor(
    differenceInMilliseconds /
      (1000 * 60),
  );

  if (differenceInMinutes < 1) {
    return "방금 전";
  }

  if (differenceInMinutes < 60) {
    return `${differenceInMinutes}분 전`;
  }

  const differenceInHours = Math.floor(
    differenceInMinutes / 60,
  );

  if (differenceInHours < 24) {
    return `${differenceInHours}시간 전`;
  }

  const differenceInDays = Math.floor(
    differenceInHours / 24,
  );

  if (differenceInDays < 7) {
    return `${differenceInDays}일 전`;
  }

  return createdDate.toLocaleDateString(
    "ko-KR",
  );
};

const RecentKnowledgeList = ({
  materials,
}: RecentKnowledgeListProps) => {
  const navigate = useNavigate();

  if (materials.length === 0) {
    return (
      <EmptyHomeContent
        message="최근에 저장한 지식이 없어요."
        iconSrc="/icon/최근에 저장한 지식3.png"
      />
    );
  }

  return (
    <div className="flex flex-col">
      {materials.map((material) => (
        <RecentKnowledgeItem
          key={material.materialId}
          title={
            material.analysisTitle ||
            material.title
          }
          savedAt={formatSavedAt(
            material.createdAt,
          )}
          iconSrc={
            platformIconMap[
              material.platformType
            ] ||
            "/icon/최근에 저장한 지식3.png"
          }
          onClick={() =>
            navigate(
              `/archive/folder/data/${material.materialId}`,
            )
          }
        />
      ))}
    </div>
  );
};

export default RecentKnowledgeList;