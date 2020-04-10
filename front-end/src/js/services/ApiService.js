import axios from 'axios';

const baseURL = "http://localhost:8090/data";

class ApiService {
	
	fetchData() {
		return axios.get(baseURL);
	}
}

export default ApiService;