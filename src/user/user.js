import moment from "moment";
export default class User {
	constructor(user = {}){

		const {id, email, password, first_name, last_name, date_of_birth, is_admin} = user; 

		this.id = id || '';
		this.email = email || '';
		this.password = password || '';
		this.first_name = first_name || '';
		this.last_name = last_name || '';
		this.is_admin = is_admin || false;
		this.date_of_birth = date_of_birth ? moment(date_of_birth) :  null; 
	}

	mapToSignUpApi() {
		const apiUser = {}
			apiUser.id = this.id;
			apiUser.email = this.email;
			apiUser.password = this.password;
			apiUser.first_name = this.first_name;
			apiUser.last_name = this.last_name;
			apiUser.date_of_birth = this.date_of_birth.toDate();

			return apiUser;
	}

	
	mapToLogInApi() {
		const apiUser = {}
			apiUser.email = this.email;
			apiUser.password = this.password;

			return apiUser;
	}
}