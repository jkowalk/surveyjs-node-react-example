import React, {useState} from "react";
import * as Survey from "survey-react";
import * as widgets from "surveyjs-widgets";
import "survey-react/survey.css";

import "survey-react/modern.css";
import "./Survey.css";

import "jquery-ui/themes/base/all.css";
import "nouislider/distribute/nouislider.css";
import "select2/dist/css/select2.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";

import "jquery-bar-rating/dist/themes/css-stars.css";

import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker.js";
import "select2/dist/js/select2.js";
import "jquery-bar-rating";

import "pretty-checkbox/dist/pretty-checkbox.css";

import { json } from "./survey_json.js";
import {getParams} from "./HelperFunctions";

//import "icheck/skins/square/blue.css";
window["$"] = window["jQuery"] = $;
//require("icheck");

export { MyQuestion } from "./MyQuestion";

/*
// Set colors
var defaultThemeColors = Survey
    .StylesManager
    .ThemeColors["modern"];

defaultThemeColors["$main-color"] = "rgb(129,0,0)"; //purple- the theme's underlines and button'
defaultThemeColors["$main-hover-color"] = ;
defaultThemeColors["$text-color"] = ; //questions text
defaultThemeColors["$header-color"] = ; //survey header
defaultThemeColors["$header-background-color"] = ;
defaultThemeColors["$body-container-background-color"] = ;
defaultThemeColors["$progress-buttons-color"] = ;
defaultThemeColors["$answer-background-color"] = ;
defaultThemeColors["$inputs-background-color"] = ;
 */

const customCss = {
    "title": "custom-title", // Survey Title
    "description": "custom-description", // Survey Description
};


Survey
    .StylesManager
    .applyTheme("modern");



//widgets.icheck(Survey, $);
widgets.prettycheckbox(Survey);
widgets.select2(Survey, $);
widgets.inputmask(Survey);
widgets.jquerybarrating(Survey, $);
widgets.jqueryuidatepicker(Survey, $);
widgets.nouislider(Survey);
widgets.select2tagbox(Survey, $);
//widgets.signaturepad(Survey);
widgets.sortablejs(Survey);
widgets.ckeditor(Survey);
widgets.autocomplete(Survey, $);
widgets.bootstrapslider(Survey);

function onValueChanged(result) {
    console.log("value changed!");
}

function onComplete(result) {
    console.log(result);
    console.log(result.valuesHash);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({postId:  decodeURI(getParams()["id"]), surveyResult: result.valuesHash})
    };
    fetch('/post', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));
}


export function SurveyPage() {
    Survey.dxSurveyService.serviceUrl = "localhost:3001";

    var surveyId = decodeURI(getParams()["id"]);
    const [model, setModel] = useState(new Survey.Model({}));
    const [loaded, setLoaded] = useState(false);

    if (!loaded) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "/getSurvey?surveyId=" + surveyId);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = () => {
            setModel(new Survey.Model(xhr.response));
            setLoaded(true);
        }
        xhr.send();
    }

    return (
    <div className="container">
            <Survey.Survey
                model={model}
                onComplete={onComplete}
                onValueChanged={onValueChanged}
                css={customCss}
            />
    </div>
    );
  }
  