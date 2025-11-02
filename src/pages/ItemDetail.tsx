import { useQuery } from "@tanstack/react-query";
import { NavLink, useParams } from "react-router";
import { feedAPI } from "../lib/api";
import { useState } from "react";
import { formatDate } from "../lib/utils";

const LinkIcon = () => (
  // 링크 아이콘 SVG
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M10 13C10.4295 13.5741 10.9774 14.0492 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9403 15.7513 14.6897C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4508 9.59699 21.9548 8.33397 21.9434 7.02299C21.932 5.71201 21.4061 4.45794 20.4791 3.5309C19.5521 2.60386 18.298 2.07802 16.987 2.06663C15.676 2.05523 14.413 2.55921 13.47 3.47L11.75 5.18"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 11C13.5705 10.4259 13.0226 9.95083 12.3934 9.60707C11.7642 9.26331 11.0685 9.05889 10.3533 9.00768C9.63819 8.95646 8.92037 9.05967 8.24861 9.31023C7.57685 9.56079 6.96689 9.95298 6.45996 10.46L3.45996 13.46C2.54917 14.403 2.04519 15.666 2.05659 16.977C2.06798 18.288 2.59382 19.5421 3.52086 20.4691C4.4479 21.3961 5.70197 21.922 7.01295 21.9334C8.32393 21.9448 9.58694 21.4408 10.53 20.53L12.24 18.82"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ItemDetail = () => {
  const [loadImage, setLoadImage] = useState(false); // 이미지 로드 스켈렌톤을 위한 state
  const { id } = useParams(); // 라우트 파라미터로 id 가져오기
  const { data, isLoading, error } = useQuery({
    queryKey: ["feed", Number(id)], // 중복호출 방지 피드 아이템 쿼리키
    queryFn: () => feedAPI.getFeedById(Number(id)), //목록 아이템 불러오기
  });

  if (error) {
    return (
      <div className="text-center text-aipia py-40">
        피드를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  return (
    <section className="mt-10 mb-100 max-w-3xl mx-auto">
      {isLoading || !data ? ( // 데이터가 로드되지 않았을 때 스켈레톤 표시
        <>
          <div className="w-full mx-auto mt-3 p-5 border border-stone-200 rounded-2xl flex">
            <div className="w-full h-100 animate-pulse bg-gray-200 rounded-lg" />
          </div>
          <div className="flex min-w-0 mt-2 justify-between items-center gap-4 px-4">
            <div className="flex-2">
              <div className="w-80 animate-pulse bg-gray-200 rounded-lg text-transparent">
                .
              </div>
              <div className="w-40 animate-pulse bg-gray-200 rounded-lg text-transparent mt-1">
                .
              </div>
            </div>
            <div className="flex-1 text-right flex flex-col justify-end items-end">
              <div className="w-30 animate-pulse bg-gray-200 rounded-lg text-transparent">
                .
              </div>
              <div className="w-20 animate-pulse bg-gray-200 rounded-lg text-transparent mt-1">
                .
              </div>
            </div>
          </div>
          <div className="mt-3 border-t border-t-gray-200 flex justify-between pt-2 items-center px-4">
            <div className="w-60 text-xs animate-pulse bg-gray-200 rounded-lg text-transparent mt-1">
              .
            </div>
            <div className="w-15 h-8 animate-pulse bg-gray-200 rounded-lg" />
          </div>
        </>
      ) : (
        <>
          <div className="w-full mx-auto mt-3 p-5 border border-stone-200 rounded-2xl flex">
            {/* 이미지가 로드되지 않았을 때 스켈레톤 표시 */}
            {!loadImage && (
              <div className="w-full h-100 animate-pulse bg-gray-200 rounded-lg" />
            )}
            <img
              src={`https://picsum.photos/seed/${id}/1280/500`}
              alt={data.title + "image"}
              className={
                loadImage
                  ? "shrink-0 w-full h-100 rounded-lg object-cover"
                  : "hidden"
              }
              onLoad={() => setLoadImage(true)}
            />
          </div>
          <div className="flex min-w-0 mt-2 justify-between items-center gap-4 px-4">
            <div className="flex-2">
              <h2 className="w-full truncate font-medium">{data.title}</h2>
              <div className="text-sm text-blue-900 mt-1">
                Score. {data.score}
              </div>
            </div>
            <div className="flex-1 text-right">
              <p className="text-gray-600 text-xs">{data.by}</p>
              <p className="text-gray-400 text-xs mt-1">
                {formatDate(data.time)}
              </p>
            </div>
          </div>
          <div className="mt-3 border-t border-t-gray-200 flex justify-between pt-2 items-center px-4">
            <a href={data.url} className="text-xs text-blue-700 flex gap-1">
              <LinkIcon /> {data.url}
            </a>
            <NavLink
              to="/"
              className="text-base font-medium bg-aipia text-white w-15 h-8 flex items-center justify-center rounded-lg hover:opacity-90 transition"
            >
              목록
            </NavLink>
          </div>
        </>
      )}
    </section>
  );
};

export default ItemDetail;
