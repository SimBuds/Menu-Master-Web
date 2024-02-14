import React from 'react';
import './MetricCard.css';

const MetricCard = ({ title, value, trend }) => {
    return (
        <div className="metric-card">
            <h3>{title}</h3>
            <div>
                <span className="value">{value}</span>
                <span className={`trend ${trend > 0 ? 'up' : 'down'}`}>
                    {trend}%
                </span>
            </div>
        </div>
    );
};

export default MetricCard;