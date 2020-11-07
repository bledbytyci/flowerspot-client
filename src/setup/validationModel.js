import { List } from 'immutable';

class ValidationModel {
    constructor() {
        this.isValid = true;
        this.validationMessages = List([]);
    }
}

export default ValidationModel;
