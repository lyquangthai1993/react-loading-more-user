import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { UserScroll } from "./UserScroll";
function isBottom(el) {
  return el.getBoundingClientRect().bottom <= window.innerHeight;
}
export function ScrollLoadMore() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(0);

  const handleScroll = e => {
    const wrappedElement = document.getElementById("user_block");
    // console.log("wrappedElement", wrappedElement);
    if (isBottom(wrappedElement)) {
      console.log("header bottom reached, so plus page 1");
      setPage(page + 1);
    }
  };
  const handleFetchUsers = () => {
    let url = `https://reqres.in/api/users?page=${page}&per_page=2`;
    console.log("url call............:", url);
    setLoading(true);
    axios
      .get(url)
      .then(response => {
        //use concat to push data
        setUsers(users.concat(response.data.data));
        // setTotalPages(response.data.total_pages);
        // console.log("totalPages", response.data.total_pages);
        setLoading(false);
        // console.log('response.data.page', response.data)
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };
  useEffect(() => {
    handleFetchUsers(page);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [page]);

  return (
    <div className="texts">
      <div id="user_block">
        {users.map((user, index) => (
          <UserScroll key={index} user={user} />
        ))}
      </div>
      {loading ? "Loading..." : null}
      {error ? error : null}
    </div>
  );
}
