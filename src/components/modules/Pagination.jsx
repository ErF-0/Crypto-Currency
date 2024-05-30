import { useState } from "react";

import styles from "./pagination.module.css";
import ChevronLeft from "../icons/ChevronLeft";
import ChevronRight from "../icons/ChevronRight";

const Pagination = ({ page, setPage }) => {
  const previousHandler = () => {
    if (page <= 1) return;
    setPage((page) => page - 1);
  };
  const nextHandler = () => {
    console.log(page);

    if (page >= 10) return;
    setPage((page) => page + 1);
  };

  const numberHandler = (e) => {
    const pageNumber = +e.target.textContent;
    setPage(pageNumber);
  };

  return (
    <div className={styles.pagination}>
      <button
        className={`${page === 1 ? styles.disabled : null} ${styles.hidden}`}
        onClick={previousHandler}
      >
        Previous
      </button>
      {/* button for mobile size */}
      <button
        className={`${page === 1 ? styles.disabled : null} ${styles.mobileBtn}`}
        onClick={previousHandler}
      >
        <ChevronLeft />
      </button>
      <p
        className={page === 1 ? styles.selected : null}
        onClick={numberHandler}
      >
        1
      </p>
      <p
        className={`${page === 2 ? styles.selected : null} ${styles.hidden}`}
        onClick={numberHandler}
      >
        2
      </p>
      {page > 2 && page < 9 && (
        <>
          <span className={styles.hidden}>...</span>
          <p className={`${styles.selected} ${styles.hidden}`}>{page}</p>
        </>
      )}
      {/* page number for mobile size */}
      {page > 1 && page < 10 && (
        <>
          <>
            <span className={styles.mobileSize}>...</span>
            <p className={`${styles.selected} ${styles.mobileSize}`}>{page}</p>
          </>
        </>
      )}
      <span>...</span>
      <p
        className={`${page === 9 ? styles.selected : null} ${styles.hidden}`}
        onClick={numberHandler}
      >
        9
      </p>
      <p
        className={page === 10 ? styles.selected : null}
        onClick={numberHandler}
      >
        10
      </p>
      <button
        className={`${page === 10 ? styles.disabled : null} ${styles.hidden}`}
        onClick={nextHandler}
      >
        Next
      </button>
      {/* button for mobile size */}
      <button
        className={`${page === 10 ? styles.disabled : null} ${
          styles.mobileBtn
        }`}
        onClick={nextHandler}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
