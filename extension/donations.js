'use strict';

var fs = require('fs');
var path = require('path');
var numeral = require('numeral');
var rp = require('request-promise');
var Q = require('q');
const util = require('util');
const parID = 'INSERT participantID HERE'

var EL_URL = 'http://www.extra-life.org/index.cfm?fuseaction=donordrive.participant&participantID='+ parID +'&format=json'; //Add participantID here
var POLL_INTERVAL = 5 * 60000; //Get new donation info every 5 minutes
var updateInterval;

module.exports = function(nodecg) {
    var totalRep = nodecg.Replicant('totalRep', {defaultValue:
      {
        raw: 0,
        formatted: '$0.00'
      }
    });
    var goalRep = nodecg.Replicant('goalRep', {defaultValue:
      {
        raw: 0,
        formatted: '$0.00'
      }
    });
    updateDonations("start", null);

    nodecg.listenFor('manualEditTotal', function(raw) {
        totalRep.value = {
            raw: parseFloat(raw),
            formatted: numeral(raw).format('$0.00')
        };
    });
    nodecg.listenFor('updateTotal', updateDonations);

    function updateDonations(value, cb) {
      nodecg.log.debug(value);
      var deferred = Q.defer();
      clearInterval(updateInterval);
      updateInterval = setInterval(updateDonations, POLL_INTERVAL);
      var options = {
          uri: EL_URL,
          json: true
      };
      rp(options)
          .then(function (response) {
            var el_data = response;
            nodecg.log.debug('Total is ', el_data.totalRaisedAmount);
            nodecg.log.debug('Goal is ', el_data.fundraisingGoal);
            totalRep.value = {
                raw: el_data.totalRaisedAmount,
                formatted: numeral(el_data.totalRaisedAmount).format('$0.00')
            };
            goalRep.value = {
                raw: el_data.fundraisingGoal,
                formatted: numeral(el_data.fundraisingGoal).format('$0.00')
            };
            deferred.resolve(true);
          })
          .catch(function (err) {
              // Delete failed...
              deferred.reject(err);
          });
      if (cb != null){
        return cb(deferred.promise);
      }
      else{
        return deferred.promise;
      }
    }
};
