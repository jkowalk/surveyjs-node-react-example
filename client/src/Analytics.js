import React from "react";
import SurveyAnalytics from "./SurveyAnalytics";
import SurveyNavbar from "./components/SurveyNavbar";
import {getParams} from "./HelperFunctions";

export function AnalyticsPage() {
    const surveyName = decodeURI(getParams()["name"]);
  return (
      <div>
          <SurveyNavbar/>
          <div className="page-body">
      <h2>Analytics - {surveyName}</h2>
      <SurveyAnalytics />
          </div>
    </div>
  );
}
