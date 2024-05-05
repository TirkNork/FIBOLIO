import React, { useState } from "react";
import "./Project.css";

function ProjectInsert() {
    const [year, setYear] = useState("");
    const [project, setProject] = useState("");
    const [course, setCourse] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    const handleProjectChange = (event) => {
        setProject(event.target.value);
    };

    const handleCourseChange = (event) => {
        setCourse(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    // const handleImageChange = (event) => {
    //     const files = event.target.files;
    //     const fileNames = Array.from(files).map(file => file.name);
    //     setImages(fileNames);
    // };

    return (
        <div className="config">
            <div className="header">
                <h1>Insert Project</h1>
            </div>
            <div className="form-container">
                <div className="container">
                    <div className="input-container">
                        <h3>Year</h3>
                        <input
                            type="text"
                            value={year}
                            onChange={handleYearChange}
                            placeholder="Enter year of project"
                        />

                        <h3>Project</h3>
                        <input
                            type="text"
                            value={project}
                            onChange={handleProjectChange}
                            placeholder="Enter project name"
                        />

                        <h3>Course</h3>
                        <input
                            type="text"
                            value={course}
                            onChange={handleCourseChange}
                            placeholder="Enter course"
                        />
                    </div>
                    <div className="input-description">
                        <h3>Description</h3>
                        <input
                            type="text"
                            value={description}
                            onChange={handleDescriptionChange}
                            placeholder="Enter project description"
                        />
                    </div>
                    <form>
                        <div className="mb-3">
                            <input
                                type="file"
                                className="form-control"
                                // multiple
                                // onChange={handleImageChange}
                            />
                        </div>
                        {/* <div>
                            {images.map((image, index) => (
                                <div key={index}>{image}</div>
                            ))}
                        </div> */}
                        <button className="button" >
                            Upload
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ProjectInsert;
