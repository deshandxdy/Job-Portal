import React from "react";
import { FiMapPin, FiClock, FiDollarSign, FiCalendar } from "react-icons/fi";
import { Link } from "react-router-dom";

const Cards = ({ data }) => {
    const {
        companyName,
        companyLogo,
        minPrice,
        maxPrice,
        jobTitle,
        jobLocation,
        employmentType,
        postingDate,
        description,
    } = data;

    return (
        <section className="card">
            <Link
                to={"/"}
                className="flex gap-4 flex-col sm:flex-row items-start"
            >
                <img src={companyLogo} alt="" />
                <div>
                    <h4 className="text-primary mb-1">{companyName}</h4>
                    <h3 className="text-1g font-semibold mb-2">{jobTitle}</h3>
                    <div className="text-primary/70 text-base flex flex-wrap gap-2 mb-2">
                        <span className="flex items-center gap-2">
                            <FiMapPin /> (jobLocation)
                        </span>
                        <span className="flex items-center gap-2">
                            <FiClock /> {employmentType}
                        </span>
                        <span className="flex items-center gap-2">
                            <FiDollarSign /> {minPrice}-{maxPrice}k
                        </span>{" "}
                        <span className="flex items-center gap-2">
                            <FiCalendar /> {postingDate}
                        </span>
                    </div>
                    <p className="text-base text-primary"> {description}</p>
                </div>
            </Link>
        </section>
    );
};

export default Cards;
