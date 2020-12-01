import ValidationModel from '../../../../setup/validationModel';

const ATTRIBUTES = {
	FIRST_NAME: 'first_name',
	LAST_NAME: 'last_name',
	EMAIL: 'email',
	DATE_OF_BIRTH: 'date_of_birth',
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

const validateSignUpForm = (user, includePassword = true) => {
    const validationModel = new ValidationModel();

        if(isNullOrWhitespace(user[ATTRIBUTES.FIRST_NAME])) {
                validationModel.validationMessages = validationModel.validationMessages.push('First name is required');
                validationModel.isValid = false;
	}

        if(isNullOrWhitespace(user[ATTRIBUTES.LAST_NAME])) {
                validationModel.validationMessages = validationModel.validationMessages.push('Last name is required');
                validationModel.isValid = false;
	}
        if(includePassword) {
                if(isNullOrWhitespace(user[ATTRIBUTES.EMAIL])) {
                        validationModel.validationMessages = validationModel.validationMessages.push('Email address is required');
                        validationModel.isValid = false;
                }
        }

        if(isNullOrWhitespace(user[ATTRIBUTES.DATE_OF_BIRTH])) {
                validationModel.validationMessages = validationModel.validationMessages.push('Date of birth is required');
                validationModel.isValid = false;
	}
        if(includePassword){
                if(isNullOrWhitespace(user[ATTRIBUTES.PASSWORD])) {
                        validationModel.validationMessages = validationModel.validationMessages.push('Passwrod is required');
                        validationModel.isValid = false;
                }

                if(isNullOrWhitespace(user[ATTRIBUTES.PASSWORD], 6)) {
                        validationModel.validationMessages = validationModel.validationMessages.push('Password is too short (minimum is 6 characters)');
                        validationModel.isValid = false;
                }
        }

        if(!validateEmail(user[ATTRIBUTES.EMAIL])) {
                validationModel.validationMessages = validationModel.validationMessages.push('Please enter a valid email address');
                validationModel.isValid = false;
        }

    return validationModel;
};

export default validateSignUpForm;