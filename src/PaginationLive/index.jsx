import React, { useState, useEffect } from "react";
import axios from "axios";
import "./paginationLive.css";

const PaginationLive = () => {
  const [allItems, setAllItems] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [allPages, setAllPages] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageItems, setCurrentPageItems] = useState([]);

  const [pageLimit, setPageLimit] = useState(5);
  const [maxPage, setMaxPage] = useState(5);
  const [minPage, setMinPage] = useState(1);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        let url = `https://dummyjson.com/products?limit=100`;
        const { data } = await axios.get(url);
        console.log(data);
        setAllItems(data.products);
        setTotalPages(Math.ceil(data.products.length / itemsPerPage));
        let allPageNos = [];
        for (
          let i = 1;
          i < Math.ceil(data.products.length / itemsPerPage);
          i++
        ) {
          allPageNos.push(i);
        }
        setAllPages(allPageNos);
      } catch (e) {
        console.log(e);
      } finally {
        //setLoading(false);
      }
    };
    fetchTodos();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    let indexOfLastItem = currentPage * itemsPerPage;
    let indexOfFirstItem = indexOfLastItem - itemsPerPage;
    let currItems = allItems.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentPageItems(currItems);
  }, [currentPage, allItems]);

  const handlePrevious = val => {
    setCurrentPage(val);
    if (val % 5 == 0) {
      setMaxPage(maxPage => maxPage - pageLimit);
      setMinPage(minPage => minPage - pageLimit);
    }
  };

  const handleNext = val => {
    setCurrentPage(val);
    if (val > maxPage) {
      setMaxPage(maxPage + pageLimit);
      setMinPage(minPage + pageLimit);
    }
  };

  return (
    <div className="pagination">
      <div className="items">
        {currentPageItems.map(item => {
          return <span>{item.title}</span>;
        })}
      </div>
      <div className="pageNumbers">
        <button onClick={() => handlePrevious(currentPage - 1)}>
          Previous
        </button>
        {allPages.map(page => {
          if (page >= minPage && page <= maxPage) {
            return (
              <span
                className={`pageNumber ${currentPage === page ? "active" : ""}`}
              >
                {page}
              </span>
            );
          }
        })}
        <button onClick={() => handleNext(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
};

export default PaginationLive;
