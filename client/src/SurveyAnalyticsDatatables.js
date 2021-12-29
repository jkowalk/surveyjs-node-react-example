import React, { Component } from "react";
import { data, json } from "./analytics_data";
import { DataTables } from "survey-analytics/survey.analytics.datatables.js";
import * as Survey from "survey-react";
import $ from "jquery";
import "datatables.net/js/jquery.dataTables.js";
import "datatables.net-dt/js/dataTables.dataTables.js";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.print.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-colreorder/js/dataTables.colReorder.js";
import "datatables.net-rowgroup/js/dataTables.rowGroup.js";
import "datatables.net-colreorder-dt/css/colReorder.dataTables.css";
import "survey-analytics/survey.analytics.datatables.css";
import {getParams} from "./HelperFunctions";
import {VisualizationPanel} from "survey-analytics";

export default class SurveyAnalyticsDatatables extends Component {
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
        DataTables.initJQuery($);
        const data = new DataTables(survey, JSON.parse(xhr2.response));
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
