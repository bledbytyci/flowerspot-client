export default class User {
	constructor(user = {}){

		const {id, email, password, first_name, last_name, date_of_birth} = user; 

		this.id = id || '';
		this.email = email || '';
		this.password = password || '';
		this.first_name = first_name || '';
		this.last_name = last_name || '';
		this.date_of_birth = date_of_birth || '';
	}

	mapToSignUpApi() {
		const apiUser = {}
			apiUser.email = this.email;
			apiUser.password = this.password;
			apiUser.first_name = this.first_name;
			apiUser.last_name = this.last_name;
			apiUser.date_of_birth = this.date_of_birth;

			return apiUser;
	}

	
	mapToLogInApi() {
		const apiUser = {}
			apiUser.email = this.email;
			apiUser.password = this.password;

			return apiUser;
	}
}