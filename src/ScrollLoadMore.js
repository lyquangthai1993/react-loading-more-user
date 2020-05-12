import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { UserScroll } from "./UserScroll";
import LoadingIndicator from "./LoadingIndicator";
function isBottom(el) {
  return el.getBoundingClientRect().bottom <= window.innerHeight;
}
export function ScrollLoadMore() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const handleScroll = e => {
    const wrappedElement = document.getElementById("user_block");
    // console.log("wrappedElement", wrappedElement);
    if (isBottom(wrappedElement)) {
      // console.log("header bottom reached);
      console.log("totalPages", totalPages);
      console.log("page", page);
      if (!totalPages || page < totalPages) setPage(page + 1);
    }
  };
  const handleFetchUsers = () => {
    let url = `https://reqres.in/api/users?page=${page}&per_page=2`;
    setLoading(true);

    axios
      .get(url)
      .then(response => {
        //use concat to push data
        setUsers(users.concat(response.data.data));
        setTotalPages(response.data.total_pages);
        setLoading(false);
        // console.log(response.data);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [page]);

  useEffect(() => {
    handleFetchUsers(page, totalPages);
    // window.addEventListener("scroll", handleScroll);

    // return () => window.removeEventListener("scroll", handleScroll);
  }, [page]);

  return (
    <div className="texts">
      <div id="user_block">
        {users.map((user, index) => (
          <UserScroll key={index} user={user} />
        ))}
      </div>
      {loading ? <LoadingIndicator /> : null}
      {error ? error : null}
    </div>
  );
}
