// Loading and initializing the library:
const pgp = require('pg-promise')({
  // Initialization Options
});

// Preparing the connection details:
const cn = process.env.DATABASE_URL || 'postgres://postgres:123456@localhost:5432/surveyjs';

// Creating a new database instance from the connection details:
const db = pgp(cn);

function PostgresDBAdapter() {


  function getObjectFromStorage(tableName, callback) {
    db.any("SELECT * FROM " + tableName).then(function(result) {
      var objects = {};
      (result || []).forEach(function(item) {
        objects[item.id] = item;
      });
      callback(objects);
    });
  }

  function addSurvey(name, callback) {

    db
      .one("INSERT INTO surveys (name, json) VALUES($1, $2) RETURNING *", [
        name,
        "{}"
      ])
      .then(callback);
  }

  function postResults(postId, json, callback) {
    db
      .one("INSERT INTO results (postid, json) VALUES($1, $2) RETURNING *", [
        postId,
        json
      ])
      .then(callback);
  }

  function getResults(postId, callback) {
    db
      .any("SELECT * FROM results WHERE postid=$1", [postId])
      .then(function(data) {
        //console.log(JSON.stringify(data));
        var results = (data || []).map(function(item) {
          return JSON.parse(item["json"]);
        });
        callback(results);
      });
  }

  function deleteSurvey(surveyId, callback) {
    db
      .one("DELETE FROM surveys WHERE id=$1 RETURNING *", [surveyId])
      .then(callback);
  }

  function changeName(id, name, callback) {
    console.log("THIS IS THE NAME: "+name+ " ID: "+id);
    db
      .one("UPDATE surveys SET name = $1 WHERE id = $2 RETURNING *", [name, id])
      .then(callback);
  }

  function storeSurvey(id, json, callback) {
    db
      .one("UPDATE surveys SET json = $1 WHERE id = $2 RETURNING *", [json, id])
      .then(callback);
  }

  function getSurveys(callback) {
    getObjectFromStorage("surveys", function(objects) {
      if (Object.keys(objects).length > 0) {
        callback(objects);
      } else {
        callback({});
      }
    });
    // if(count($result) == 0) {
    //     $id1 = $this->addSurvey('MySurvey1');
    //     $this->storeSurvey($id1, $surveys['MySurvey1']);
    //     $id2 = $this->addSurvey('MySurvey2');
    //     $this->storeSurvey($id2, $surveys['MySurvey2']);
    //     $result = surveys;
    // }
  }

  return {
    addSurvey: addSurvey,
    getSurvey: function(surveyId, callback) {
      getSurveys(function(result) {
        callback(result[surveyId] ? JSON.parse(result[surveyId].json) : "{}");
      });
    },
    storeSurvey: storeSurvey,
    getSurveys: getSurveys,
    deleteSurvey: deleteSurvey,
    postResults: postResults,
    getResults: getResults,
    changeName: changeName
  };
}

module.exports = PostgresDBAdapter;
