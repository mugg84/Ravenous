import React, { useContext } from "react";
import RavContext from "../../context/rav/ravContext";
import "./BusinessList.css";

import Business from "../Business/Business";

const BusinessList = () => {
  const ravContext = useContext(RavContext);

  const {businesses} = ravContext

  return (
    <div className="BusinessList">
      {businesses.map((business) => {
        return <Business business={business} key={business.id} />;
      })}
    </div>
  );
};

export default BusinessList;
