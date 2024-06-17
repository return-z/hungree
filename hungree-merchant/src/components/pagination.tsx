import { useEffect, useState } from "react";

interface Props {
    itemsCount: number | undefined;
}

export const Pagination = (props: Props) => {
    const [pageCount, setPageCount] = useState(1);

    useEffect(() => {
        if (props.itemsCount)
            setPageCount(Math.ceil(props.itemsCount / 10));
    }, [props.itemsCount])

    return (
        <div>
            <ul className="flex flex-row text-white font-bold gap-4">
                <li>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                </li>
                {Array(pageCount).fill(null).map((value, index) => (
                    <li key={index}>
                        <button className="border border-white rounded-lg px-2">{index+1}</button>
                    </li>
                ))}
                <li>
                <button>
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                </button>
                </li>
            </ul>
        </div>
    )
}