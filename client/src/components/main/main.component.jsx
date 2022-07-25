import React from 'react';
import { connect } from 'react-redux';

import History from '../history/history.component';

import Statistics from '../statistics/statistics.component';
import TransactionPopup from '../transaction-popup/transaction-popup.component';

import './main.styles.scss';

const Main = ({ lifetimeStatistics, monthlyStatistics, yearlyStatistics }) => {
    return (
        <main className="main">
            <Statistics
                timeFrame={'Lifetime'}
                statistics={lifetimeStatistics}
            />
            <Statistics timeFrame={'Yearly'} statistics={yearlyStatistics} />
            <Statistics timeFrame={'Monthly'} statistics={monthlyStatistics} />
            <History />
            <TransactionPopup />
        </main>
    );
};

const mapStateToProps = state => ({
    lifetimeStatistics: state.data.lifetimeStatistics,
    monthlyStatistics: state.data.monthlyStatistics,
    yearlyStatistics: state.data.yearlyStatistics,
});

export default connect(mapStateToProps, null)(Main);
