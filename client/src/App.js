import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { HomePage } from "./Home";
import { CreatorPage } from "./Creator";
import { SurveyPage } from "./Survey";
import { ExportToPDFPage } from "./Export";
import { AnalyticsPage } from "./Analytics";
import { AnalyticsTabulatorPage } from "./AnalyticsTabulator";
import { AnalyticsDatatablesPage } from "./AnalyticsDatatables";

import "bootstrap/dist/css/bootstrap.css";

export default function SurveyJSReactApplication() {
  return (
    <Router>
      <div>


        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/survey">
            <SurveyPage />
          </Route>
          <Route path="/creator">
            <CreatorPage />
          </Route>
          <Route path="/export">
            <ExportToPDFPage />
          </Route>
          <Route path="/analytics">
            <AnalyticsPage />
          </Route>
          <Route path="/analyticsdatatables">
            <AnalyticsDatatablesPage />
          </Route>
          <Route path="/analyticstabulator">
            <AnalyticsTabulatorPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
