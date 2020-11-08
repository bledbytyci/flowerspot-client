import React from 'react';
import { SignUp } from '../signUp.jsx';
import { shallow } from 'enzyme';
import ValidationModel from '../../../setup/validationModel.js';
import toJson from 'enzyme-to-json';

jest.unmock('../signUp.jsx');
jest.unmock('../../../user/user.js');
jest.unmock('../../../setup/validationModel.js')

const shallowOptions = {
    lifecycleExperimental: true,
    disableLifecycleMethods: false
};

describe('SignUp component', () => {
    it('component is being rendered', () => {

		const signUpComponent = shallow(<SignUp />);
        expect(signUpComponent).not.toBe(null);
	});

	it('sets showSignUpSuccessModal to true after creating a new user', () => {
		const props = {
			isCreating: true,
			validationModel: new ValidationModel()
		}
		
		const signUpComponent = shallow(<SignUp {...props} />, shallowOptions);

		props.isCreating = false;

		signUpComponent.setProps(props);
        const currentState = signUpComponent.state();

        expect(currentState.showSignUpSuccessModal).toBe(true);
	});
});

describe('snapshots', () => {
	it('App snapshot', () => {
		const signUpComponent = shallow(<SignUp />);
		expect(toJson(signUpComponent)).toMatchSnapshot();
	})
})