export default class EventSystem {
    env = void 0;
    option = {};

    constructor(option) {
        let default_option = {
            env: window,
        };

        this.option = Object.assign(default_option, option || {});
    }
}

