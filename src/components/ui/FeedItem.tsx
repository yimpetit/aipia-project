import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { NavLink } from "react-router";
import { feedAPI } from "../../lib/api";
import { formatDate } from "../../lib/utils";
import type { IFeedItem } from "../../lib/types";

const FeedItem = ({ id }: IFeedItem) => {
  const [loadImage, setLoadImage] = useState(false); // 이미지 로드 스켈렌톤을 위한 state
  const { data, isLoading, error } = useQuery({
    queryKey: ["feed", id], // 중복호출 방지 피드 아이템 쿼리키
    queryFn: () => feedAPI.getFeedById(id), //목록 아이템 불러오기
  });

  if (error) {
    return (
      <div className="flex border border-stone-200 rounded-2xl p-2 gap-3 items-center hover:bg-blue-50 transition">
        피드를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  return (
    <NavLink
      to={"/item/" + id}
      className="flex border border-stone-200 rounded-2xl p-2 gap-3 items-center hover:bg-blue-50 transition"
    >
      {isLoading || !data ? ( // 데이터가 로드되지 않았을 때 스켈레톤 표시
        <>
          <div className="w-16 h-20 animate-pulse bg-gray-200 rounded-lg" />
          <div className="flex-1 min-w-0">
            <div className="w-full truncate font-medium bg-gray-200 rounded-lg text-transparent">
              .
            </div>
            <p className="text-transparent text-xs mt-1 bg-gray-200 rounded-lg">
              .
            </p>
            <p className="text-transparent text-xs mt-1 bg-gray-200 rounded-lg">
              .
            </p>
          </div>
        </>
      ) : (
        <>
          {/* 이미지가 로드되지 않았을 때 스켈레톤 표시 */}
          {!loadImage && (
            <div className="w-16 h-20 animate-pulse bg-gray-200 rounded-lg" />
          )}
          <img
            src={`https://picsum.photos/seed/${id}/120/300`}
            alt={data.title + "image"}
            className={
              loadImage
                ? "shrink-0 w-16 h-20 rounded-lg object-cover"
                : "hidden"
            }
            onLoad={() => setLoadImage(true)}
          />
          <div className="flex-1 min-w-0">
            <div className="w-full truncate font-medium">{data.title}</div>
            <p className="text-gray-600 text-xs mt-1">{data.by}</p>
            <p className="text-gray-400 text-xs mt-1">
              {formatDate(data.time)}
            </p>
          </div>
        </>
      )}
    </NavLink>
  );
};

export default FeedItem;
