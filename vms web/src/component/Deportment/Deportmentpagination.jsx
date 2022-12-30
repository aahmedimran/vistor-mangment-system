import React from 'react'

const Deportmentpagination = ({ postPerpage, totalPosts, setcurrantPage }) => {

    const pageNumber = []

    for (let i = 1; i <= Math.ceil(totalPosts / postPerpage); i++) {
        pageNumber.push(i);
    }
    return (
        <div>
            {pageNumber.map((pages, index) => {

                return <button key={index} onClick={() => { setcurrantPage(pages) }}>{pages}</button>
            })

            }
        </div>
    )
}

export default Deportmentpagination