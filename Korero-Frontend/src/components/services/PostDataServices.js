import axios from "axios";

class PostDataService {

    getUserFeed(){
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/home/feed`);
    }

    getUserPosts(id){
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/home/post/${id}`);
    }

    updatePost(post){
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/home/post`,post);
    }

    addPost(post){
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/home/post`,post);
    }

    deletePost(postid){
        return axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/v1/home/post`,{data:{_id : postid}});
    }




    
}

export default new PostDataService();