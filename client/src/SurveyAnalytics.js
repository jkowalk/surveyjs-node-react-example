import React, {Component, useState} from "react";
import { data, json } from "./analytics_data";
import { VisualizationPanel } from "survey-analytics";
import "survey-analytics/survey.analytics.css";
import * as Survey from "survey-react";
import {getParams} from "./HelperFunctions";

export default class SurveyAnalytics extends Component {


  visPanel;
  componentDidMount() {
    const surveyId = decodeURI(getParams()["id"]);
    const surveyName = decodeURI(getParams()["name"]);

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
        const data = new VisualizationPanel(survey.getAllQuestions(), JSON.parse(xhr2.response));
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
