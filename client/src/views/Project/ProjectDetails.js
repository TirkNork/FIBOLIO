import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import Cross from "../../assets/images/cancel.png";
import Button from "../../components/Button/Button.js";

const serverIP = 'http://localhost:3001'

function ProjectDetails() {
    const {id} = useParams();
    const [student_id, setStudent_id] = useState("63340500001");

    const [project, setProject] = useState([]);
    const navigate = useNavigate();
    const [projectList, setProjectList] = useState([]);
    // const [imageSrc, setImageSrc] = useState('');
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [projectIdToDelete, setProjectIdToDelete] = useState(null);


    const handleBackClick = () => {
        navigate("/Project");
    };

    const goToProjectEdit = (id) => {
        navigate(`/Project/Edit/${id}`);
    };

    const handleDeleteClick = (id) => {
        setProjectIdToDelete(id);
        setShowDeleteConfirmation(true);
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirmation(false);
    };

    const handleConfirmDelete = (id) => {
        setShowDeleteConfirmation(false);
        Axios.delete(`${serverIP}/delProject/${id}`).then((response) => {
            navigate("/Project");
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
        const url = `${serverIP}/projects?student_id=${student_id}`;
        Axios.get(url)
            .then((response) => {
                setProjectList(response.data);
            })
            .catch((error) => {
                console.error("Error fetching the project list:", error);
            });
    };
    
    useEffect(() => {
        getProject();
        // getImg();
    }, [id]);
    
    const getProject = () => {
        Axios.get(`${serverIP}/projects/${id}`).then((response) => {
            setProject(response.data);
        });
    };

    // const getImg = () => {
    //     const id = 1
    //     const name = '1716119732890_programmer.jpg'
    //     Axios.get(`http://localhost:3001/images/${id}/${name}`).then((response) => {
    //         console.log(response)
    //         const blob = new Blob([response.data], { type: 'image/jpeg' });
    //         console.log(blob);
    //         const imageUrl = URL.createObjectURL(blob);
    //         console.log(imageUrl)
    //         setImageSrc(imageUrl);
    //     })
    //     .catch((error) => {
    //         console.error('Error fetching image:', error);
    //     });
// };
    
    return (
        <div className="backdetail">
            <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'></link>
            <div className="header">
            <h1>Detail</h1>
                <br />
                <ul className='breadcrumb'>
                    <li className='breadcrumb-list'>
                        <a className='home' href='/Project'>Project</a>
                    </li>
                    <li className='breadcrumb-list'>
                        <p className='current-page'> <b>Project Details</b> </p>
                    </li>
                </ul>
            </div>
            <div className="project-edit-box-detail">
                <img src={Cross} className="cross1" onClick={handleBackClick}/>
                {project.map((val, key) => (
                    <div key={key}>
                        <p className="detail"><b>Project : </b>{val.project_name}</p>
                        <p className="detail"><b>Year : </b>{val.project_year}</p>
                        <p className="detail"><b>Course : </b>{val.course_id}</p>
                        <p className="detail"><b>Description : </b>{val.description}</p>
                        {/* {imageSrc && (
                        <div className="preview">
                            <img src={imageSrc} />
                        </div>
                        )} */}
                        <div className="preview">
                            <img src={val.img_path} />
                        </div>
                        <div className="buttondetail">
                        <Button label="Edit" onClick={() => goToProjectEdit(val.project_id)}/>
                        <Button label="Delete" onClick={() => handleDeleteClick(val.project_id, val.student_id, val.img_path)}/>
                        </div>
                    </div>
                ))}
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

export default ProjectDetails;