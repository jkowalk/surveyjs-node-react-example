import React from "react";
import SurveyAnalyticsDatatables from "./SurveyAnalyticsDatatables";
import {getParams} from "./HelperFunctions";
import SurveyNavbar from "./components/SurveyNavbar";

export function AnalyticsDatatablesPage() {
    const surveyName = decodeURI(getParams()["name"]);
  return (
      <div>
          <SurveyNavbar/>
          <div className="page-body">
      <h2>Results Table - {surveyName}</h2>
      <span>Uses DataTables. Browsers compatibility: IE10+ </span>
      <SurveyAnalyticsDatatables />
          </div>
    </div>
  );
}
