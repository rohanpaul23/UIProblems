import React, { useEffect, useState } from "react";
import axios from "axios";
import "./pagination.css";

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        let url = `https://dummyjson.com/products?limit=100`;
        const { data } = await axios.get(url);
        setItems(data.products);
        let pagesArray = [];
        for (
          let i = 1;
          i <= Math.ceil(data.products.length / pageNumberLimit);
          i++
        ) {
          pagesArray.push(i);
        }
        setPages(pagesArray);
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
    let test = items.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentItems(test);
  }, [currentPage, items]);

  const handlePrevbtn = () => {
    setCurrentPage(currentPage => currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const handleNextbtn = () => {
    setCurrentPage(currentPage => currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handleClick = event => {
    setCurrentPage(Number(event.target.id));
  };

  return (
    <div className="infinite_scroll">
      <div className="movie_items">
        <ul>
          {currentItems.map((item, index) => {
            return (
              <li className="itemDescription">
                {/* {currentPage (index + 1)}.&nbsp; */}
                {item.title}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pagination">
        <button onClick={handlePrevbtn}>Prev</button>
        <div className="noItems">
          {pages.map(page => {
            if (page < maxPageNumberLimit + 1 && page > minPageNumberLimit) {
              return (
                <span
                  className="pageNumber"
                  key={page}
                  id={page}
                  onClick={handleClick}
                  className={`pageNumber ${
                    currentPage == page ? "active" : ""
                  }`}
                >
                  {page}
                </span>
              );
            }
          })}
        </div>
        <button onClick={handleNextbtn}>Next</button>
      </div>
    </div>
  );
};

export default Pagination;
