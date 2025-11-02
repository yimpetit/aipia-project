import { useQuery } from "@tanstack/react-query";
import FeedItem from "./FeedItem";
import { feedAPI } from "../../lib/api";
import MoreButton from "./MoreButton";
import { useFeedPage, useTabs } from "../../lib/store";

const FeedList = () => {
  const { page, setPage } = useFeedPage(); // 목록 페이지 전역 상태
  const { activeTab } = useTabs((state) => state); // 전역관리 현재 선택된 탭
  const {
    data: feeds,
    isLoading,
    error,
  } = useQuery({
    // 목록 불러오기
    queryKey: ["feeds", activeTab], // 중복 호출 방지를 위한 쿼리키로 각 탭의 고유 파라미터 사용
    queryFn: () => feedAPI.getFeeds({ category: activeTab }), //카테고리를 파라미터로 넘김
  });

  const displayedFeeds = feeds?.slice(0, page * 9); //9개씩 보여주기
  const hasMore = (displayedFeeds?.length ?? 0) < (feeds?.length ?? 0); //더보기 버튼 표시 여부

  if (isLoading) {
    return (
      <div className="py-40 flex justify-center items-center">
        <div className="border-4 w-10 h-10 rounded-full border-dotted animate-spin border-aipia "></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-aipia py-40">
        피드를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  return (
    <section className="mt-10 mb-25">
      {displayedFeeds ? (
        <>
          <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
            {displayedFeeds?.map((feed) => (
              <FeedItem key={feed} id={feed} />
            ))}
          </div>
          {hasMore && <MoreButton onMore={() => setPage(page + 1)} />}
        </>
      ) : (
        <div className="text-center text-gray-500">피드가 없습니다.</div>
      )}
    </section>
  );
};

export default FeedList;
