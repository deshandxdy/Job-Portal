import React from "react";
import Locations from "./Locations";
import Salary from "./Salary";

const SideBar = ({ handleChange, handleClick }) => {
    return (
        <div className="space-y-5">
            <h3 className="text-lg font-bold mb-2">Filters</h3>
            <Locations handleChange={handleChange} />
            <Salary handleChange={handleChange} handleClick={handleClick} />
        </div>
    );
};

export default SideBar;
