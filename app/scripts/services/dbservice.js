'use strict';
angular.module('CodenameTank.services')
.factory('DBService', ['$cordovaSQLite', 'ApiService', 'FileService', '$q', function ($cordovaSQLite, ApiService, FileService, $q) {
  var _db;
  var _speakers = [];
  var _companies = [];
  var syncWithAPI = true;


  function _initDB () {
    window.plugins.sqlDB.copy('tank', function() {
      _db = $cordovaSQLite.openDB('tank');
      _loadData();
    }, function(error) {
      console.log('Warning = '+JSON.stringify(error));
      _db = $cordovaSQLite.openDB('tank');
      _loadData();
    });
  }

  function _loadData () {
    var promises = [];
    _resetArrays();


    $cordovaSQLite.execute(_db, 'SELECT * FROM speakers', []).then(function(results) {
      var _dbSpeaker;
      for (var i = 0; i < results.rows.length; i++) {
        _dbSpeaker = results.rows.item(i);
        _dbSpeaker.img = cordova.file.dataDirectory + _dbSpeaker.img;
        _speakers.push(_dbSpeaker);
      }

    }, function (err) {
      console.log(err);
      _resetArrays();
    });

    promises.push($cordovaSQLite.execute(_db, 'SELECT * FROM speakers', []));
    promises.push($cordovaSQLite.execute(_db, 'SELECT * FROM companies', []));
    // promises.push($cordovaSQLite.execute(_db, 'SELECT * FROM sessions', []));
    $q.all(promises).then(function(results){
      var _dbSpeaker;
      var _dbCompany;
      for (var i = 0; i < results[0].rows.length; i++) {
        _dbSpeaker = results[0].rows.item(i);
        _dbSpeaker.img = cordova.file.dataDirectory + _dbSpeaker.img;
        _speakers.push(_dbSpeaker);
      }

      for (var j = 0; j < results[1].rows.length; j++) {
        _dbCompany = results[1].rows.item(j);
        _dbCompany.img = cordova.file.dataDirectory + _dbCompany.img;
        _companies.push(results[1].rows.item(j));
      }

      // for (var i = 0; i < results[2].rows.length; i++) {
      //     _schedules.push(results[2].rows.item(i));
      // }
    });
    if(syncWithAPI){
      _syncDB();

    }
  }

  function _syncDB() {
    var apiPromises = [];
    var dbPromises = [];


    apiPromises.push(ApiService.getSpeakers());
    apiPromises.push(ApiService.getCompanies());

    $q.all(apiPromises).then(function(results){

      //update or insert Speakers from the API request
      for (var i = 0; i < results[0].data.length; i++) {
        dbPromises.push(_insertUpdateSpeaker(results[0].data[i]));
      }

      //update or insert Companies from the API request
      for (var j = 0; j < results[1].data.length; j++) {
        dbPromises.push(_insertUpdateCompany(results[1].data[j]));
      }

      //After all inserts/updates reload the new data from the database
      $q.all(dbPromises).then(function(results){

        //Set syncWithAPI to false, since we already have synced and to prevent a loop of requests
        syncWithAPI = false;
        _loadData();
      }, function(results) {

        //Set syncWithAPI to false, since we already have synced and to prevent a loop of requests
        syncWithAPI = false;
        _loadData();
      });

    });

  }

  function _insertUpdateSpeaker(speaker){
    return FileService.fetchFile(speaker.img).then(function(result){
      return $cordovaSQLite.execute(_db,
          'INSERT OR REPLACE INTO speakers (id,name, title, description, img, updated) VALUES (?, ?, ?, ?, ?, ?)',
          [speaker.id, speaker.name, speaker.title, speaker.description, result.name, speaker.updated]);
    }, function(error){
      console.log(error);
      return $cordovaSQLite.execute(_db,
          'INSERT OR REPLACE INTO speakers (id,name, title, description, updated) VALUES (?, ?, ?, ?, ?)',
          [speaker.id, speaker.name, speaker.title, speaker.description, speaker.updated]);
    });
  }

  function _insertUpdateCompany(company){
    return FileService.fetchFile(company.img).then(function(result){
      return $cordovaSQLite.execute(_db,
          'INSERT OR REPLACE INTO companies (id, thread, name, area, description, img, updated) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [company.id, company.thread, company.name, company.area, company.description, result.name, company.updated]);
    }, function(error){
      console.log(error);
      return $cordovaSQLite.execute(_db,
          'INSERT OR REPLACE INTO companies (id, thread, name, area, description, updated) VALUES (?, ?, ?, ?, ?, ?)',
          [company.id, company.thread, company.name, company.area, company.description, company.updated]);
    });
  }

  function _resetArrays(){
    _speakers.length = 0;
    _companies.length = 0;
  }

  return {
    initDB: _initDB,
    getSpeakers: _speakers,
    getCompanies: _companies
  };
}]);