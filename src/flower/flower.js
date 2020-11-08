export default class Flower {
	constructor(flower = {}){
		const {id, name, latin_name, sightings, profile_picture, favorite} = flower;

		this.id = id || '';
		this.name = name || '';
		this.latin_name = latin_name || '';
		this.sightings = sightings || '';
		this.profile_picture = profile_picture || '';
		this.favorite = favorite || false;
	}

	static mapFromApiList = flowers => {
        if(!flowers) {
            return [];
        }
        return flowers.map(flower => new Flower(flower));
	};
	
	static mapFromFavApiList = favFlowers => {
        if(!favFlowers) {
            return [];
        }
        return favFlowers.map(favFlower => new Flower(favFlower.flower));
	};
}
