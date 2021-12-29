import React, { Component } from "react";
import { data, json } from "./analytics_data";

import * as jsPDF from "jspdf";
import * as XLSX from "xlsx";
import "jspdf-autotable";



import { Tabulator } from "survey-analytics/survey.analytics.tabulator.js";
import * as Survey from "survey-react";
import "survey-analytics/survey.analytics.tabulator.css";
import "tabulator-tables/dist/css/tabulator.min.css";
import {getParams} from "./HelperFunctions";
import {VisualizationPanel} from "survey-analytics";


window.jsPDF = jsPDF;
window.XLSX = XLSX;

export default class SurveyAnalyticsTabulator extends Component {

  visPanel;
  componentDidMount() {
    var surveyId = decodeURI(getParams()["id"]);

    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/getSurvey?surveyId=" + surveyId);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = () => {
      const survey = new Survey.Model(JSON.parse(xhr.response));
      let xhr2 = new XMLHttpRequest();
      xhr2.open("GET", "/results?postId=" + surveyId);
      xhr2.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr2.setRequestHeader('Access-Control-Allow-Origin', '*');
      xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr2.onload = () => {
        console.log(xhr2.response);
        console.log(survey.getAllQuestions());
        const data = new Tabulator(survey, JSON.parse(xhr2.response));
        data.render(document.getElementById("summaryContainer"));
      }
      xhr2.send();
    }
    xhr.send();
  }
  render() {
    return <div id="summaryContainer"></div>;
  }
}
