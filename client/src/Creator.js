import React from "react";
import SurveyCreator from "./SurveyCreator";
import SurveyNavbar from "./components/SurveyNavbar";

export function CreatorPage() {
    return (
        <div>
            <SurveyNavbar/>
            <div className="page-body">
        <SurveyCreator />
            </div>
      </div>
    );
  }
  