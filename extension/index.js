'use strict';

module.exports = function(nodecg) {
    try {
        require('./donor-sidebar')(nodecg);
    } catch (e) {
        nodecg.log.error('Failed to load "donor-sidebar" lib:', e.stack);
        process.exit(1);
    }
    
    try {
        require('./donations')(nodecg);
    } catch (e) {
        nodecg.log.error('Failed to load "donations" lib:', e.stack);
        process.exit(1);
    }

    try {
        require('./lower-third-bar')(nodecg);
    } catch (e) {
        nodecg.log.error('Failed to load "lower third bar" lib:', e.stack);
        process.exit(1);
    }
};
