import React from 'react';
import { connect } from 'react-redux';

import noDataFound from '../../assets/img/no-data-found.png';

import Item from '../item/item.component';
import Pagination from '../pagination/pagination.component';

import './history.styles.scss';

const History = ({ monthlyData }) => {
    return (
        <div className="history">
            <h3 className="history__heading">History</h3>
            <h4 className="history__sub-heading">
                For {monthlyData.month},&nbsp;{monthlyData.year}
            </h4>
            <div className="histroy__content">
                {monthlyData.transactions ? (
                    <Pagination
                        allData={monthlyData.transactions
                            .sort((a, b) => new Date(b.date) - new Date(a.date))
                            .map(trans => {
                                return (
                                    <Item transaction={trans} key={trans._id} />
                                );
                            })}
                        dataPerPage={10}
                    />
                ) : (
                    <img
                        src={noDataFound}
                        alt="No data vector created by storyset - www.freepik.com"
                        className="history__image"
                    />
                )}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    monthlyData: state.data.monthlyData,
});

export default connect(mapStateToProps)(History);
