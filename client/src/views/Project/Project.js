import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import WidecardProject from "../../components/WidecardProject";
import "./Project.css";
import Dot from "../../image/icons8-more-53.png"

const mockData = [
    {
        id: 1,
        year: 2020,
        project: "NUDA",
        course: "FRA000",
        des: "An adjustable automatic massage pillow that is portable and works with all body types.",
    },
    {
        id: 2,
        year: 2021,
        project: "NUDA",
        course: "FRA000",
        des: "An adjustable automatic massage pillow that is portable and works with all body types.",
    }
];

function Project() {
    const navigate = useNavigate();
    const [projectList, setProjectList] = useState([]);
    const [showDropdown, setShowDropdown] = useState([]);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [projectIdToDelete, setProjectIdToDelete] = useState(null);

    const goToProjectDetail = (id) => {
        navigate(`/Project/${id}`);
    };

    const handleInsertClick = () => {
        navigate("/ProjectInsert");
    };

    const goToProjectEdit = (id) => {
        navigate(`/Project/Edit/${id}`);
    };

    useEffect(() => {
        setShowDropdown(Array(mockData.length).fill(false));
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.dot-icon-container')) {
                setShowDropdown(Array(mockData.length).fill(false));
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleDeleteClick = (id) => {
        setProjectIdToDelete(id);
        setShowDeleteConfirmation(true);
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirmation(false);
    };

    const handleConfirmDelete = (id) => {
        setShowDeleteConfirmation(false);
        Axios.delete(`http://localhost:3001/delProject/${id}`).then((response) => {
            setProjectList(
                projectList.filter((val) => {
                    return val.project_id !== id;
                })
            );
        });

    };
    
    useEffect(() => {
      getProjectList();
    }, []);

    const getProjectList = () => {
      Axios.get("http://localhost:3001/projects").then((response) => {
        setProjectList(response.data);
      });
    };

    return (
        <div>
            <div className="header">
                <h1>Project</h1>
                <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'></link>
            </div>
            <div className="other-page">
                <div className="data-table">
                    <div className="row">
                        {/* {mockData.map((val, key) => (
                            <div className="project-container">
                                <div className="project-details" onClick={() => goToProjectDetail(val.id)}>
                                    <WidecardProject
                                        year={val.year}
                                        project={val.project}
                                        course={val.course}
                                        des={val.des}
                                    />
                                </div>
                                <div className="dot-icon-container">
                                    <img src={Dot} alt="More Options" className="dot-icon" onClick={() => {
                                        const updatedDropdownStatus = [...showDropdown];
                                        updatedDropdownStatus[key] = !showDropdown[key];
                                        setShowDropdown(updatedDropdownStatus);
                                    }} />
                                    <div className={`more-options ${showDropdown[key] ? 'show' : ''}`}>
                                        <div className="dropdown">
                                            <button onClick={() => goToProjectEdit(val.id)}>Edit</button>
                                            <button onClick={() => handleDeleteClick(val.id)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))} */}
                        {projectList.map((val, key) => (
                            <div key = {key} className="project-container">
                            <div className="project-details" onClick={() => goToProjectDetail(val.project_id)}>
                                <WidecardProject
                                    project={val.project_name}
                                    year={val.project_year}
                                    course={val.course_id}
                                    des={val.description}
                                />
                            </div>
                            <div className="dot-icon-container">
                                <img src={Dot} alt="More Options" className="dot-icon" onClick={() => {
                                    const updatedDropdownStatus = [...showDropdown];
                                    updatedDropdownStatus[key] = !showDropdown[key];
                                    setShowDropdown(updatedDropdownStatus);
                                }} />
                                <div className={`more-options ${showDropdown[key] ? 'show' : ''}`}>
                                    <div className="dropdown">
                                        <button onClick={() => goToProjectEdit(val.project_id)}>Edit</button>
                                        <button onClick={() => handleDeleteClick(val.project_id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "right", marginBottom: "20px", marginRight: "20px" }}>
                    <button className="button-orange" onClick={handleInsertClick}>Insert</button>
                </div>
            </div>

            {showDeleteConfirmation && (
                <div className="popup">
                    <p>Are you sure you want to delete this project?</p>
                    <div>
                        <button className="buttondelete" onClick={() => handleConfirmDelete(projectIdToDelete)}>Confirm</button>
                        <button className="buttoncancel" onClick={handleCancelDelete}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Project;