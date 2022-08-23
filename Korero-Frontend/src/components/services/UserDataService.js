import axios from "axios";

class UserDataService {

    getAllUsers(){
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/home/user`);
    }

    addUser(user){
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/home/user`, user);
    }
    getUser(userId){
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/home/user/${userId}`);
    }
    updateUser(data){
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/home/user`, data);
    }
    
}

export default new UserDataService();