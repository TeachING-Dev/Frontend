import ArchiveDataHeader from "../components/archive/ArchiveDataHeader";
import ArchiveDataSummary from "../components/archive/ArchiveDataSummary";
import ArchiveDataAnalysis from "../components/archive/ArchiveDataAnalysis";

const dummyData = {
  id: 1,
  date: "2026-05-10",
  title:
    "Node.js의 이벤트 루프(Event Loop) 완벽 이해하기",
  originalUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  tags: [
    "Node.js",
    "Backend",
    "Event Loop",
    "Architecture",
  ],
  summary:
    "Node.js의 이벤트 루프(Event Loop)는 싱글 스레드 기반 환경에서 비동기 작업을 효율적으로 처리하기 위한 핵심 메커니즘입니다. 이벤트 루프의 6가지 단계와 Microtask Queue의 동작 방식을 이해하면 Promise와 setTimeout의 실행 순서를 명확하게 이해할 수 있습니다.",

  analysis: [
    {
      id: 1,
      title: "Node.js 비동기 처리 구조",
      content:
        "Node.js는 싱글 스레드 기반이지만 I/O 작업은 Libuv가 처리하며, 완료된 작업은 이벤트 루프를 통해 콜백이 실행됩니다.",
    },
    {
      id: 2,
      title: "이벤트 루프의 6단계",
      content:
        "Timers → Pending Callbacks → Idle → Poll → Check → Close 순서로 반복되며 각 단계에서 대기 중인 콜백을 실행합니다.",
    },
    {
      id: 3,
      title: "Microtask Queue",
      content:
        "Promise.then(), queueMicrotask(), process.nextTick()은 일반 Task Queue보다 먼저 실행되므로 실행 순서를 이해하는 것이 중요합니다.",
    },
  ],
};

const ArchiveDataPage = () => {
  return (
    <main className="py-10">
      <div className="mx-auto w-[1120px]">
        <ArchiveDataHeader
          date={dummyData.date}
          title={dummyData.title}
          originalUrl={dummyData.originalUrl}
          tags={dummyData.tags}
        />

        <ArchiveDataSummary
          summary={dummyData.summary}
        />

        <ArchiveDataAnalysis
          analysis={dummyData.analysis}
        />
      </div>
    </main>
  );
};

export default ArchiveDataPage;