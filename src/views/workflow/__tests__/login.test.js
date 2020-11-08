import React from 'react';
import { LogIn } from '../logIn.jsx';
import { shallow } from 'enzyme';
import ValidationModel from '../../../setup/validationModel.js';
import toJson from 'enzyme-to-json';

jest.unmock('../logIn.jsx');
jest.unmock('../../../user/user.js');
jest.unmock('../../../setup/validationModel.js');


const shallowOptions = {
    lifecycleExperimental: true,
    disableLifecycleMethods: false
};
describe('LogIn component', () => {
    it('component is being rendered', () => {
		const logInComponent = shallow(<LogIn />);
        expect(logInComponent).not.toBe(null);
	});

	it('sets showLogInSuccessModal to true after logging in', () => {
		const props = {
			isLoggedIn: false,
			validationModel: new ValidationModel()
		}
		
		const logInComponent = shallow(<LogIn {...props} />, shallowOptions);

		props.isLoggedIn = true;

		logInComponent.setProps(props);
        const currentState = logInComponent.state();

        expect(currentState.showLogInSuccessModal).toBe(true);
	});
});

describe('snapshots', () => {
	it('App snapshot', () => {
		const logInComponent = shallow(<LogIn />);
		expect(toJson(logInComponent)).toMatchSnapshot();
	})
})