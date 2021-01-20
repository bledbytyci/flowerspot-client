import ValidationModel from '../../../../setup/validationModel';

const ATTRIBUTES = {
	NAME: 'name',
	LATIN_NAME: 'latin_name',
	DESCRIPTION: 'description',
	PROFILE_PICTURE: 'profile_picture'
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

const validateFlowerForm = (flower) => {
    const validationModel = new ValidationModel();

        if(isNullOrWhitespace(flower[ATTRIBUTES.NAME])) {
                validationModel.validationMessages = validationModel.validationMessages.push('Name is required');
                validationModel.isValid = false;
		}

        if(isNullOrWhitespace(flower[ATTRIBUTES.LATIN_NAME])) {
                validationModel.validationMessages = validationModel.validationMessages.push('Latin name is required');
                validationModel.isValid = false;
		}

        if(isNullOrWhitespace(flower[ATTRIBUTES.DESCRIPTION])) {
                validationModel.validationMessages = validationModel.validationMessages.push('Description is required');
                validationModel.isValid = false;
		}

    return validationModel;
};

export default validateFlowerForm;