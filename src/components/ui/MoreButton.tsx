import type { IMoreButton } from "../../lib/types";

const MoreButton = ({ onMore }: IMoreButton) => {
  return (
    <button
      className="flex items-center justify-center rounded-lg bg-aipia text-white w-20 h-10 mx-auto mt-10 cursor-pointer"
      onClick={onMore}
    >
      더보기
    </button>
  );
};

export default MoreButton;
