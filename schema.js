'use strict';


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

    var column = 'LRB';
    if (v) {
        if (!/^[LRB](?:\+[LRB])*$/.test(v)) {
            return invalidReply(column, v, 'is an invalid value');
        }
    }
};


// validation for `time` column (time stamp)
//
var time = function (v) {

    var column = 'Time';
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

    var column = 'Gtype';
    if (v) {
        if (!/^(C|DP|DP\.nl|DS|DSDP|E|FA|G|S|R\.a|R\.d|R\.m|R\.a\.pp|R\.d\.pp|R\.m\.pp|R\.a\.e|R\.d\.e|R\.m\.e|R\.met)((\/|;)(C|DP|DP\.nl|DS|DSDP|E|FA|G|S|R\.a|R\.d|R\.m|R\.a\.pp|R\.d\.pp|R\.m\.pp|R\.a\.e|R\.d\.e|R\.m\.e|R\.met))*$/.test(v)) {
        
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
                return invalidReply(column, v, 'entry cannot contain numeric characters');
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

    var column = 'GSRel';
    if (v) {
        if (!/^(DA|MS|UC|X|ADD|ADD.err|ADD.err.s|ADD.f|ADD.met|ADD.nr|ADD.ns|ADD.q|ADD.s|E|E.b|RF|RF.a|RF.p)((\/|;)(DA|MS|UC|X|ADD|ADD.err|ADD.err.s|ADD.f|ADD.met|ADD.nr|ADD.ns|ADD.q|ADD.s|E|E.b|RF|RF.a|RF.p))*$/.test(v)) {
        
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
                return invalidReply(column, v, 'entry cannot contain numeric characters');
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
        if (!/^([1-9]|a|d|e|F|f|i|l|M|m|o|p|r|t|v|x|xc)([1-9]|a|d|e|F|f|i|l|M|m|o|p|r|t|v|x|xc)*$/.test(v)) {
        
            if (/\s/.test(v)) {
                return invalidReply(column, v, 'entry cannot contain space');
            }
            
            if (/0/.test(v)) {
                return invalidReply(column, v, 'entry cannot contain 0');
            }        
            
            return invalidReply(column, v, 'is an invalid entry');
        }
    }
}

var utts = function (v) {

    var column = 'Utts';
    if (v) {
        if (/^[-#a-z\s][-#a-z\s]*$/.test(v)) {
        
            if (/^\s/.test(v)) {
                return invalidReply(column, v, 'entry cannot begin with space');
            }
            
            if (/\s$/.test(v)) {
                return invalidReply(column, v, 'entry cannot end with space');
            }        
            
            if (/[-]/.test(v)) {
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
            
        } else {
            if (/[A-Z]/.test(v)) {
                return invalidReply(column, v, 'entry cannot contain capital letter');
            }
            
            return invalidReply(column, v, 'is an invalid entry');
        }
    }
}

module.exports = {

    LRB: lrb,
    Time: time,
    Gtype: gtype,
    GSRel: gsrel,
    Key: key,
    Utts: utts

};
