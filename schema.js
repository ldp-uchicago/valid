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
    if (v) {
        if (!patterns.gsrel.test(v)) {

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

var key = function (v) {

    var column = 'Key';
    if (v) {
        if (!/^([1-9adefFilmMoprtvx]|xc)([1-9adefFilmMoprtvx]|xc)*$/.test(v)) {
            if (/\s/.test(v)) {
                return invalidReply(column, v, 'entry cannot contain space');
            }

            if (/0/.test(v)) {
                return invalidReply(column, v, 'entry cannot contain 0');
            }

            return invalidReply(column, v, 'is an invalid entry');
        }
    }
};

var utts = function (v) {

    var column = 'Utts';
    if (v) {
        if (/^[\-#@a-z\s][\-#@a-z\s]*$/.test(v)) {

            if (/^\s/.test(v)) {
                return invalidReply(column, v, 'entry cannot begin with space');
            }

            if (/\s$/.test(v)) {
                return invalidReply(column, v, 'entry cannot end with space');
            }

            if (/\-/.test(v)) {
                if (/---/.test(v)) {
                    if (/----/.test(v)) {
                        return invalidReply(column, v, 'entry can only contain ---');
                    }

                } else {
                    return invalidReply(column, v, 'entry cannot contain - or --');
                }
            }

            if (/[#]/.test(v)) {
                if (/###/.test(v)) {
                    if (/####/.test(v)) {
                        return invalidReply(column, v, 'entry can only contain ###');
                    }

                } else {
                    return invalidReply(column, v, 'entry cannot contain # or ##');
                }
            }

            if (/@/.test(v)) {
                if (!/@f/.test(v) && !/@l/.test(v)) {
                    return invalidReply(column, v, "entry can only have @f or @l");
                }

                if (/@f/.test(v)) {
                    if (/\s/.test(v)) {
                        if (!/@f\s/.test(v) && !/@f$/.test(v)) {
                            return invalidReply(column, v, '@f must be at end of word');
                        }
                    } else {
                        if (!/@f$/.test(v)) {
                            return invalidReply(column, v, '@f must be at end of word');
                        }
                    }
                }

                if (/@l/.test(v)) {
                    if (/\s/.test(v)) {
                        if (!/@l\s/.test(v) && !/@l$/.test(v)) {
                            return invalidReply(column, v, '@l must be at end of word');
                        }
                        if (!/\s@l/.test(v) && !/^@l/.test(v)) {
                            return invalidReply(column, v, '@l must be at beginning of word');
                        }
                    } else {
                        if (!/@l$/.test(v)) {
                            return invalidReply(column, v, '@l must be at end of word');
                        }
                        if (!/^@l/.test(v)) {
                            return invalidReply(column, v, '@l must be at beginning of word');
                        }
                    }
                }
            }

        } else {
            if (/[A-Z]/.test(v)) {
                if (/[a-z][A-Z][a-z\s]/.test(v)) {
                    return invalidReply(column, v, 'entry cannot contain capital letter unless proper noun');
                } else {
                    return;
                }
            }
            if (/^\s/.test(v)) {
                return invalidReply(column, v, 'entry cannot begin with space');
            }
            return invalidReply(column, v, 'is an invalid entry');
        }
    }
};

module.exports = {

    lrb: lrb,
    time: time,
    gtype: gtype,
    gsrel: gsrel,
    Key: key,
    Utts: utts

};
