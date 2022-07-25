import React, { useState } from 'react';

import IconButton from '../iconbutton/iconbutton.component';

import './pagination.styles.scss';

const Pagination = ({ dataPerPage, allData }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPage = Math.ceil(allData.length / dataPerPage);

    const toPrevPage = () => setCurrentPage(currentPage - 1);
    const toNextPage = () => setCurrentPage(currentPage + 1);

    return (
        <div className="pagination">
            <div className="pagination__data">
                {allData.slice(
                    (currentPage - 1) * dataPerPage,
                    dataPerPage * currentPage
                )}
            </div>
            {totalPage !== 1 && (
                <div className="pagination__controls">
                    <IconButton
                        onClick={toPrevPage}
                        isDisable={currentPage === 1}
                        isSmall={true}
                    >
                        <span>&lt;</span>
                    </IconButton>

                    <span>
                        Page {currentPage} of {totalPage}
                    </span>
                    <IconButton
                        onClick={toNextPage}
                        isDisable={currentPage === totalPage}
                        isSmall={true}
                    >
                        <span>&gt;</span>
                    </IconButton>
                </div>
            )}
        </div>
    );
};

export default Pagination;
