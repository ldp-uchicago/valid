'use strict';

// helper function to format reply for invalid values
var invalidReply = function (col, val, reason) {

    var value = '`' + val + '`';
    return [col, '=', value, reason].join(' ');
};


// validation functions for LDP transcript columns
//
// see http://joyrexus.spc.uchicago.edu/ldp/docs/specs/transcript/columns.html


// column used to code which hands were used to perform a gesture
var lrb = function (v) {

    var column = 'LRB';
    if (v) {
        if (!/^[LRB](?:\+[LRB])*$/.test(v)) {
            return invalidReply(column, v, 'is an invalid value');
        }
    }
};


// time stamp colum
var time = function (v) {

    var column = 'Time';

    // has a value
    if (v) {

        // in the general format
        if (/^\d\d:\d\d:\d\d$/.test(v)) {

            if (/^2[4-9]:/.test(v)) {
                return invalidReply(column, v, 'out of range for hours');
            }

            if (/^\d\d:[6-9]/.test(v)) {
                return invalidReply(column, v, 'out of range for minutes');
            }

            if (!/:[0-5]\d$/.test(v)) {
                return invalidReply(column, v, 'out of range for seconds');
            }

        // is improperly formatted
        } else {

            if (/\s/.test(v)) {
                return invalidReply(column, v, 'entry cannot contain space');
            }

            if (/^\d:/.test(v)) {
                return invalidReply(column, v, 'need two digits for hours');
            }

            if (/^\d\d:\d:/.test(v)) {
                return invalidReply(column, v, 'need two digits for minutes');
            }

            if (/:\d$/.test(v)) {
                return invalidReply(column, v, 'need two digits for seconds');
            }

            return invalidReply(column, v, 'required format is HH:MM:SS');
        }

    }
};


module.exports = {

    LRB: lrb,

    Time: time

};
