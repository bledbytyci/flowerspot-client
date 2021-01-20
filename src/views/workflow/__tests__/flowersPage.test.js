import React from 'react';
import { FlowersPage } from '../flowersPage.jsx';
import { shallow} from 'enzyme';
import { List } from 'immutable';
import toJson from 'enzyme-to-json';

jest.unmock('../flowersPage.jsx');
jest.unmock('../forms/flower/flowerCard.jsx');
jest.unmock('../../../flower/flower.js');

describe('FlowersPage component', () => {
    it('component is being rendered', () => {
		const props = {
			flowers: List(),
			isLoggedIn: false,
			getFlowers: jest.fn()
		}
		const flowersPageComponent = shallow(<FlowersPage {...props} />);
        expect(flowersPageComponent).not.toBe(null);
	});
});

describe('snapshots', () => {
	it('App snapshot', () => {
		const props = {
			flowers: List(),
			isLoggedIn: false,
			getFlowers: jest.fn()
		}
		const flowersPageComponent = shallow(<FlowersPage {...props} />);
		expect(toJson(flowersPageComponent)).toMatchSnapshot();
	})
})