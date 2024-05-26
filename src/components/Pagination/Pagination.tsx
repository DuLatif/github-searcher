import React from "react";
import styles from "./Pagination.module.scss";
import { combineClasses } from "@/utils/styles";

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<IPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const generatePageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 7; // Maximum number of page buttons to show
    const siblingCount = 1; // Number of sibling pages to show on each side of the current page

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(
        currentPage + siblingCount,
        totalPages
      );

      const showLeftEllipsis = leftSiblingIndex > 2;
      const showRightEllipsis = rightSiblingIndex < totalPages - 1;

      if (!showLeftEllipsis && showRightEllipsis) {
        for (let i = 1; i < 3 + 2 * siblingCount; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (showLeftEllipsis && !showRightEllipsis) {
        pages.push(1);
        pages.push("...");
        for (
          let i = totalPages - (2 + 2 * siblingCount);
          i <= totalPages;
          i++
        ) {
          pages.push(i);
        }
      } else if (showLeftEllipsis && showRightEllipsis) {
        pages.push(1);
        pages.push("...");
        for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className={styles.Pagination}>
      {currentPage > 1 && (
        <button
          className={styles.Navigation}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
      )}
      {pageNumbers.map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            className={combineClasses([
              styles.Page,
              currentPage === page ? styles.CurrentPage : "",
            ])}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ) : (
          <span key={index}>{page}</span>
        )
      )}
      {currentPage < totalPages && (
        <button
          className={styles.Navigation}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
