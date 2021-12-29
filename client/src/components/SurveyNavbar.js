import {Component} from "react";
import {getParams} from "../HelperFunctions";

export default class SurveyNavbar extends Component {
    surveyId = decodeURI(getParams()["id"]);
    surveyName = decodeURI(getParams()["name"]);

    render() {
        return (<div>
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <ul className="nav navbar-nav">
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href={"/survey?id=" + this.surveyId}>View Survey</a>
                        </li>
                        <li>
                            <a href={"/creator?id=" + this.surveyId + "&name=" + this.surveyName}>SurveyJS Creator</a>
                        </li>
                        <li>
                            <a href={"/export?id=" + this.surveyId + "&name=" + this.surveyName}>Export to PDF</a>
                        </li>
                        <li>
                            <a href={"/analytics?id=" + this.surveyId + "&name=" + this.surveyName}>Analytics</a>
                        </li>
                        <li>
                            <a href={"/analyticstabulator?id=" + this.surveyId + "&name=" + this.surveyName}>Results Table</a>
                        </li>
                        <li>
                            <a href={"/analyticsdatatables?id=" + this.surveyId + "&name=" + this.surveyName}>
                                Results Table (IE Support)
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>);
    }
}
