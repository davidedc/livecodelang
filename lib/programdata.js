/* global exports */

(function (exports) {

    'use strict';


    var ProgramData = function (data) {
        this.program = data;
        this.pos = 0;
    };

    ProgramData.prototype.pop = function () {
        var c;
        if (this.pos >= this.program.length) {
            c = null;
        } else {
            c = this.program[this.pos];
            this.pos += 1;
        }
        return c;
    };

    ProgramData.prototype.peek = function () {
        var c;
        if (this.pos >= this.program.length) {
            c = null;
        } else {
            c = this.program[this.pos];
        }
        return c;
    };

    exports.ProgramData = ProgramData;


}(typeof exports === 'object' && (exports || this)));

