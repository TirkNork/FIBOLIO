import React from "react";
import "./studentForm.css";

const RoleForm = ({ role, inputs, onChange }) => {
    const hasNameSurnameInputs = inputs.some(input => input.name === "Name" || input.name === "Surname");

    return (
        <div className={`${role}FormContainer`}>
            <form><br />
                {hasNameSurnameInputs && (
                    <div className="NameSurname">
                        {inputs.filter(input => input.name === "Name" || input.name === "Surname").map(input => (
                            <div key={input.name}>
                                <label className="inputLabel">{input.label}</label>
                                <input
                                    className={input.name}
                                    type={input.type}
                                    name={input.name}
                                    placeholder={input.placeholder}
                                    style={input.error ? { border: '1px solid red' } : {}}
                                    onChange={onChange}
                                />
                                {input.error && <span className="errorText">{input.error}</span>}
                            </div>
                        ))}
                    </div>
                )}
                {inputs.map(input => (
                    !hasNameSurnameInputs || (hasNameSurnameInputs && input.name !== "Name" && input.name !== "Surname")) && (
                        <div key={input.name}>
                            <label className="inputLabel">{input.label}</label>
                            <input
                                className={input.name}
                                type={input.type}
                                name={input.name}
                                placeholder= {input.placeholder}
                                style={input.error ? { border: '1px solid red' } : {}}
                                onChange={onChange}
                            />
                            {input.error && <span className="errorText">{input.error}</span>}
                            
                        </div>
                    )
                )}
            </form><br />
        </div>
    );
};

export default RoleForm;
