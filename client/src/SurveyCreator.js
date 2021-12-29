import React, {Component} from "react";
import * as Survey from "survey-react";
import * as SurveyKo from "survey-knockout";
import * as SurveyJSCreator from "survey-creator";
import "survey-creator/survey-creator.css";

import "jquery-ui/themes/base/all.css";
import "nouislider/distribute/nouislider.css";
import "select2/dist/css/select2.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";

import "jquery-bar-rating/dist/themes/css-stars.css";
import "jquery-bar-rating/dist/themes/fontawesome-stars.css";

import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker.js";
import "select2/dist/js/select2.js";
import "jquery-bar-rating";

//import "icheck/skins/square/blue.css";
import "pretty-checkbox/dist/pretty-checkbox.css";

import * as widgets from "surveyjs-widgets";
import {getParams} from "./HelperFunctions";


//widgets.icheck(SurveyKo, $);
widgets.prettycheckbox(SurveyKo);
widgets.select2(SurveyKo, $);
widgets.inputmask(SurveyKo);
widgets.jquerybarrating(SurveyKo, $);
widgets.jqueryuidatepicker(SurveyKo, $);
widgets.nouislider(SurveyKo);
widgets.select2tagbox(SurveyKo, $);
//widgets.signaturepad(SurveyKo);
widgets.sortablejs(SurveyKo);
widgets.ckeditor(SurveyKo);
widgets.autocomplete(SurveyKo, $);
widgets.bootstrapslider(SurveyKo);


var surveyId;
var surveyName;

function setSurveyName(name) {
  var $titleTitle = jQuery("#sjs_survey_creator_title_show");
  $titleTitle.find("span:first-child").text(name);
}
function startEdit() {
  var $titleSurveyCreator = jQuery("#sjs_survey_creator_title_edit");
  var $titleTitle = jQuery("#sjs_survey_creator_title_show");
  $titleTitle.hide();
  $titleSurveyCreator.show();
  $titleSurveyCreator.find("input")[0].value = surveyName;
  $titleSurveyCreator.find("input").focus();
}
function cancelEdit() {
  var $titleSurveyCreator = jQuery("#sjs_survey_creator_title_edit");
  var $titleTitle = jQuery("#sjs_survey_creator_title_show");
  $titleSurveyCreator.hide();
  $titleTitle.show();
}
function postEdit() {
  cancelEdit();
  var oldName = surveyName;
  var $titleSurveyCreator = jQuery("#sjs_survey_creator_title_edit");
  surveyName = $titleSurveyCreator.find("input")[0].value;
  setSurveyName(surveyName);
  jQuery
      .get("/changeName?id=" + surveyId + "&name=" + surveyName, (data) => {

      })
      .fail((error) => {
        surveyName = oldName;
        setSurveyName(surveyName);
        alert(JSON.stringify(error));
      });
}

class SurveyCreator extends Component {


  surveyCreator;
  componentDidMount() {
    Survey.dxSurveyService.serviceUrl = "localhost:3001";
    var accessKey = "";

    let options = { showEmbededSurveyTab: true, alwaySaveTextInPropertyEditors: true };
    this.surveyCreator = new SurveyJSCreator.SurveyCreator(
        null,
        options
    );
    surveyId = decodeURI(getParams()["id"]);
    surveyName = decodeURI(getParams()["name"]);
    setSurveyName(surveyName);
    this.surveyCreator.serviceUrl = "";

    let xhr = new XMLHttpRequest();
    xhr.open("GET",  "/getSurvey?surveyId=" + surveyId);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload =  () => {
      this.surveyCreator.text = xhr.response;
    }
    xhr.send();

    //this.surveyCreator.loadSurvey(surveyId);
    this.surveyCreator.saveSurveyFunc = (saveNo, callback) => {
      let xhr = new XMLHttpRequest();
      xhr.open(
          "POST",
          "/changeJson?accessKey=" + accessKey
      );
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.onload = function() {
        var result = xhr.response ? xhr.response : null;
        if (xhr.status === 200) {
          callback(saveNo, true);
        }
      };
      xhr.send(
          JSON.stringify({
            Id: surveyId,
            Json: this.surveyCreator.text,
            Text: this.surveyCreator.text
          })
      );
    };

    this.surveyCreator.isAutoSave = true;
    this.surveyCreator.showState = true;
    this.surveyCreator.showOptions = true;


    this.surveyCreator.tabs().push({
      name: "survey-templates",
      title: "My Custom Tab",
      template: "custom-tab-survey-templates",
      action: () => {
          this.surveyCreator.makeNewViewActive("survey-templates");
      },
      data: {},
    });
    this.surveyCreator.render("surveyCreatorContainer");
  }
  render() {
    return (<div>
      <div className="sv_header"
           style={{margin: "2rem"}}
      >
        <h3>
            <span
                id="sjs_survey_creator_title_edit"
                className="editor_title_edit"
                style={{display: "none"}}
            >
              <input
                  style={{borderTop: "none", borderLeft: "none", borderRight: "none", outline: "none"}}
              />
              <span
                  className="btn btn-success"
                  onClick={postEdit}
                  style={{borderRadius: "2px", marginTop: "-8px", backgroundColor: "#1ab394", borderColor: "#1ab394",}}
              >Update</span
              >
              <span
                  className="btn btn-warning"
                  onClick={cancelEdit}
                  style={{borderRadius: "2px", marginTop: "-8px"}}
              >Cancel</span
              >
            </span>
          <span id="sjs_survey_creator_title_show">
              <span
                  style={{paddingTop: "1px", height: "39px", display: "inline-block"}}
              ></span>
              <span
                  className="edit-survey-name"
                  onClick={startEdit}
                  title="Change Name"
              >
                <img
                    className="edit-icon"
                    src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiB4bWw6c3BhY2U9InByZXNlcnZlIj48Zz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZmlsbD0iIzFBQjM5NCIgZD0iTTE5LDRsLTksOWw0LDRsOS05TDE5LDR6Ii8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiMxQUIzOTQiIGQ9Ik04LDE1djRoNEw4LDE1eiIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMUFCMzk0IiBkPSJNMSwxN3YyaDR2LTJIMXoiLz48L2c+PC9zdmc+"
                    style={{width: "24px", height: "24px", marginTop: "-5px"}}
                />
              </span>
            </span>
        </h3>
      </div>
      <script type="text/html" id="custom-tab-survey-templates">
        {`<div id="test">TEST</div>`}
      </script>

      <div id="surveyCreatorContainer" />
    </div>);
  }

  saveMySurvey = (saveNo, callback) => {
    let json_str = JSON.stringify(this.surveyCreator.text);
    console.log(json_str);

    //Save the survey definition into a local storage
    window.localStorage.setItem("survey_js_json", this.surveyCreator.text);
    !!callback && callback(saveNo, true);

    /*
    // exports file
    const element = document.createElement("a");
    const file = new Blob(["export var json = " + json_str], {type: 'text/js'});
    element.href = URL.createObjectURL(file);
    element.download = "survey_json.js";
    document.body.appendChild(element); // Required for this to work in Firefox
    element.click();
     */
  };
}

export default SurveyCreator;
