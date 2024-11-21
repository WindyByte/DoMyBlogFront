import { createStore } from 'vuex';

const store = createStore({
    state: {
        posts: [],
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
    },
    actions: {
        async fetchPosts({ commit }) {
            const response = await fetch('http://127.0.0.1:8080/api/v1/login/ping');
            const data = await response.json();
            commit('setPosts', data);
        },
    },
});

export default store;
