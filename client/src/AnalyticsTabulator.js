import React from "react";
import SurveyAnalyticsTabulator from "./SurveyAnalyticsTabulator";
import {getParams} from "./HelperFunctions";
import SurveyNavbar from "./components/SurveyNavbar";

export function AnalyticsTabulatorPage() {
    const surveyName = decodeURI(getParams()["name"]);
  return (
    <div>
        <SurveyNavbar/>
        <div className="page-body">
      <h2>Results Table - {surveyName}</h2>
      <span>Uses Tabulator. Supports modern browsers.</span>
      <SurveyAnalyticsTabulator />
        </div>
    </div>
  );
}
