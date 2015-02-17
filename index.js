'use strict';

/**
 *
 * @param {Number|String} height
 * @param {String} heightUnit
 * @param {Number|String} weight
 * @param {String} weightUnit
 * @returns {Number|Error}
 */

exports.getBMI = function(height, heightUnit, weight, weightUnit) {

    if (arguments.length !== 4) {
        return new Error("Function requires 4 inputs: height, height unit, weight, weight unit");
    }


    height = parseFloat(height);
    weight = parseFloat(weight);

    // validate height and weight
    try {

        validateValues(height, weight);
    } catch (error) {
        return error
    }

    try {

        heightUnit = heightUnit.toLowerCase();
        weightUnit = weightUnit.toLowerCase();
        var unitType = getUnitType(heightUnit, weightUnit);
    } catch(error) {
        return error
    }
    return calculateBMI(height, weight, unitType);
};

/**
 * Checks if the height and weight values are valid
 *
 * @param height
 * @param weight
 * @returns {Error}
 */

function validateValues (height, weight) {

    if (!height) {
        throw new Error("Invalid height");
    }
    if (!weight) {
        throw new Error("Invalid weight");
    }
}

/**
 * Gets the unit type used in BMI calculation
 *
 * @param {String} heightUnit
 * @param {String} weightUnit
 * @returns {String|Error}
 */

function getUnitType(heightUnit, weightUnit) {

    var imperialHeight = false,
        metricHeight = false,
        imperialWeight = false,
        metricWeight = false;

    if ( heightUnit === "inches" || heightUnit === "feet" ) {
        imperialHeight = true;
    } else if ( heightUnit === "meters" || heightUnit === "m" ) {
        metricHeight = true;
    }

    if ( weightUnit === "pounds" || weightUnit === "lbs" ) {
        imperialWeight = true;
    } else if ( weightUnit === "kilograms" || weightUnit === "kg" ) {
        metricWeight = true;
    }

    if (metricHeight && metricWeight) {
        return "metric";
    } else if (imperialHeight && imperialWeight) {
        return "imperial";
    } else {
        throw new Error("Invalid Unit Types\n\n" +
        "Acceptable unit types:\n" +
        "Height: 'meters', 'm', 'inches' \n" +
        "Weight: 'kilograms', 'kg', 'pounds', 'lbs'\n\n");
    }
}

/**
 * Calculates BMI based on the measuring system
 *
 * @param {Number} height
 * @param {Number} weight
 * @param {String} type
 * @returns {Number|Error}
 */

function calculateBMI(height, weight, type) {

    var bmi = weight / (height * height);

    if (type === "imperial") {
        return Math.round( bmi * 703 * 10 ) / 10;
    }
    if (type === "metric") {
        return Math.round( bmi * 10) / 10;
    } else {
        return new Error("Unable to calculate BMI");
    }
}
