import React, { Component } from "react";

class WidecardProject extends Component{
    render() {
        return(
            <div className="widecard">
                <div className="wide-con">
                    <h3>Year : {this.props.year}</h3>
                    <h4 className="secondtext">Project : {this.props.project}</h4>
                    <h4 className="secondtext">Subject : {this.props.subject}</h4>
                    <h4 className="secondtext">Description :  {this.props.des}</h4>
                </div>
            </div>

        );
    }
}
export default WidecardProject;