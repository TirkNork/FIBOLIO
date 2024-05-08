
import React from "react";
import RoleForm from "./roleForm";
import "./studentForm.css";

export const StudentForm = () => {
    const studentInputs = [
        { name: "Name", label: "Name", type: "text", placeholder: "Enter your Name" },
        { name: "Surname", label: "Surname", type: "text", placeholder: "Enter your Surname" },
        { name: "Email", label: "Email", type: "email", placeholder: "Enter your Email" },
        { name: "StudentID", label: "StudentID", type: "text", placeholder: "Enter your StudentID" },
        { name: "Password", label: "Password", type: "password", placeholder: "Create your Password" },
        { name: "ConfirmPass", label: "Confirm Password", type: "password", placeholder: "Re-Enter your Password" }
    ];
    
    return (
        <RoleForm role="student" inputs={studentInputs} />
    );
};

export const InstructorForm = () => {
    const instructorInputs = [
        { name: "Name", label: "Name", type: "text", placeholder: "Enter your Name" },
        { name: "Surname", label: "Surname", type: "text", placeholder: "Enter your Surname" },
        { name: "Email", label: "Email", type: "email", placeholder: "Enter your Email" },
        { name: "Password", label: "Password", type: "password", placeholder: "Create your Password" },
        { name: "ConfirmPass", label: "Confirm Password", type: "password", placeholder: "Re-Enter your Password" }
    ];
    
    return (
        <RoleForm role="instructor" inputs={instructorInputs} />
    );
};


// import React from "react";
// import "./studentForm.css";

// const StudentForm = () => {
//     return(
//         <div className="StudentFormContainer">
            
//             <form><br />
//                 <div className="NameSurname">
//                     <div>
//                         <label>Name</label>
//                     </div>

//                     <div>
//                         <label>Surname</label>
//                     </div>

//                     <div>
//                         <input className="Name" type="text" name="Name" placeHolder="Enter your Name"/>    
//                     </div>

//                     <div>
//                         <input className="Surname" type="text" name="Surname" placeHolder="Enter your Surname"/>    
//                     </div>
//                 </div>

//                 <div className="Email">
//                     <label>Email</label>
//                     <input className="Email" type="email" name="Email" placeHolder="Enter your Email"/>
//                 </div>

//                 <div className="StudentID">
//                     <label>StudentID</label>
//                     <input className="StudentID" type="text" name="StudentID" placeHolder="Enter your StudentID"/>
//                 </div>

//                 <div className="Password">
//                     <label>Password</label>
//                     <input className="Password" type="password" name="Password" placeHolder="Create your Password"/>
//                 </div>

//                 <div className="ConfirmPassword">
//                     <label>Confirm Password</label>
//                     <input className="ConfirmPass" type="password" placeHolder="Re-Enter your Password"/>
//                 </div>
//             </form>

//         </div>
//     )
// }

// export default StudentForm;