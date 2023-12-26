import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Jobs from "./Jobs";
import SideBar from "../Sidebar/SideBar";

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        setIsLoading(true)
        fetch("jobs.json").then(res => res.json()).then(data => {
            setJobs(data)
            setIsLoading(false)
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

    //calculare the indec range
    const calculatePageRange = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return {startIndex, endIndex}
    }

    //function for the next page
    const nextPage = () => {
        if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1)
        }
    }

    //function for the prev page
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    //main function
    const filterData = (jobs, selected, query) => {
        let filteredJobs = jobs;

        if (query) {
            filteredJobs = filteredItems
        }

        if (selected) {
            filteredJobs = filteredJobs.filter(({ maxPrice, jobLocation, salaryType, experienceLevel, employmentType, postingDate }) => (
                jobLocation.toLowerCase() === selected.toLowerCase() ||
                parseInt(maxPrice) <= parseInt(selected) ||
                salaryType.toLowerCase() === selected.toLowerCase() ||
                employmentType.toLowerCase() === selected.toLowerCase()
            ))
        }

        //slice the data based on current page
        const { startIndex, endIndex } = calculatePageRange();
        filteredJobs = filteredJobs.slice(startIndex, endIndex);

        return filteredJobs.map((data, i) => <Card key={i} data={data} />)
    }

    const result = filterData(jobs, selectedCategory, query);

    return (
        <div>
            <Banner query={query} handleInputChange={handleInputChange}></Banner>
            {/* main content */}
            <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-4 lg:px-24 px-4 py-12">
                {/* left column */}
                <div className="bg-white p-4 rounded">
                    <SideBar handleChange={handleChange} handleClick={handleClick} />
                </div>
                <div className="col-span-2 bg-white p-4 rounded">
                    {
                        isLoading ? (<p className="font-medium">Loading...</p>) : result.length > 0 ? <Jobs result={result} /> : <>
                        <h3 className="text-lg font-bold mb-2">{result.length} Jobs</h3>
                        <p>No Data Found</p>
                        </>
                    }

                    {/* pagination */}
                    {
                        result.length > 0 ? (
                            <div className="flex justify-center mt-4 space-x-8">
                                <button
                                    onClick={prevPage}
                                    disabled={currentPage === 1}
                                    className="hover:underline"
                                >
                                    Previous
                                </button>
                                <span className="mx-8">Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}</span>
                                <button
                                    onClick={nextPage}
                                    disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)}
                                    className="hover:underline"
                                >
                                    Next
                                </button>
                            </div>
                        ) : ""
                    }
                </div>
                {/* right column */}
                <div className="bg-white p-4 rounded">Right</div>
            </div>
        </div>
    )
};

export default Home;
