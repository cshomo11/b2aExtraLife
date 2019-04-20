'use strict';

const numeral = require('numeral');
const rp = require('request-promise');
const Q = require('q');
const parID = 'place participantID here';

const EL_URL = 'https://www.extra-life.org/index.cfm?fuseaction=donordrive.participant&participantID=' + parID + '&format=json'; //Add participantID here
const POLL_INTERVAL = 5 * 60000; //Get new donation info every 5 minutes
let updateInterval;

module.exports = function (nodecg) {
  let totalRep = nodecg.Replicant('totalRep', {
    defaultValue: {
      raw: 0,
      formatted: '$0.00'
    }
  });
  let goalRep = nodecg.Replicant('goalRep', {
    defaultValue: {
      raw: 0,
      formatted: '$0.00'
    }
  });
  updateDonations("start", null);

  nodecg.listenFor('manualEditTotal', function (raw) {
    totalRep.value = {
      raw: parseFloat(raw),
      formatted: numeral(raw).format('$0.00')
    };
  });
  nodecg.listenFor('updateTotal', updateDonations);

  let updateDonations = (value, cb) => {
    let deferred = Q.defer();
    let options = {
      uri: EL_URL,
      json: true
    };
    nodecg.log.debug(value);
    clearInterval(updateInterval);
    updateInterval = setInterval(updateDonations, POLL_INTERVAL);

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

    if (cb != null) {
      return cb(deferred.promise);
    } 
    else {
      return deferred.promise;
    }
  }
};