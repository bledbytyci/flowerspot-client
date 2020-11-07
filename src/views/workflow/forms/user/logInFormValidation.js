import ValidationModel from '../../../../setup/validationModel';

const ATTRIBUTES = {
	EMAIL: 'email',
	PASSWORD: 'password'
}

const isNullOrWhitespace = (input, length = 1) => {
    if(typeof input === 'undefined' || input === null) {
        return true;
    }
    if(typeof input !== 'string') {
        return false;
    }

    return input.replace(/\s/g, '').length < length;
};

const validateEmail = (email) => {
        const regex = /.+@.+\.[A-Za-z]+$/;

        return regex.test(email);
}

const validateLogInForm = (user) => {
    const validationModel = new ValidationModel();

        if(isNullOrWhitespace(user[ATTRIBUTES.EMAIL])) {
                validationModel.validationMessages = validationModel.validationMessages.push('Email address is required');
                validationModel.isValid = false;
		}

        if(isNullOrWhitespace(user[ATTRIBUTES.PASSWORD])) {
                validationModel.validationMessages = validationModel.validationMessages.push('Passwrod is required');
                validationModel.isValid = false;
		}

        if(isNullOrWhitespace(user[ATTRIBUTES.PASSWORD], 6)) {
                validationModel.validationMessages = validationModel.validationMessages.push('Password is too short (minimum is 6 characters)');
                validationModel.isValid = false;
        }

        if(!validateEmail(user[ATTRIBUTES.EMAIL])) {
                validationModel.validationMessages = validationModel.validationMessages.push('Please enter a valid email address');
                validationModel.isValid = false;
        }

    return validationModel;
};

export default validateLogInForm;