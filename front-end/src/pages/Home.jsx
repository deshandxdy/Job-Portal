import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Jobs from "./Jobs";

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        fetch("jobs.json").then(res => res.json()).then(data => {
            setJobs(data)
        })
    }, [])

    const handleInputChange = (event) => {
        setQuery(event.target.value)
    }

    //filter jobs by title
    const filteredItems = jobs.filter((job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1)

    //filter radio location
    const handleChange = (event) => {
        setSelectedCategory(event.target.value)
    }

    //filter button type
    const handleClick = (event) => {
        setSelectedCategory(event.target.value)
    }

    //main function
    const filterData = (jobs, selected, query) => {
        let filteredJobs = jobs;
        if (query) {
            filteredJobs = filteredItems
        }

        if (selected) {
            filteredJobs = filteredJobs.filter(({ maxPrice, jobLocation, salaryType, experienceLevel, employmentType, postingDate}) => {
                jobLocation.toLowerCase() === selected.toLowerCase() ||
                parseInt(maxPrice) === parseInt(selected) ||
                salaryType.toLowerCase() === salaryType.toLowerCase() ||
                employmentType.toLowerCase() === employmentType.toLowerCase()
            })
        }

        return filteredJobs.map((data, i) => <Card key={i} data={data} />)
    }

    const result = filterData(jobs, selectedCategory, query);

    return (
        <div>
            <Banner query={query} handleInputChange={handleInputChange}></Banner>
            {/* main content */}
            <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-4 lg:px-24 px-4 py-12">
                <div className="bg-white p-4 rounded">Left</div>
                <div className="col-span-2 bg-white p-4 rounded"><Jobs result={result} /></div>
                <div className="bg-white p-4 rounded">Right</div>
            </div>
        </div>
    )
};

export default Home;
