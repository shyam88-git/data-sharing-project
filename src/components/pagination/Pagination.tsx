import React from "react";
import { FaAnglesRight, FaAnglesLeft } from "react-icons/fa6";

interface PaginationProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  currentPage: number | string;
  totalPages: number;
  onPageChange: (page: number) => void;
  flipColor?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  hasNextPage,
  hasPrevPage,
  currentPage,
  totalPages,
  onPageChange,
  flipColor = false,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  function getConsecutiveNumbers(index: number) {
    if (index >= 0 && index + 2 < pages.length) {
      return pages.slice(index, index + 3);
    } else {
      return null;
    }
  }

  const displayPages =
    pages.length <= 3
      ? pages
      : totalPages - +currentPage > 2
      ? getConsecutiveNumbers(+currentPage - 1)
      : getConsecutiveNumbers(totalPages - 3);

  const prevNextBtnActiveColor = flipColor
    ? "text-gray-100"
    : "text-primary-blue-900 hover:bg-primary-blue-400 hover:text-white ";
  const prevNextBtnDisabledColor = flipColor
    ? "text-primary-blue-900 hover:bg-primary-blue-400 cursor-default"
    : "text-gray-400 cursor-default";

  const activePageColor = flipColor
    ? "bg-gray-200 text-primary-blue-900 hover:bg-gray-200 hover:!text-primary-blue-900"
    : "bg-primary-blue-900 text-white";
  const disablePageColor = flipColor
    ? "text-white hover:bg-slate-600"
    : "bg-gray-200";

  return (
    <div className="relative flex flex-wrap justify-center items-center gap-4 my-6">
      <button
        className={`p-2 h-10 w-10 flex items-center justify-center rounded-full  ${
          hasPrevPage ? prevNextBtnActiveColor : prevNextBtnDisabledColor
        }`}
        onClick={() => (hasPrevPage ? onPageChange(+currentPage - 1) : {})}
      >
        <FaAnglesLeft size={20} />
      </button>

      {displayPages?.length &&
        displayPages.map((page) => {
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`p-2 h-10 w-10 flex items-center justify-center rounded-full ${
                +currentPage === page ? activePageColor : disablePageColor
              } hover:bg-primary-blue-400 hover:text-white`}
            >
              {page}
            </button>
          );
        })}

      <button
        className={`p-2 h-10 w-10 flex items-center justify-center rounded-full  ${
          hasNextPage ? prevNextBtnActiveColor : prevNextBtnDisabledColor
        }`}
        onClick={() => (hasNextPage ? onPageChange(+currentPage + 1) : {})}
      >
        <FaAnglesRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
