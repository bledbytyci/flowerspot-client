import User from "../user/user";

export default class Flower {
	constructor(flower = {}){
		const {id, name, latin_name, sightnings, profile_picture, favorite, description, created_by} = flower;

		this.id = id || '';
		this.name = name || '';
		this.latin_name = latin_name || '';
		this.sightnings = sightnings || '';
		this.profile_picture = profile_picture || '';
		this.description = description || '';
		this.favorite = favorite || false;
		this.created_by = new User(created_by);
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
