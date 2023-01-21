import axios from "axios";

const API = axios.create({ baseURL: "https://memoriesapp-mern-project.herokuapp.com" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchPosts = (page) => {
  return API.get(`/posts?page=${page}`);
};
export const comment = (value,id)=>{
  return API.post(`/posts/${id}/commentPost`,{value})
}
export const fetchPost = (id)=>{
  return API.get(`/posts/${id}`)
}
export const fetchPostBySearch = (searchQuery) => {
  
  return API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
};
export const createPost = (newPost) => {
  return API.post("/posts", newPost);
};
export const updatePost = (id, updatedPost) => {
  return API.patch(`/posts/${id}`, updatePost);
};
export const deletePost = (id) => {
  return API.delete(`/posts/${id}`);
};
export const likePost = (id) => {
  return API.patch(`/posts/${id}/likePost`);
};

export const signin = (formData) => {
  return API.post("/user/signin", formData);
};
export const signup = (formData) => {
  return API.post("/user/signup", formData);
};
