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

    if (v) {

        if (/^\d\d:\d\d:\d\d$/.test(v)) {

            if (/^2[4-9]:/.test(v)) {
                return invalidReply(column, v, 'Out of range for hours');
            }

            if (/^\d\d:[6-9]/.test(v)) {
                return invalidReply(column, v, 'Out of range for minutes');
            }


        } else {

            if (/\s/.test(v)) {
                return invalidReply(column, v, 'Entry cannot contain space');
            }

            if (/[^:\d]/.test(v)) {
                var reason = 'No letters or symbols other than colon';
                return invalidReply(column, v, reason);
            }

            if (/:{2}/g.test(v)) {
                return invalidReply(column, v, 'Missing at least one colon');
            }

            if (/^[0-9][0-9][0-9][0-9]:[0-9][0-9]$/.test(v)) {
                return invalidReply(column, v, 'Missing a colon between hours and minutes');
            }

            if (/^[0-9][0-9]:[0-9][0-9][0-9][0-9]$/.test(v)) {
                return invalidReply(column, v, 'Missing a colon between minutes and seconds');
            }

            if (!/:/.test(v)) {
                return invalidReply(column, v, 'Missing both colons');
            }

            if (/:\d$/.test(v)) {
                return invalidReply(column, v, 'Need two digits for seconds');
            }

            if (!/:[0-5]\d$/.test(v)) {
                return invalidReply(column, v, 'Out of range for seconds');
            }

            if (/^\d:/.test(v)) {
                return invalidReply(column, v, 'Need two digits for hours');
            }

            if (/^\d\d:\d:/.test(v)) {
                return invalidReply(column, v, 'Need two digits for minutes');
            }

            return invalidReply(column, v, 'improper value');
        }

    }

};


module.exports = {

    LRB: lrb,

    Time: time

};
