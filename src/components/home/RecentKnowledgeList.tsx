import EmptyHomeContent from "./EmptyHomeContent";
import RecentKnowledgeItem from "./RecentKnowledgeItem";

export type RecentKnowledge = {
  id: number;
  title: string;
  savedAt: string;
  iconSrc: string;
};

const dummyRecentKnowledge: RecentKnowledge[] = [
  /*{
    id: 1,
    title: "학습의 과학: 효과적인 공부 방법",
    savedAt: "3시간 전",
    iconSrc: "/youtube-app-icon.png",
  },
  {
    id: 2,
    title: "학습의 과학: 효과적인 공부 방법",
    savedAt: "3시간 전",
    iconSrc: "/youtube-app-icon.png",
  },
  {
    id: 3,
    title: "학습의 과학: 효과적인 공부 방법",
    savedAt: "3시간 전",
    iconSrc: "/youtube-app-icon.png",
  },
  {
    id: 4,
    title: "학습의 과학: 효과적인 공부 방법",
    savedAt: "3시간 전",
    iconSrc: "/youtube-app-icon.png",
  },
  {
    id: 5,
    title: "학습의 과학: 효과적인 공부 방법",
    savedAt: "3시간 전",
    iconSrc: "/youtube-app-icon.png",
  },*/
];

const RecentKnowledgeList = () => {
  if (dummyRecentKnowledge.length === 0) {
    return (
      <EmptyHomeContent
        message="최근에 저장한 지식이 없어요."
        iconSrc="/icon_최근에 저장한 지식3.png"
      />
    );
  }

  return (
    <div className="flex flex-col">
      {dummyRecentKnowledge.map((item) => (
        <RecentKnowledgeItem
          key={item.id}
          title={item.title}
          savedAt={item.savedAt}
          iconSrc={item.iconSrc}
          onClick={() =>
            console.log(`${item.title} 클릭`)
          }
        />
      ))}
    </div>
  );
};

export default RecentKnowledgeList;