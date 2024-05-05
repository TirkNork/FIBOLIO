import React from "react";
import "./studentForm.css";

const StudentForm = () => {
    return(
        <div className="StudentFormContainer">
            
            <form>
                <div className="NameSurname">
                    <div>
                        <label>Name</label>
                    </div>

                    <div>
                        <label>Surname</label>
                    </div>

                    <div>
                        <input type="text" name="Name" placeHolder="Enter your Name"/>    
                    </div>

                    <div>
                        <input type="text" name="Surname" placeHolder="Enter your Surname"/>    
                    </div>
                </div>

                <div className="StudentID">
                    <label>StudentID</label><br />
                    <input type="number" name="StudentID" placeHolder="Enter your StudentID"/>
                </div>

                <div className="Email">
                    <label>Email</label><br />
                    <input type="email" name="Email" placeHolder="Enter your Email"/>
                </div>

                <div className="Password">
                    <label>Password</label><br />
                    <input type="password" name="Password" placeHolder="Create your Password"/>
                </div>

                <div className="ConfirmPassword">
                    <label>Confirm Password</label><br />
                    <input type="password" placeHolder="Re-Enter your Password"/>
                </div>
            </form>

        </div>
    )
}

export default StudentForm;