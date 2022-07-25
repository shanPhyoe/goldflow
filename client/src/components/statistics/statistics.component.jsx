import React from 'react';
import Graph from '../graph/graph.component';

import './statistics.styles.scss';

const Lifetime = ({ timeFrame, statistics }) => {
    return (
        <div
            className={`statistics ${
                timeFrame === 'Lifetime' ? 'lifetime' : ''
            }`}
        >
            <h3 className="statistics__heading">{timeFrame}</h3>
            {timeFrame === 'Monthly' ? (
                <h4 className="statistics__sub-heading">
                    For {statistics.month},&nbsp;{statistics.year}
                </h4>
            ) : timeFrame === 'Yearly' ? (
                <h4 className="statistics__sub-heading">
                    For {statistics.year}
                </h4>
            ) : null}
            <div className="statistics__content">
                <div className="statistics__chart">
                    <Graph chartData={statistics} />
                </div>
                <div className="statistics__data-list">
                    <p className="statistics__data income">
                        <span className="statistics__name">Total Incomes</span>
                        <span className="statistics__amount">
                            ${statistics.totalIncome}
                        </span>
                    </p>
                    <p className="statistics__data expense">
                        <span className="statistics__name">Total Expenses</span>
                        <span className="statistics__amount">
                            ${statistics.totalExpense}
                        </span>
                    </p>
                    <p className="statistics__data investment">
                        <span className="statistics__name">
                            Total Investments
                        </span>
                        <span className="statistics__amount">
                            ${statistics.totalInvestment}
                        </span>
                    </p>
                    {timeFrame === 'Yearly' ? (
                        <p className="statistics__data">
                            <span className="statistics__name">
                                Most Spent on
                            </span>
                            <span className="statistics__amount">
                                {statistics.mostSpentMonth}
                            </span>
                        </p>
                    ) : null}
                    {timeFrame === 'Lifetime' ? (
                        <>
                            <p className="statistics__data">
                                <span className="statistics__name">
                                    Net Savings
                                </span>
                                <span className="statistics__amount">
                                    {statistics.netSavings < 0
                                        ? `${statistics.netSavings
                                              .toString()
                                              .replace('-', '-$')}`
                                        : `$${statistics.netSavings}`}
                                </span>
                            </p>
                            <p className="statistics__data">
                                <span className="statistics__name">
                                    Most Spent Year
                                </span>
                                <span className="statistics__amount">
                                    {statistics.mostSpentYear}
                                </span>
                            </p>
                            <p className="statistics__data">
                                <span className="statistics__name">
                                    Cost-Income Ratio
                                </span>
                                <span className="statistics__amount">
                                    {statistics.costToIncomeRatio}
                                </span>
                            </p>
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Lifetime;
