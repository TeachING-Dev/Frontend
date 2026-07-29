import { useNavigate } from "react-router-dom";

import type { RecentMaterial } from "../../apis/home";
import EmptyHomeContent from "./EmptyHomeContent";
import RecentKnowledgeItem from "./RecentKnowledgeItem";

type RecentKnowledgeListProps = {
  materials: RecentMaterial[];
};

const formatSavedAt = (createdAt: string) => {
  /*
   * 서버에서 UTC 시간을 내려주지만
   * timezone 정보(Z)가 없는 경우 UTC로 처리
   *
   * 예:
   * 2026-07-29T15:57:15
   * ↓
   * 2026-07-29T15:57:15Z
   */
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

  // 1분 미만
  if (differenceInMinutes < 1) {
    return "방금 전";
  }

  // 1시간 미만
  if (differenceInMinutes < 60) {
    return `${differenceInMinutes}분 전`;
  }

  const differenceInHours = Math.floor(
    differenceInMinutes / 60,
  );

  // 24시간 미만
  if (differenceInHours < 24) {
    return `${differenceInHours}시간 전`;
  }

  const differenceInDays = Math.floor(
    differenceInHours / 24,
  );

  // 7일 미만
  if (differenceInDays < 7) {
    return `${differenceInDays}일 전`;
  }

  // 7일 이상
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
            material.platformImageUrl ||
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