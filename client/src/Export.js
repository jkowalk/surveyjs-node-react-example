import React, {useState} from "react";

import $ from "jquery";

import * as SurveyCore from "survey-core";
import * as widgets from "surveyjs-widgets";
import * as SurveyPDF from "survey-pdf";

import { json } from "./survey_json.js";
import {getParams} from "./HelperFunctions";
import * as Survey from "survey-react";
import SurveyNavbar from "./components/SurveyNavbar";

//widgets.icheck(SurveyCore, $);
widgets.prettycheckbox(SurveyCore);
widgets.select2(SurveyCore, $);
widgets.inputmask(SurveyCore);
widgets.jquerybarrating(SurveyCore, $);
widgets.jqueryuidatepicker(SurveyCore, $);
widgets.nouislider(SurveyCore);
widgets.select2tagbox(SurveyCore, $);
//widgets.signaturepad(SurveyCore);
widgets.sortablejs(SurveyCore);
widgets.ckeditor(SurveyCore);
widgets.autocomplete(SurveyCore, $);
widgets.bootstrapslider(SurveyCore);


export function ExportToPDFPage() {
    const surveyId = decodeURI(getParams()["id"]);
    const surveyName = decodeURI(getParams()["name"]);
    const [model, setModel] = useState({});
    const [loaded, setLoaded] = useState(false);

    if (!loaded) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "/getSurvey?surveyId=" + surveyId);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = () => {
            setModel(xhr.response);
            setLoaded(true);
        }
        xhr.send();
    }

    let savePDF = () => {
        console.log(model);
        let surveyPDF = new SurveyPDF.SurveyPDF(model);
        surveyPDF.data = model.data;
        surveyPDF.save();
    }

    return (
        <div>
            <SurveyNavbar/>
            <div className="page-body">
      <div className="container">
        <div className="jumbotron">
          <h2>Export {surveyName}</h2>
          <p>
            The SurveyJS PDF Export library allows you to render SurveyJS Library surveys to PDF in
            a browser which can be later emailed or printed.
          </p>
          <p>Click the button below to get a PDF document.</p>
        </div>
        <div>
            <button onClick={savePDF}>Save PDF</button>
        </div>
      </div>
            </div>
        </div>
    );
  }
  