'use strict';

var test = require('tape'),
    check = require('./schema'),
    patterns = require('./patterns');


test('patterns', function (t) {

    test('gtype column patterns', function (t) {
        t.equal(
            patterns.gtype.single,
            'C|E|FA|G|S' +
                '|DS|DP(\\.nl)*|DSDP' +
                '|R\\.[adm](\\.(e|pp))*|R\\.met',
            'single code pattern is correctly constructed'
        );
        t.equal(patterns.gtype.test('DS'), true, "matches `DS`");
        t.equal(patterns.gtype.test('DP.nl'), true, "matches `DS.nl`");
        t.equal(
            patterns.gtype.test('DP.n'),
            false,
            "does not match `DP.n`"
        );
        t.equal(
            patterns.gtype.test('DS.nl'),
            false,
            "does not match `DS.nl`"
        );
        t.equal(patterns.gtype.test('R.a'), true, "matches `R.a`");
        t.equal(patterns.gtype.test('R.a.e'), true, "matches `R.a.e`");
        t.equal(patterns.gtype.test('R.a.pp'), true, "matches `R.a.pp`");
        t.equal(patterns.gtype.test('R.met'), true, "matches `R.met`");
        t.equal(
            patterns.gtype.test('R.a.met'),
            false,
            "does not match `R.a.met`"
        );

        t.end();
    });

    test('gsrel column patterns', function (t) {

        t.equal(
            patterns.gsrel.single,
            'DA|MS|UC|X|ADD|RF|E' +
                '|ADD\\.(err(\\.s)*|s|f|met|n[rs]|q|s)' +
                '|RF\\.[ap]' +
                '|E\\.b',
            'single code pattern is correctly constructed'
        );
        t.equal(patterns.gsrel.test('DA'), true, "matches `DA`");
        t.equal(patterns.gsrel.test('ADD.err'), true, "matches `ADD.err`");
        t.equal(
            patterns.gsrel.test('ADD.err.s'),
            true,
            "matches `ADD.err.s`"
        );
        t.equal(
            patterns.gsrel.test('ADD.er'),
            false,
            "does not match `ADD.er`"
        );
        t.equal(patterns.gsrel.test('ADD.nr'), true, "matches `ADD.nr`");
        t.equal(
            patterns.gsrel.test('ADD.nq'),
            false,
            "does not match `ADD.nq`"
        );
        t.equal(
            patterns.gsrel.test('ADD.n'),
            false,
            "does not match `ADD.n`"
        );
        t.equal(patterns.gsrel.test('X;E'), true, "matches `X;E`");
        t.equal(patterns.gsrel.test('DA/MS;X'), true, "matches `DA/MS;X`");
        t.equal(
            patterns.gsrel.test('ADD/ADD.met;E.b;RF.a/MS'),
            true,
            "matches `ADD/ADD.met;E.b;RF.a/MS`"
        );

        t.end();
    });

    t.end();
});


test('schema', function (t) {

    test('lrb column constraints', function (t) {

        t.equal(check.lrb(''), undefined, "permit empty strings");
        t.equal(check.lrb('X'), 'lrb = `X` is an invalid value');
        t.equal(check.lrb('L'), undefined);
        t.equal(
            check.lrb(' L'),
            'lrb = ` L` is an invalid value',
            "check for spacing"
        );
        t.equal(
            check.lrb('LL'),
            'lrb = `LL` is an invalid value',
            "require prefix operators"
        );
        t.equal(check.lrb('L+L'), undefined, "permit multiple code chars");
        t.equal(check.lrb('L+R'), undefined);
        t.equal(check.lrb('L+R+B'), undefined);
        t.equal(
            check.lrb('L+X'),
            'lrb = `L+X` is an invalid value',
            "only permit valid code chars"
        );
        t.equal(
            check.lrb('L + R'),
            'lrb = `L + R` is an invalid value',
            "do not permit inline spacing"
        );

        t.end();
    });

    test('time column constraints', function (t) {
        t.equal(check.time(''), undefined, "permit empty strings");
        t.equal(check.time('00:00:00'), undefined);
        t.equal(check.time('01:00:00'), undefined);
        t.equal(check.time('23:59:59'), undefined);
        t.equal(
            check.time('00:00:00 '),
            'time = `00:00:00 ` entry cannot contain space',
            "check end for spaces"
        );
        t.equal(
            check.time(' 00:00:00'),
            'time = ` 00:00:00` entry cannot contain space',
            "check beginning for spaces"
        );
        t.equal(
            check.time('24:00:00'),
            'time = `24:00:00` out of range for hours',
            "check hour range"
        );
        t.equal(
            check.time('00:60:00'),
            'time = `00:60:00` out of range for minutes',
            "check minute range"
        );
        t.equal(
            check.time('00:00:60'),
            'time = `00:00:60` out of range for seconds',
            "check seconds range"
        );
        t.equal(
            check.time('0'),
            'time = `0` required format is HH:MM:SS',
<<<<<<< HEAD
            "ensure required format"
        );
        t.equal(
            check.time('00:00'),
            'time = `00:00` required format is HH:MM:SS',
            "ensure required format"
        );
        t.equal(
            check.time('1:01:01'),
            'time = `1:01:01` need two digits for hours',
            "ensure required format"
        );
        t.equal(
            check.time('01:1:01'),
            'time = `01:1:01` need two digits for minutes',
            "ensure required format"
        );
        t.equal(
            check.time('01:01:1'),
            'time = `01:01:1` need two digits for seconds',
            "ensure required format"
        );
=======
            "ensure required format"
        );
        t.equal(
            check.time('00:00'),
            'time = `00:00` required format is HH:MM:SS',
            "ensure required format"
        );
        t.equal(
            check.time('1:01:01'),
            'time = `1:01:01` need two digits for hours',
            "ensure required format"
        );
        t.equal(
            check.time('01:1:01'),
            'time = `01:1:01` need two digits for minutes',
            "ensure required format"
        );
        t.equal(
            check.time('01:01:1'),
            'time = `01:01:1` need two digits for seconds',
            "ensure required format"
        );
>>>>>>> upstream/master

        t.end();
    });

    test('gtype column constraints', function (t) {
        t.equal(check.gtype(''), undefined, "permit empty strings");
        t.equal(check.gtype('C'), undefined);
        t.equal(check.gtype('DP'), undefined);
        t.equal(check.gtype('C/DP'), undefined);
        t.equal(check.gtype('C;DP'), undefined);
        t.equal(check.gtype('C/DP;G/S/DSDP'), undefined);
        t.equal(check.gtype('R.m.pp'), undefined);
        t.equal(
            check.gtype('Z'),
            'gtype = `Z` is an invalid entry',
            "check for valid characters"
        );
        t.equal(
            check.gtype('A'),
            'gtype = `A` is an invalid entry',
            "check for valid characters"
        );
        t.equal(
            check.gtype('C/GG'),
            'gtype = `C/GG` is an invalid entry',
            "check for valid characters"
        );
        t.equal(
            check.gtype('C/DP '),
            'gtype = `C/DP ` entry cannot contain space',
            "check for spaces"
        );
        t.equal(
            check.gtype(';C/DP'),
            'gtype = `;C/DP` entry cannot begin with ;',
            "check beginning for ;"
        );
        t.equal(
            check.gtype('/C/DP'),
            'gtype = `/C/DP` entry cannot begin with /',
            "check beginning for /"
        );
        t.equal(
            check.gtype('.C/DP'),
            'gtype = `.C/DP` entry cannot begin with .',
            "check beginning for ."
        );
        t.equal(
            check.gtype('C/DP.'),
            'gtype = `C/DP.` entry cannot end with .',
            "check end for ."
        );
        t.equal(
            check.gtype('C/DP/'),
            'gtype = `C/DP/` entry cannot end with /',
            "check end for /"
        );
        t.equal(
            check.gtype('C/43/DP'),
            'gtype = `C/43/DP` entry cannot contain numbers',
            "check for numbers"
        );
        t.equal(
            check.gtype('C//DP'),
            'gtype = `C//DP` entry cannot contain //',
            "check for //"
        );
        t.equal(
            check.gtype('C;;DP'),
            'gtype = `C;;DP` entry cannot contain ;;',
            "check for ;;"
        );
        t.equal(
            check.gtype('R.m..pp'),
            'gtype = `R.m..pp` entry cannot contain ..',
            "check for .."
        );
        t.end();
    });

    test('Gsrel column constraints', function (t) {
        t.equal(check.gsrel(''), undefined, "permit empty strings");
        t.equal(check.gsrel('ADD'), undefined);
        t.equal(check.gsrel('ADD.err'), undefined);
        t.equal(check.gsrel('ADD.err.s'), undefined);
        t.equal(check.gsrel('DA/MS'), undefined);
        t.equal(check.gsrel('X;E'), undefined);
        t.equal(check.gsrel('ADD/ADD.met;E.b;RF.a/MS'), undefined);
        t.equal(
            check.gsrel('Z'),
            'gsrel = `Z` is an invalid entry',
            "check for valid characters"
        );
        t.equal(
            check.gsrel('ADDD'),
            'gsrel = `ADDD` is an invalid entry',
            "check for valid characters"
        );
        t.equal(
            check.gsrel('C/XX'),
            'gsrel = `C/XX` is an invalid entry',
            "check for valid characters"
        );
        t.equal(
            check.gsrel('X;E '),
            'gsrel = `X;E ` entry cannot contain space',
            "check for spaces"
        );
        t.equal(
            check.gsrel(';X;E'),
            'gsrel = `;X;E` entry cannot begin with ;',
            "check beginning for ;"
        );
        t.equal(
            check.gsrel('/X;E'),
            'gsrel = `/X;E` entry cannot begin with /',
            "check beginning for /"
        );
        t.equal(
            check.gsrel('.X;E'),
            'gsrel = `.X;E` entry cannot begin with .',
            "check beginning for ."
        );
        t.equal(
            check.gsrel('X;E.'),
            'gsrel = `X;E.` entry cannot end with .',
            "check end for ."
        );
        t.equal(
            check.gsrel('X;E/'),
            'gsrel = `X;E/` entry cannot end with /',
            "check end for /"
        );
        t.equal(
            check.gsrel('X/43/E'),
            'gsrel = `X/43/E` entry cannot contain numbers',
            "check for numbers"
        );
        t.equal(
            check.gsrel('X//E'),
            'gsrel = `X//E` entry cannot contain //',
            "check for //"
        );
        t.equal(
            check.gsrel('X;;E'),
            'gsrel = `X;;E` entry cannot contain ;;',
            "check for ;;"
        );
        t.equal(
            check.gsrel('ADD..err'),
            'gsrel = `ADD..err` entry cannot contain ..',
            "check for .."
        );
        t.end();
    });

    test('Key column constraints', function (t) {
        t.equal(check.Key(''), undefined, "permit empty strings");
        t.equal(check.Key('xcx'), undefined);
        t.equal(check.Key('M12F2'), undefined);
        t.equal(check.Key('123456789'), undefined);
        t.equal(
            check.Key('1 '),
            'Key = `1 ` entry cannot contain space',
            "check for space"
        );
        t.equal(
            check.Key('0'),
            'Key = `0` entry cannot contain 0',
            "check for 0"
        );
        t.equal(
            check.Key('Z'),
            'Key = `Z` is an invalid entry',
            "check for valid characters"
        );
        t.equal(
            check.Key('P'),
            'Key = `P` is an invalid entry',
            "check for valid characters"
        );
        t.end();
    });

    test('Utts column constraints', function (t) {
        t.equal(check.Utts(''), undefined, "permit empty strings");
        t.equal(check.Utts('a'), undefined);
        t.equal(check.Utts('hello'), undefined);
        t.equal(check.Utts('---'), undefined);
        t.equal(check.Utts('###'), undefined);
        t.equal(check.Utts('hello world'), undefined);
<<<<<<< HEAD
        t.equal(check.Utts('Hello World'), undefined);
        t.equal(check.Utts('hello World'), undefined);
=======
>>>>>>> upstream/master
        t.equal(check.Utts('pollo@f'), undefined);
        t.equal(check.Utts('pollo@f fried'), undefined);
        t.equal(check.Utts('pollo@f frito@f'), undefined);
        t.equal(check.Utts('@lpollo@l'), undefined);
        t.equal(check.Utts('@lpollo@l fried'), undefined);
        t.equal(check.Utts('@lpollo@l @lfried@l'), undefined);
        t.equal(
            check.Utts('@fpollo'),
            'Utts = `@fpollo` @f must be at end of word',
            "check location of @f"
        );
        t.equal(
            check.Utts('fried @fpollo'),
            'Utts = `fried @fpollo` @f must be at end of word',
            "check location of @f"
        );
        t.equal(
            check.Utts('po@fllo'),
            'Utts = `po@fllo` @f must be at end of word',
            "check location of @f"
        );
        t.equal(
            check.Utts('pollo@l'),
            'Utts = `pollo@l` @l must be at beginning of word',
            "check beginning for @l"
        );
        t.equal(
            check.Utts('pollo@l fried'),
            'Utts = `pollo@l fried` @l must be at beginning of word',
            "check beginning for @l"
        );
        t.equal(
            check.Utts('@lpollo'),
            'Utts = `@lpollo` @l must be at end of word',
            "check end for @l"
        );
        t.equal(
            check.Utts('pol@lo'),
            'Utts = `pol@lo` @l must be at end of word',
            "check beginning and end for @l"
        );
        t.equal(
            check.Utts('p@ollo'),
            'Utts = `p@ollo` entry can only have @f or @l',
            "check beginning and end for @l"
        );
        t.equal(
            check.Utts(' hello'),
            'Utts = ` hello` entry cannot begin with space',
            "check beginning for space"
        );
        t.equal(
            check.Utts('hello '),
            'Utts = `hello ` entry cannot end with space',
            "check end for space"
        );
        t.equal(
            check.Utts('heLlo'),
<<<<<<< HEAD
            'Utts = `heLlo` entry cannot contain capital letter unless proper noun',
            "check for capital letter"
        );
        t.equal(
            check.Utts('heLlo World'),
            'Utts = `heLlo World` entry cannot contain capital letter unless proper noun',
=======
            'Utts = `heLlo` entry cannot contain capital letter',
>>>>>>> upstream/master
            "check for capital letter"
        );
        t.equal(
            check.Utts('-'),
            'Utts = `-` entry cannot contain - or --',
            "check for - and --"
        );
        t.equal(
            check.Utts('#'),
            'Utts = `#` entry cannot contain # or ##',
            "check for # and ##"
        );
        t.equal(
            check.Utts('--'),
            'Utts = `--` entry cannot contain - or --',
            "check for - and --"
        );
        t.equal(
            check.Utts('##'),
            'Utts = `##` entry cannot contain # or ##',
            "check for # and ##"
        );
        t.equal(
            check.Utts('----'),
            'Utts = `----` entry can only contain ---',
            "check for ----"
        );
        t.equal(
            check.Utts('####'),
            'Utts = `####` entry can only contain ###',
            "check for ####"
        );
        t.end();
    });

    t.end();
});


test('validate', function (t) {

    var records = [
            {"_ID": "22", "ROW": "1", "lrb": "L", "time": "00:00:00", "gtype": "C", "gsrel": "ADD", "Key": "1", "Utts": "---"},
            {"_ID": "22", "ROW": "2", "lrb": "L+L", "time": "00:00:00", "gtype": "C", "gsrel": "ADD", "Key": "1", "Utts": "---"},
            {"_ID": "22", "ROW": "3", "lrb": "L+", "time": " 30:00:00", "gtype": "C", "gsrel": "ADD ", "Key": "1", "Utts": "---"},
            {"_ID": "22", "ROW": "4", "lrb": "L+R+B", "time": "23:59:59", "gtype": "C", "gsrel": "ADDD", "Key": "1", "Utts": "---"},
            {"_ID": "22", "ROW": "5", "lrb": "L+R+X", "time": "00:0:00", "gtype": "C", "gsrel": "ADD", "Key": "1", "Utts": "---"}
        ],
        Validator = require('valid-records'),
        valid = new Validator(check),
        results = valid.validate(records);

    t.plan(2);
    t.equal(results.report.invalid, 6);
    t.equal(Object.keys(results.report.errors).length, 3, "3 lines have errors");
});
