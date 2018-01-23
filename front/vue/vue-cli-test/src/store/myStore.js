const state = {
    name: '',
}

const mutations = {
    NAME(state, name) {
        state.name = name;
    }
}

const action = {
    Name(context, name) {
        context.commit('NAME', name);
    }
}

export default {
    state,
    mutations,
    action,
}