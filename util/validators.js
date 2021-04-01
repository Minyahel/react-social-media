const validator = require('email-validator');

module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {};
    if(username.trim() === '') {
        errors.username = 'Username must not be empty';
    }
    if(email.trim() === '') {
        errors.email = 'Email must not be empty';
    } else {
        if (!validator.validate(email)) {
            errors.email = 'Email must be a valid email address';
        }
    }
    if(password === '') {
        errors.password = 'Password must not be empty'
    } else if(password !== confirmPassword) {
        errors.confirmPassword = 'Passwords must match';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
   
}