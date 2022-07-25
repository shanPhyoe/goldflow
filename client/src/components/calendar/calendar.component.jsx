import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Calendar as ReactCalendar } from 'react-calendar';

import {
    getMonthlyData,
    getMonthlyStatistics,
    getYearlyStatistics,
} from '../../redux/data/data.action';

import { getMonthAndYear } from '../../utils/date';

import './calendar.styles.css';

const Calendar = ({
    getMonthlyData,
    getMonthlyStatistics,
    getYearlyStatistics,
}) => {
    const [yearForStatistics, setYearForStatistics] = useState(
        new Date(Date.now()).getFullYear()
    );

    const handleViewChange = ({ action, activeStartDate, value, view }) => {
        const [month, year] = getMonthAndYear(activeStartDate);

        if (yearForStatistics !== year) {
            setYearForStatistics(year);
            getYearlyStatistics(year);
            getMonthlyData({ month, year });
            getMonthlyStatistics({ month, year });

            return;
        }

        getMonthlyData({ month, year });
        getMonthlyStatistics({ month, year });
    };

    return (
        <>
            <ReactCalendar
                calendarType="US"
                next2Label={null}
                prev2Label={null}
                onActiveStartDateChange={handleViewChange}
            />
        </>
    );
};

const mapDispatchToProps = dispatch => ({
    getMonthlyData: monthAndYear => dispatch(getMonthlyData(monthAndYear)),
    getMonthlyStatistics: monthAndYear =>
        dispatch(getMonthlyStatistics(monthAndYear)),
    getYearlyStatistics: year => dispatch(getYearlyStatistics(year)),
});

export default connect(null, mapDispatchToProps)(Calendar);
