'use strict';

var fs = require('fs');
var path = require('path');
var numeral = require('numeral');
var rp = require('request-promise');
var filter = require('profanity-filter');
var Q = require('q');
const util = require('util');
const parID = 'INSERT participantID HERE'

var el_url =  'http://www.extra-life.org/index.cfm?fuseaction=donordrive.participantDonations&participantID=' + parID + '&format=json';
var POLL_INTERVAL = 5 * 60000; //Get new donation info every 5 minutes
var updateInterval;

module.exports = function(nodecg) {
  var donorsRep = nodecg.Replicant("donorsRep");
  updateDonorList("Get Donors", null)

  nodecg.listenFor('updateDonors', updateDonorList);
  function updateDonorList(value, cb){
    var deferred = Q.defer();
    clearInterval(updateInterval);
    updateInterval = setInterval(updateDonorList, POLL_INTERVAL);
    var options = {
        uri: el_url,
        json: true
    };
    rp(options)
        .then(function (response) {
          var el_data = response;
          nodecg.log.debug(util.inspect(el_data, {showHidden: false, depth: 2}));
          //Format the donations to $0.00
          for (var j = 0; j < el_data.length; j++) {
            var rawData = el_data[j].donationAmount;
            if(el_data[j].donorName == null){
              el_data[j].donorName = "Anonymous"
            }
            else{
              el_data[j].donorName = filter.clean(el_data[j].donorName);
            }

            //el_data[j].donationAmount = numeral(rawData).format('$0.00');
          }

          if (el_data.length > 10){
            donorsRep.value = el_data.slice([0,9]);
          }
          else{
            donorsRep.value = el_data;
          }
          deferred.resolve(true);
        })
        .catch(function (err) {
            // Delete failed...
            deferred.reject(err);
        });
      //return cb(deferred.promise);
      if (cb != null){
        return cb(deferred.promise);
      }
      else{
        return deferred.promise;
      }
  }
};
