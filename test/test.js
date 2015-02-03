"use strict";

var chai = require("chai");
var bmi = require("./../index");

var expect = chai.expect;

describe("Calculate BMI", function() {

    it("Correctly calculates imperial bmi with numbers", function(done) {

        var height = 72;
        var weight = 150;
        var hUnit = "inches";
        var wUnit = "pounds";
        var value = bmi.getBMI(height, hUnit, weight, wUnit);

        expect(value).to.not.be.an.instanceof(Error);
        expect(value).to.equal(20.34);
        done();
    });

    it("Correctly calculates metric bmi with numbers", function(done) {

        var height = 1.8;
        var weight = 68;
        var hUnit = "meters";
        var wUnit = "kilograms";
        var value = bmi.getBMI(height, hUnit, weight, wUnit);

        expect(value).to.not.be.an.instanceof(Error);
        expect(value).to.equal(20.99);
        done();
    });

    it("Correctly calculates with number strings", function(done) {

        var height = "72";
        var weight = "150";
        var hUnit = "inches";
        var wUnit = "pounds";
        var value = bmi.getBMI(height, hUnit, weight, wUnit);

        expect(value).to.not.be.an.instanceof(Error);
        expect(value).to.equal(20.34);
        done();
    });

    it("Returns the correct error message with a bad height", function(done) {

        var height = NaN;
        var weight = "150";
        var hUnit = "inches";
        var wUnit = "pounds";
        var value = bmi.getBMI(height, hUnit, weight, wUnit);

        expect(value).to.be.an.instanceof(Error);
        expect(value).to.have.property("message").that.equals("Invalid height");
        done();
    });

    it("Returns the correct error message with a bad weight", function(done) {

        var height = 72;
        var weight = "abc";
        var hUnit = "inches";
        var wUnit = "pounds";
        var value = bmi.getBMI(height, hUnit, weight, wUnit);

        expect(value).to.be.an.instanceof(Error);
        expect(value).to.have.property("message").that.equals("Invalid weight");
        done();
    });

    it("Returns an error with an incorrect unit", function(done) {

        var height = 72;
        var weight = 150;
        var hUnit = "inches";
        var wUnit = "wrong unit";
        var value = bmi.getBMI(height, hUnit, weight, wUnit);

        expect(value).to.be.an.instanceof(Error);
        done();
    });

    it("Returns an error if units aren't strings", function(done) {

        var height = 72;
        var weight = 150;
        var hUnit = null;
        var wUnit = null;
        var value = bmi.getBMI(height, hUnit, weight, wUnit);

        expect(value).to.be.an.instanceof(Error);
        done();
    })
});
