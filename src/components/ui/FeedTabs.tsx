import { useTabs } from "../../lib/store";

const FeedTabs = () => {
  const tabs = [
    { title: "TOP", id: "topstories" },
    { title: "NEWS", id: "newstories" },
    { title: "BEST", id: "beststories" },
  ]; // 탭 배열
  const { activeTab } = useTabs((state) => state); // 현재 선택된 탭 id
  const setTab = useTabs((state) => state.setTab); // 탭 id 전역 설정
  return (
    <div className="flex items-center justify-center gap-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`px-6 py-2 ${
            tab.id === activeTab
              ? "bg-blue-900 text-white border border-blue-900"
              : "bg-white text-blue-900 border border-blue-900 hover:bg-blue-100"
          } rounded-full font-bold cursor-pointer transition`} // id와 전역 activeTab 변수가 같다면 활성화 처리
          onClick={() => setTab(tab.id)} // 클릭 시 전역 탭 id 설정
        >
          {tab.title}
        </button>
      ))}
    </div>
  );
};

export default FeedTabs;
