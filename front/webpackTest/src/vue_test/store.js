const state = {
    test_id: 9527,
};
const getters = {
    getIsOddTestId(state) {
        return !(parseInt(state.test_id) % 2 === 0);
    }
};
const actions = {};
const mutations = {
    TEST_ID(state, id) {
        state.test_id = id;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};
