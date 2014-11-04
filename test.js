'use strict';

var test = require('tape'),
    check = require('./schema');


test('schema', function (t) {

    test('LRB column constraints', function (t) {

        t.equal(check.LRB(''), undefined, "permit empty strings");
        t.equal(check.LRB('X'), 'LRB = `X` is an invalid value');
        t.equal(check.LRB('L'), undefined);
        t.equal(
            check.LRB(' L'),
            'LRB = ` L` is an invalid value',
            "check for spacing"
        );
        t.equal(
            check.LRB('LL'),
            'LRB = `LL` is an invalid value',
            "require prefix operators"
        );
        t.equal(check.LRB('L+L'), undefined, "permit multiple code chars");
        t.equal(check.LRB('L+R'), undefined);
        t.equal(check.LRB('L+R+B'), undefined);
        t.equal(
            check.LRB('L+X'),
            'LRB = `L+X` is an invalid value',
            "only permit valid code chars"
        );
        t.equal(
            check.LRB('L + R'),
            'LRB = `L + R` is an invalid value',
            "do not permit inline spacing"
        );

        t.end();
    });

    test('Time column constraints', function (t) {
        t.equal(check.Time(''), undefined, "permit empty strings");
        t.equal(check.Time('00:00:00'), undefined);
        t.equal(check.Time('01:00:00'), undefined);
        t.equal(check.Time('23:59:59'), undefined);
        t.equal(
            check.Time('00:00:00 '),
            'Time = `00:00:00 ` entry cannot contain space',
            "check end for spaces"
        );
        t.equal(
            check.Time(' 00:00:00'),
            'Time = ` 00:00:00` entry cannot contain space',
            "check beginning for spaces"
        );
        t.equal(
            check.Time('24:00:00'),
            'Time = `24:00:00` out of range for hours',
            "check hour range"
        );
        t.equal(
            check.Time('00:60:00'),
            'Time = `00:60:00` out of range for minutes',
            "check minute range"
        );
        t.equal(
            check.Time('00:00:60'),
            'Time = `00:00:60` out of range for seconds',
            "check seconds range"
        );
        t.equal(
            check.Time('0'),
            'Time = `0` required format is HH:MM:SS',
            "ensure required format"
        );
        t.equal(
            check.Time('00:00'),
            'Time = `00:00` required format is HH:MM:SS',
            "ensure required format"
        );
        t.equal(
            check.Time('1:01:01'),
            'Time = `1:01:01` need two digits for hours',
            "ensure required format"
        );
        t.equal(
            check.Time('01:1:01'),
            'Time = `01:1:01` need two digits for minutes',
            "ensure required format"
        );
        t.equal(
            check.Time('01:01:1'),
            'Time = `01:01:1` need two digits for seconds',
            "ensure required format"
        );

        t.end();
    });
    
    test('G-type column constraints', function (t) {
        t.equal(check.Gtype(''), undefined, "permit empty strings");
        t.equal(check.Gtype('C'), undefined);
        t.equal(check.Gtype('DP'), undefined);
        t.equal(check.Gtype('C/DP'), undefined);
        t.equal(check.Gtype('C;DP'), undefined);
        t.equal(check.Gtype('C/DP;G/S/DSDP'), undefined);
        t.equal(check.Gtype('R.m.pp'), undefined);
        t.equal(
            check.Gtype('Z'),
            'Gtype = `Z` is an invalid entry',
            "check for valid characters"
        );
        t.equal(
            check.Gtype('A'),
            'Gtype = `A` is an invalid entry',
            "check for valid characters"
        );
        t.equal(
            check.Gtype('C/GG'),
            'Gtype = `C/GG` is an invalid entry',
            "check for valid characters"
        );
        t.equal(
            check.Gtype('C/DP '),
            'Gtype = `C/DP ` entry cannot contain space',
            "check for spaces"
        );
        t.equal(
            check.Gtype(';C/DP'),
            'Gtype = `;C/DP` entry cannot begin with ;',
            "check beginning for ;"
        );
        t.equal(
            check.Gtype('/C/DP'),
            'Gtype = `/C/DP` entry cannot begin with /',
            "check beginning for /"
        );
        t.equal(
            check.Gtype('.C/DP'),
            'Gtype = `.C/DP` entry cannot begin with .',
            "check beginning for ."
        );
        t.equal(
            check.Gtype('C/DP.'),
            'Gtype = `C/DP.` entry cannot end with .',
            "check end for ."
        );
        t.equal(
            check.Gtype('C/DP/'),
            'Gtype = `C/DP/` entry cannot end with /',
            "check end for /"
        );
        t.equal(
            check.Gtype('C/43/DP'),
            'Gtype = `C/43/DP` entry cannot contain numeric characters',
            "check for numbers"
        );
        t.equal(
            check.Gtype('C//DP'),
            'Gtype = `C//DP` entry cannot contain //',
            "check for //"
        );
        t.equal(
            check.Gtype('C;;DP'),
            'Gtype = `C;;DP` entry cannot contain ;;',
            "check for ;;"
        );
        t.equal(
            check.Gtype('R.m..pp'),
            'Gtype = `R.m..pp` entry cannot contain ..',
            "check for spaces"
        );
        t.end();
    });

    test('GS_Rel column constraints', function (t) {
        t.equal(check.GSRel(''), undefined, "permit empty strings");
        t.equal(check.GSRel('ADD'), undefined);
        t.equal(check.GSRel('ADD.err'), undefined);
        t.equal(check.GSRel('ADD.err.s'), undefined);
        t.equal(check.GSRel('DA/MS'), undefined);
        t.equal(check.GSRel('X;E'), undefined);
        t.equal(check.GSRel('ADD/ADD.met;E.b;RF.a/MS'), undefined);
        t.equal(
            check.GSRel('Z'),
            'GSRel = `Z` is an invalid entry',
            "check for valid characters"
        );
        t.equal(
            check.GSRel('ADDD'),
            'GSRel = `ADDD` is an invalid entry',
            "check for valid characters"
        );
        t.equal(
            check.GSRel('C/XX'),
            'GSRel = `C/XX` is an invalid entry',
            "check for valid characters"
        );
        t.equal(
            check.GSRel('X;E '),
            'GSRel = `X;E ` entry cannot contain space',
            "check for spaces"
        );
        t.equal(
            check.GSRel(';X;E'),
            'GSRel = `;X;E` entry cannot begin with ;',
            "check beginning for ;"
        );
        t.equal(
            check.GSRel('/X;E'),
            'GSRel = `/X;E` entry cannot begin with /',
            "check beginning for /"
        );
        t.equal(
            check.GSRel('.X;E'),
            'GSRel = `.X;E` entry cannot begin with .',
            "check beginning for ."
        );
        t.equal(
            check.GSRel('X;E.'),
            'GSRel = `X;E.` entry cannot end with .',
            "check end for ."
        );
        t.equal(
            check.GSRel('X;E/'),
            'GSRel = `X;E/` entry cannot end with /',
            "check end for /"
        );
        t.equal(
            check.GSRel('X/43/E'),
            'GSRel = `X/43/E` entry cannot contain numeric characters',
            "check for numbers"
        );
        t.equal(
            check.GSRel('X//E'),
            'GSRel = `X//E` entry cannot contain //',
            "check for //"
        );
        t.equal(
            check.GSRel('X;;E'),
            'GSRel = `X;;E` entry cannot contain ;;',
            "check for ;;"
        );
        t.equal(
            check.GSRel('ADD..err'),
            'GSRel = `ADD..err` entry cannot contain ..',
            "check for spaces"
        );
        t.end();
    });

    t.end();
});

test('validate', function (t) {

    var records = [
            {"_ID": "22", "ROW": "1", "LRB": "L", "XYZ": "x", "Time": "00:00:00", "Gtype": "C", "GSRel": "ADD"},
            {"_ID": "22", "ROW": "2", "LRB": "L+L", "XYZ": "y", "Time": "00:00:00", "Gtype": "C", "GSRel": "ADD"},
            {"_ID": "22", "ROW": "3", "LRB": "L+", "XYZ": "z", "Time": " 30:00:00", "Gtype": "C", "GSRel": "ADD "},
            {"_ID": "22", "ROW": "4", "LRB": "L+R+B", "XYZ": "q", "Time": "23:59:59", "Gtype": "C", "GSRel": "ADDD"},
            {"_ID": "22", "ROW": "5", "LRB": "L+R+X", "XYZ": "b", "Time": "00:0:00", "Gtype": "C", "GSRel": "ADD"}
        ],
        Validator = require('valid-records'),
        valid = new Validator(check),
        results = valid.validate(records);

    t.plan(2);
    t.equal(results.report.invalid, 6);
    t.equal(Object.keys(results.report.errors).length, 3, "3 lines have errors");
});
