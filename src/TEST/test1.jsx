import React, { useState, useEffect, useCallback } from 'react';

const USERS_URL = 'https://example.com/api/users';

const ITEMS_PER_PAGE = 10;

export default function Table() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async (page) => {
    if(page < 0) return; // page 값의 유효성 검사

    setIsLoading(true);
    try {
      const response = await fetch(`${USERS_URL}?page=${page}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      if(!json.results || !Array.isArray(json.results)){
        throw new Error('Invalid data format');
      }

      setData(json.results);
      setTotalCount(json.count);
    } catch (error) {
      console.error('데이터 불러오기가 실패했다면 문제 가정 오류이지만, 예외처리.\n', error);
      setData([]);
      setTotalCount(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handlePageChange = useCallback((newPage) => {
    if(newPage < 0 || newPage * ITEMS_PER_PAGE >= totalCount) return;
    setCurrentPage(newPage);
  }, [totalCount]);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, fetchData]);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <section className="pagination">
        <button 
          className="first-page-btn"
          onClick={() => handlePageChange(0)}
          disabled={isLoading || currentPage === 0}
        >
          first
        </button>
        <button 
          className="previous-page-btn"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={isLoading || currentPage === 0}
        >
          previous
        </button>
        <button 
          className="next-page-btn"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={isLoading || (currentPage + 1) * ITEMS_PER_PAGE >= totalCount}
        >
          next
        </button>
        <button 
          className="last-page-btn"
          onClick={() => handlePageChange(Math.ceil(totalCount / ITEMS_PER_PAGE) - 1)}
          disabled={isLoading || (currentPage + 1) * ITEMS_PER_PAGE >= totalCount}
        >
          last
        </button>
      </section>
    </div>
  );
}
