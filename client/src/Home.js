import React, {useEffect, useState} from "react";
import logo from "./logo.svg";
import Table from "./components/Table";

export function HomePage() {
    const [loaded, setLoaded] = useState(false);
    const [trow, setTRow] = useState([]);

    const manager = new SurveyManager("");



   function refresh() {
       console.log("refresh");
       manager.loadSurveys((data) => {
           console.log(getRowsData(data));
           setTRow(getRowsData(data));
           setLoaded(true);
       });
   }

   if (!loaded) {
       refresh();
   }


    function getRowsData(tdata) {
        return tdata.map((data, index) => {
            const { id, name, json } = data;
            return (
                <tr>
                    <td>{ name }</td>
                    <td>
                        <a  href={"survey?id=" + id }
                            className="sv_button_link"
                        >Run</a
                        >
                        <a
                            href={"creator?id=" + id + "&name=" + name}
                            className="sv_button_link"
                        >Edit</a
                        >
                        <a
                            href={"analytics?id=" + id + "&name=" + name}
                            className="sv_button_link"
                        >Analytics</a
                        >
                        <a  href={"analyticstabulator?id=" + id + "&name=" + name}
                            className="sv_button_link"
                        >Results</a
                        >
                        <a  href={"export?id=" + id + "&name=" + name}
                            className="sv_button_link"
                        >Export PDF</a
                        >
                        <span
                            className="sv_button_link sv_button_delete"
                            onClick= {() => { manager.deleteSurvey(id, refresh);}}
                        >Delete</span
                        >
                    </td>
                </tr>
            )
        })
    }


    return (
        <div className="container page-body">
            <div className="jumbotron centered">
                <h1>Your surveys</h1>
                <div id="surveys-list" className="surveys-list">
                    <section>
                        <button
                            onClick= {function() { manager.createSurvey('NewSurvey' + Date.now(), refresh); }}
                        >
                            Add
                        </button>
                    </section>
                <table className="table table-striped">
                    <tbody>
                    {trow}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    );
  }

function SurveyManager(baseUrl, accessKey) {
    var self = this;


    self.loadSurveys = function(callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/getActive?accessKey=" + accessKey);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = function() {
            var result = xhr.response ? JSON.parse(xhr.response) : {};
            callback(
                Object.keys(result).map(function(key) {
                    return {
                        id: key,
                        name: result[key].name || key,
                        survey: result[key].json || result[key]
                    };
                })
            );
        };
        xhr.send();
    };

    self.createSurvey = function(name, onCreate) {
        var xhr = new XMLHttpRequest();
        xhr.open(
            "GET",
            baseUrl + "/create?accessKey=" + accessKey + "&name=" + name
        );
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = function() {
            var result = xhr.response ? JSON.parse(xhr.response) : null;
            !!onCreate && onCreate(xhr.status === 200, result, xhr.response);
        };
        xhr.send();
    };

    self.deleteSurvey = function(id, onDelete) {
        if (confirm("Are you sure?")) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", baseUrl + "/delete?accessKey=" + accessKey + "&id=" + id);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onload = function() {
                var result = xhr.response ? JSON.parse(xhr.response) : null;
                !!onDelete && onDelete(xhr.status === 200, result, xhr.response);
            };
            xhr.send();
        }
    };
}
  