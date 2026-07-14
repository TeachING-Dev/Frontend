import ArchiveFolderHeader from "../components/archive/ArchiveFolderHeader";
import ArchiveDataList, {
  type ArchiveData,
} from "../components/archive/ArchiveDataList";
import EmptyArchiveData from "../components/archive/EmptyArchiveData";

const dummyData: ArchiveData[] = [
  {
    id: 1,
    tag: "Node.js",
    date: "2026-05-10",
    title: "Node.js의 이벤트 루프(Event Loop) 완벽 이해하기",
    description:
      "Node.js의 핵심 아키텍처인 이벤트 루프의 6가지 단계(Phase)와 동작 메커니즘을 시각적 자료와 함께 상세히 정리한 기술 블로그입니다.",
  },
  {
    id: 2,
    tag: "React",
    date: "2026-05-08",
    title: "React의 렌더링(Rendering) 과정과 Virtual DOM",
    description:
      "React가 상태(State) 변경 이후 Virtual DOM을 생성하고 실제 DOM을 효율적으로 업데이트하는 과정을 예제와 함께 설명합니다.",
  },
  {
    id: 3,
    tag: "TypeScript",
    date: "2026-05-05",
    title: "TypeScript를 사용하는 이유와 실전 활용법",
    description:
      "JavaScript와 비교하며 타입 시스템의 장점, 인터페이스, 제네릭 등 실제 프로젝트에서 자주 사용하는 기능들을 소개합니다.",
  },
  {
    id: 4,
    tag: "Frontend",
    date: "2026-05-02",
    title: "프론트엔드 개발자를 위한 성능 최적화 가이드",
    description:
      "이미지 최적화, 코드 스플리팅, Lazy Loading, 메모이제이션 등 사용자 경험을 높이기 위한 다양한 성능 최적화 기법을 정리했습니다.",
  },
];

const ArchiveFolderPage = () => {
  return (
    <main className="py-10">
      <div className="mx-auto w-[1120px]">
        <ArchiveFolderHeader
          folderName="Backend"
          savedItemCount={dummyData.length}
          onBack={() => {}}
        />

        <div className="mt-10">
          {dummyData.length === 0 ? (
            <EmptyArchiveData />
          ) : (
            <ArchiveDataList data={dummyData} />
          )}
        </div>
      </div>
    </main>
  );
};

export default ArchiveFolderPage;