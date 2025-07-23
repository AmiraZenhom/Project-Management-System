import React from 'react'
import { Pagination } from "react-bootstrap";
export default function Paginations({pageNumber,setPageNumber,totalPages}:any) {
  return (
    <>
    <div className="ms-5">
            <Pagination className="m-auto    w-25 ps-5 ">
              {/* <Pagination.First onClick={() => setPageNumber(1)} disabled={pageNumber === 1} /> */}
              <Pagination.Prev
                onClick={() => setPageNumber(pageNumber - 1)}
                disabled={pageNumber === 1}
              />

              {[...Array(totalPages)]
                .map((_, i) => i + 1)
                .filter((page) => {
                  // عرض فقط الصفحات القريبة من الحالية
                  return (
                    page === 1 ||
                    page === totalPages ||
                    (page >= pageNumber - 2 && page <= pageNumber + 2)
                  );
                })
                .map((page, index, array) => (
                  <Pagination.Item
                    key={page}
                    active={page === pageNumber}
                    onClick={() => setPageNumber(page)}
                  >
                    {page}
                  </Pagination.Item>
                ))}

              <Pagination.Next
                onClick={() => setPageNumber(pageNumber + 1)}
                disabled={pageNumber === totalPages}
              />
              {/* <Pagination.Last onClick={() => setPageNumber(totalPages)} disabled={pageNumber === totalPages} /> */}
            </Pagination>
            
      </div>
    </>
  )
}
