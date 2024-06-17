import { useEffect, useState } from "react";

interface Props {
    pageCount: number | undefined;
    currentPage: number;
    setCurrentPage:(currentPage: number) => void;
}

export const Pagination = (props: Props) => {
    const handlePage = (pageNum: number) => {
        props.setCurrentPage(pageNum);
    }

    const handlePreviousPage = () => {
        if (props.pageCount && props.currentPage - 1 > 0)
            props.setCurrentPage(props.currentPage - 1);
    }

    const handleNextPage = () => {
        if (props.pageCount && props.currentPage + 1 <= props.pageCount)
            props.setCurrentPage(props.currentPage + 1);
    }

    return (
        <div>
            <ul className="flex flex-row text-white font-bold gap-4">
                <li>
                    <button id="next" onClick={handlePreviousPage}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                </li>
                {Array(props.pageCount).fill(null).map((value, index) => (
                    <li key={index}>
                        {index+1 === props.currentPage ? <button className="border border-green-700 rounded-lg px-2" onClick={() => handlePage(index+1)}>{index+1}</button>
                        :<button className="border border-white rounded-lg px-2" onClick={() => handlePage(index+1)}>{index+1}</button>}
                    </li>
                ))}
                <li>
                <button id="back" onClick={handleNextPage}>
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                </button>
                </li>
            </ul>
        </div>
    )
}