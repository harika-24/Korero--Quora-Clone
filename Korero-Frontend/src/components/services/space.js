import axios from "axios";

class SpaceDataService {

    getAllSpaces(){
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/home/spaces`);
    }
    
}

export default new SpaceDataService();