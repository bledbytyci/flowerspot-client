import React from 'react';
import { Profile } from '../profile.jsx';
import { shallow} from 'enzyme';
import User from '../../../user/user.js';
import toJson from 'enzyme-to-json';

jest.unmock('../profile.jsx');
jest.unmock('../../../user/user.js');

describe('Profile component', () => {
    it('component is being rendered', () => {
		const props = {
			user: new User(),
			getProfile: jest.fn()
		}
		const profileComponent = shallow(<Profile {...props} />);
        expect(profileComponent).not.toBe(null);
		expect(props.getProfile).toBeCalled();
	});
});

describe('snapshots', () => {
	it('App snapshot', () => {
		const props = {
			user: new User(),
			getProfile: jest.fn()
		}
		const profileComponent = shallow(<Profile {...props} />);
		expect(toJson(profileComponent)).toMatchSnapshot();
	})
})
