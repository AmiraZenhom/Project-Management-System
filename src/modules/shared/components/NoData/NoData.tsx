import React from 'react'
import noDataPhoto from "../../../../assets/images/download (1).jpg"
export default function noData() {
  return (
    <>
    <div className="text-center mt-5">
        <img className="w-25 " src={noDataPhoto} alt="noDataPhoto" />
        <h5 className="mt-3">No Data !!!!</h5>
      </div>
    </>
  )
}
