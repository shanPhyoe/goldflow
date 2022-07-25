import React from 'react';
import { Chart, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import './graph.styles.scss';

Chart.register(ArcElement);

const Graph = ({ chartData }) => {
    let { totalExpense, totalInvestment, totalIncome } = chartData;

    const shadowConfig = {
        data: {
            datasets: [
                {
                    data: [1],
                    hoverOffset: 4,
                    offset: 4,
                    borderRadius: 15,
                    borderColor: '#212329',
                    borderWidth: 1,
                },
            ],
        },
        options: {
            cutout: 65,
            layout: {
                padding: 5,
            },
        },
    };

    const config = {
        data: {
            datasets: [
                {
                    data: [totalExpense, totalInvestment, totalIncome],
                    // data: [30, 50, 200],
                    backgroundColor: ['#ff4772', '#749eff', '#43c7ae'],
                    hoverOffset: 4,
                    offset: 4,
                    borderRadius: 15,
                    borderColor: '#212329',
                    hoverBorderColor: '#ced1db',
                },
            ],
        },
        options: {
            animation: true,
            animationEasing: 'easeOutElastic',
            animationDuration: 3000,
            cutout: 65,
            layout: {
                padding: 5,
            },
        },
    };

    const net = totalIncome - totalExpense - totalInvestment;

    return (
        <div className="graph">
            {totalIncome > 0 || totalExpense > 0 || totalIncome > 0 ? null : (
                <Doughnut {...shadowConfig} className="graph__shadow" />
            )}
            <Doughnut {...config} />
            <div className="graph__net">
                <span>Net</span>
                <span
                    className={`graph__value ${
                        net >= 0 ? 'graph__value--green' : 'graph__value--red'
                    }`}
                >
                    {net < 0 ? `-$${Math.abs(net)}` : `$${net}`}
                </span>
            </div>
        </div>
    );
};

export default Graph;
