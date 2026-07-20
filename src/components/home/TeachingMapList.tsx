import EmptyHomeContent from "./EmptyHomeContent";
import TeachingMapItem from "./TeachingMapItem";

export type TeachingMap = {
  id: number;
  title: string;
  description: string;
  thumbnailSrc: string;
};

const dummyTeachingMaps: TeachingMap[] = [
  /*{
    id: 1,
    title: "로드맵 제목",
    description:
      "로드맵에 대한 상세설명을 몇자까지 처음에 보이나요? 로드맵에 대한 상세설명을 몇자까지 처음에 보이나요?",
    thumbnailSrc: "/Frame2147239594.png",
  },
  {
    id: 2,
    title: "로드맵 제목",
    description:
      "로드맵에 대한 상세설명을 몇자까지 처음에 보이나요? 로드맵에 대한 상세설명을 몇자까지 처음에 보이나요?",
    thumbnailSrc: "/Frame2147239594.png",
  },
  {
    id: 3,
    title: "로드맵 제목",
    description:
      "로드맵에 대한 상세설명을 몇자까지 처음에 보이나요? 로드맵에 대한 상세설명을 몇자까지 처음에 보이나요?",
    thumbnailSrc: "/Frame2147239594.png",
  },*/
];

const TeachingMapList = () => {
  if (dummyTeachingMaps.length === 0) {
    return (
      <EmptyHomeContent
        message="학습 중인 티칭맵이 없어요."
        iconSrc="/icon_티칭맵_퍼플.png"
      />
    );
  }

  return (
    <div className="flex flex-col gap-[20px]">
      {dummyTeachingMaps.map((item) => (
        <TeachingMapItem
          key={item.id}
          title={item.title}
          description={item.description}
          thumbnailSrc={item.thumbnailSrc}
          onClick={() =>
            console.log(`${item.title} 클릭`)
          }
          onShortcutClick={() =>
            console.log(`${item.title} 바로가기`)
          }
        />
      ))}
    </div>
  );
};

export default TeachingMapList;