import React from "react";
import "./TrendCard.css";
import { trendingData } from "../../Data/trendingData";


const TrendCard = () => {

  
  return (
    <div className="TrendCard">
      <h3>Trends for your</h3>

      {trendingData.map((el, id) => {
        return (
          <div className="trend" key={Date.now()+el.name}>
            <span>#{el.name}</span>
            <span>{el.shares}k shares</span>
          </div>
        );
      })}
    </div>
  );
};

export default TrendCard;
