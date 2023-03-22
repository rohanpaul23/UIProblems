import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./pagination.css";
import { SyncLoader } from "react-spinners";
import { GiPreviousButton, GiNextButton } from "react-icons/gi";

const Movies = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [movieItems, setMovieItems] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${currentPage}`;
        const { data } = await axios.get(url);
        setMovieItems([...movieItems, ...data.results]);
        if (firstRender.current) {
          setTotalPages(data.total_pages);
          firstRender.current = false;
          return;
        }
      } catch (e) {
        console.log(e);
      } finally {
        //setLoading(false);
      }
    };
    fetchMovies();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const checkforScroll = e => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight;
    if (bottom) {
      if (totalPages > currentPage) {
        setCurrentPage(currentPage => currentPage + 1);
      }
    }
  };
  return (
    <div className="infinite_scroll">
      <div className="movie_items">
        <ul>
          {movieItems.map(item => {
            return <li key={item.id}>{item.title}</li>;
          })}
        </ul>
      </div>
      <div className="pagination">
        <span>
          <GiPreviousButton />
        </span>
        <span>
          <GiNextButton />
        </span>
      </div>
    </div>
  );
};

export default Movies;
