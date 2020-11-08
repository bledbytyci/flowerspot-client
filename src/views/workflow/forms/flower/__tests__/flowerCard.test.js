import React from 'react';
import { FlowerCard } from '../flowerCard.jsx';
import { shallow, mount } from 'enzyme';
import Flower from '../../../../../flower/flower.js';

jest.unmock('../flowerCard.jsx');
jest.unmock('../../../../../flower/flower.js');

describe('FlowerCard component', () => {
    it('component is being rendered', () => {
		const props = {
			flower: new Flower(),
			isLoggedIn: false,
		}
		const flowerCardComponent = shallow(<FlowerCard {...props} />);
        expect(flowerCardComponent).not.toBe(null);
	});

	it('renders flowerCard without crashing', () => {
		const props = {
			flower: new Flower({name: 'test', latin_name: 'test'}),
			isLoggedIn: false,
			getFlowers: jest.fn(),
		}

		const flowerCardComponent = mount(<FlowerCard {...props} />);
		const flowerHeading = flowerCardComponent.find(".flower-heading").text();
		expect(flowerHeading).toEqual(props.flower.name)
	})

});