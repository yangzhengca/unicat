import axios from 'axios';

const API =axios.create({ baseURL: 'http://localhost:5000' })

API.interceptors.request.use(( req ) => {
    if(localStorage.getItem('profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})

// URL for deploy to heroku
// const url = 'https://surpasslabs.herokuapp.com/posts';

// URL for dev env
// const url = 'http://localhost:5000/posts';

export const fetchPosts = () => API.get('/posts');

// this code failed -- difference "{}"
// export const fetchPostsBySearch = (searchQuery) => {
//     API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
// }

export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);


export const createPost = (newPost) => API.post('/posts', newPost);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);


export const signIn = (formData) => API.post('/user/signin', formData)

export const signUp = (formData) => API.post('/user/signup', formData)

