import React from 'react';
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
    monthOnHistory,
    yearOnHistory,
}) => {
    const handleClickDay = (value, event) => {
        const [month, year] = getMonthAndYear(value);

        if (month === monthOnHistory && year === yearOnHistory) return;

        if (year !== yearOnHistory) {
            getYearlyStatistics(year);
            getMonthlyData({ month, year });
            getMonthlyStatistics({ month, year });

            return;
        }
        if (month !== monthOnHistory) {
            getMonthlyData({ month, year });
            getMonthlyStatistics({ month, year });
        }
    };

    return (
        <>
            <ReactCalendar
                calendarType="US"
                next2Label={null}
                prev2Label={null}
                onClickDay={handleClickDay}
                // onActiveStartDateChange={handleViewChange}
            />
        </>
    );
};

const mapStateToProps = state => ({
    monthOnHistory: state.data.monthlyData.month,
    yearOnHistory: state.data.monthlyData.year,
});

const mapDispatchToProps = dispatch => ({
    getMonthlyData: monthAndYear => dispatch(getMonthlyData(monthAndYear)),
    getMonthlyStatistics: monthAndYear =>
        dispatch(getMonthlyStatistics(monthAndYear)),
    getYearlyStatistics: year => dispatch(getYearlyStatistics(year)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
