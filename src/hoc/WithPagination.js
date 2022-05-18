import React from 'react';
import { Pagination } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const WithPagination = ({ children }) => {
  const [queryParams, setQueryParams] = useSearchParams();
  const totalAudios = useSelector(state => state.music.total);

  const page = +queryParams.get('page') || 1;
  const perPage = 10;
  const lastPage = Math.ceil(totalAudios / perPage);
  const hasLastPage = page < lastPage;
  const hasFirstPage = page > 1;
  const hasPrevPage = page - 1 > 1;
  const hasNextPage = page + 1 < lastPage;

  // навигация через смену query параметра page
  const navigatePage = p => {
    // необходимо так же сохранить предыдущие параметры
    let sort = queryParams.get('sort');
    let search = queryParams.get('search');
    if (sort) {
      setQueryParams({
        sort: sort,
        page: p
      });
    } else if (search) {
      setQueryParams({
        search: search,
        page: p
      });
    } else {
      setQueryParams({
        page: p
      });
    }
  }
  let pagination = (lastPage && totalAudios > 10) ? (
    <Pagination className='justify-content-center mt-3'>
      <Pagination.First disabled/>
      <Pagination.Item 
        className={hasFirstPage ? "" : "d-none"}
        onClick={() => navigatePage(1)}
      > 
        {1}
      </Pagination.Item>
      <Pagination.Item
        className={hasPrevPage ? "" : "d-none"}
        onClick={() => navigatePage(page - 1)}
      >
        {page - 1}
      </Pagination.Item>
      <Pagination.Item
        active
        onClick={() => navigatePage(page)}
      >
        {page}
      </Pagination.Item>
      <Pagination.Item
        className={hasNextPage ? "" : "d-none"}
        onClick={() => navigatePage(page + 1)}
      >
        {page + 1}
      </Pagination.Item>
      <Pagination.Item
        className={hasLastPage ? "" : "d-none"}
        onClick={() => navigatePage(lastPage)}
      >
        {lastPage}
      </Pagination.Item> 
      <Pagination.Last disabled/>
    </Pagination>
  ) : null;

  return (
    <div>
      {children}
      {pagination}
    </div>
  )
};

export default WithPagination;