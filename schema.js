'use strict';
var patterns = require('./patterns');


// helper function to format reply for invalid values
//
var invalidReply = function (col, val, reason) {

    var value = '`' + val + '`';
    return [col, '=', value, reason].join(' ');
};


// validation functions for LDP transcript columns
//
// see http://joyrexus.spc.uchicago.edu/ldp/docs/specs/transcript/columns.html


// validation for `lrb` column
//   used to code which hands were used to perform a gesture
//
var lrb = function (v) {

    var column = 'lrb';

    // has a value
    if (v) {
        if (!/^[LRB](?:\+[LRB])*$/.test(v)) {
            return invalidReply(column, v, 'is an invalid value');
        }
    }
};


// validation for `time` column (time stamp)
//
var time = function (v) {

    var column = 'time';

    // has a value
    if (v) {
        // is in the general format
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

var gtype = function (v) {

    var column = 'gtype';

    // has a value
    if (v) {
        if (!patterns.gtype.test(v)) {

            if (/\s/.test(v)) {
                return invalidReply(column, v, 'entry cannot contain space');
            }

            if (/^;/.test(v)) {
                return invalidReply(column, v, 'entry cannot begin with ;');
            }

            if (/^\//.test(v)) {
                return invalidReply(column, v, 'entry cannot begin with /');
            }

            if (/^\./.test(v)) {
                return invalidReply(column, v, 'entry cannot begin with .');
            }

            if (/;$/.test(v)) {
                return invalidReply(column, v, 'entry cannot end with ;');
            }

            if (/\/$/.test(v)) {
                return invalidReply(column, v, 'entry cannot end with /');
            }

            if (/\.$/.test(v)) {
                return invalidReply(column, v, 'entry cannot end with .');
            }

            if (/[0-9]/.test(v)) {
                return invalidReply(column, v, 'entry cannot contain numbers');
            }

            if (/(\/\/)/.test(v)) {
                return invalidReply(column, v, 'entry cannot contain //');
            }

            if (/;;/.test(v)) {
                return invalidReply(column, v, 'entry cannot contain ;;');
            }

            if (/(\.\.)/.test(v)) {
                return invalidReply(column, v, 'entry cannot contain ..');
            }

            return invalidReply(column, v, 'is an invalid entry');
        }
    }
};

var gsrel = function (v) {

    var column = 'gsrel';

    if (v && !patterns.gsrel.test(v)) {

        if (/\s/.test(v)) {
            return invalidReply(column, v, 'entry cannot contain space');
        }

        if (/^;/.test(v)) {
            return invalidReply(column, v, 'entry cannot begin with ;');
        }

        if (/^\//.test(v)) {
            return invalidReply(column, v, 'entry cannot begin with /');
        }

        if (/^\./.test(v)) {
            return invalidReply(column, v, 'entry cannot begin with .');
        }

        if (/;$/.test(v)) {
            return invalidReply(column, v, 'entry cannot end with ;');
        }

        if (/\/$/.test(v)) {
            return invalidReply(column, v, 'entry cannot end with /');
        }

        if (/\.$/.test(v)) {
            return invalidReply(column, v, 'entry cannot end with .');
        }

        if (/[0-9]/.test(v)) {
            return invalidReply(column, v, 'entry cannot contain numbers');
        }

        if (/(\/\/)/.test(v)) {
            return invalidReply(column, v, 'entry cannot contain //');
        }

        if (/;;/.test(v)) {
            return invalidReply(column, v, 'entry cannot contain ;;');
        }

        if (/(\.\.)/.test(v)) {
            return invalidReply(column, v, 'entry cannot contain ..');
        }

        return invalidReply(column, v, 'is an invalid entry');
    }
};

var key = function (v) {

    var column = 'key';

    if (v && !/^([1-9adefFilmMoprtvx]|xc)([1-9adefFilmMoprtvx]|xc)*$/.test(v)) {

        if (/\s/.test(v)) {
            return invalidReply(column, v, 'entry cannot contain space');
        }

        if (/0/.test(v)) {
            return invalidReply(column, v, 'entry cannot contain 0');
        }

        return invalidReply(column, v, 'is an invalid entry');
    }
};

var utts = function (v) {

    var column = 'utts';

    if (v) {

        if (/^\s/.test(v) || /\s$/.test(v)) {
            return invalidReply(column, v, 'entry cannot begin or end with space');
        }

        if (/-/.test(v) && (!/^---$/.test(v) || !/\s---\s/)) {
            return invalidReply(column, v, 'entry can only contain `---`');
        }

        if (/#/.test(v) && (!/^###$/.test(v) || !/\s###\s/)) {
            return invalidReply(column, v, 'entry can only contain `###`');
        }

        if (/@/.test(v) && !/\w@[fl]\b/) {
            return invalidReply(column, v, "invalid postfix tag (use `@f` or `@l`)");
        }

        if (/[a-z][A-Z][a-z\s]/.test(v)) {
            return invalidReply(column, v, 'no embedded cap letters');
        }
    }
};

module.exports = {
    lrb: lrb,
    time: time,
    gtype: gtype,
    gsrel: gsrel,
    key: key,
    utts: utts
};
