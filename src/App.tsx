import FeedList from "./components/ui/FeedList";
import FeedTabs from "./components/ui/FeedTabs";

function App() {
  return (
    <>
      <h2 className="font-black text-6xl text-aipia text-center py-20">
        AIPIA News
      </h2>
      <FeedTabs />
      <FeedList />
    </>
  );
}

export default App;
