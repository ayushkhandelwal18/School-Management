const Joi = require('joi');

const validateAddSchool = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().trim().min(1).required().messages({
            'string.empty': 'Name cannot be empty',
            'any.required': 'Name is required'
        }),
        address: Joi.string().trim().min(1).required().messages({
            'string.empty': 'Address cannot be empty',
            'any.required': 'Address is required'
        }),
        latitude: Joi.number().min(-90).max(90).required().messages({
            'number.base': 'Latitude must be a number',
            'number.min': 'Latitude must be between -90 and 90',
            'number.max': 'Latitude must be between -90 and 90',
            'any.required': 'Latitude is required'
        }),
        longitude: Joi.number().min(-180).max(180).required().messages({
            'number.base': 'Longitude must be a number',
            'number.min': 'Longitude must be between -180 and 180',
            'number.max': 'Longitude must be between -180 and 180',
            'any.required': 'Longitude is required'
        })
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
            data: null
        });
    }
    next();
};

const validateListSchools = (req, res, next) => {
    const schema = Joi.object({
        latitude: Joi.number().min(-90).max(90).required().messages({
            'number.base': 'Latitude must be a number',
            'number.min': 'Latitude must be between -90 and 90',
            'number.max': 'Latitude must be between -90 and 90',
            'any.required': 'Latitude query parameter is required'
        }),
        longitude: Joi.number().min(-180).max(180).required().messages({
            'number.base': 'Longitude must be a number',
            'number.min': 'Longitude must be between -180 and 180',
            'number.max': 'Longitude must be between -180 and 180',
            'any.required': 'Longitude query parameter is required'
        })
    });

    const { error } = schema.validate(req.query);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
            data: null
        });
    }
    next();
};

module.exports = {
    validateAddSchool,
    validateListSchools
};
