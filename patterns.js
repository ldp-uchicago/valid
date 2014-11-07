'use strict';


// validation patterns for the `gsrel` column
//
function Gtype() {

    // basic code patterns
    this.code = {
        misc: 'C|E|FA|G|S',
        deictics: 'DS|DP(\\.nl)*|DSDP',
        reps: 'R\\.[adm](\\.(e|pp))*|R\\.met'
    };

    // pattern for all single codes
    this.single = [
        this.code.misc,
        this.code.deictics,
        this.code.reps
    ].join('|');

    // pattern for all code combinations
    this.complex = '^(' + this.single + ')((;|\/)(' + this.single + '))*$';

    // final regex based on the complex pattern
    this.regex = new RegExp(this.complex);

}

// test whether value matches final gtype regex
//
Gtype.prototype.test = function (value) {
    return this.regex.test(value);
};


// validation patterns for the `gsrel` column
//
function Gsrel() {

    // basic code patterns
    this.code = {
        simple: 'DA|MS|UC|X|ADD|RF|E',
        add:    'ADD\\.(err(\\.s)*|s|f|met|n[rs]|q|s)',
        rf:     'RF\\.[ap]',
        e:      'E\\.b'
    };

    // pattern for all single codes
    this.single = [
        this.code.simple,
        this.code.add,
        this.code.rf,
        this.code.e
    ].join('|');

    // pattern for all code combinations
    this.complex = '^(' + this.single + ')((;|\/)(' + this.single + '))*$';

    // final regex based on the complex pattern
    this.regex = new RegExp(this.complex);
}

// test whether value matches final gsrel regex
//
Gsrel.prototype.test = function (value) {
    return this.regex.test(value);
};


// add each validation pattern to the patterns prototype
//
function Patterns() { return this; }
Patterns.prototype.gtype = new Gtype();
Patterns.prototype.gsrel = new Gsrel();


// export instance of patterns prototype
//
module.exports = new Patterns();
