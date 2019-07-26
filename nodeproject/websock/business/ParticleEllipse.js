let cache = [];
let state = void 0;

function getInitData(lst) {
    if (cache.length === 0) {
        for (var bad_point_group of lst) {
            let center_position =  createClickPointPosition();
            let group_user_count = bad_point_group.number;

            for (var j = 0; j < group_user_count; j++) {
                let position = getPositionByRandomSphere(50, center_position);
                cache.push(position.x + 200 * Math.random() - 100);
                cache.push(position.y + 200 * Math.random() - 100);
                cache.push(position.z + 200 * Math.random() - 100);
            }
        }
    }

    return {
        cache,
        state,
    };
}

function createClickPointPosition() {
    return {
        x: 10000 * Math.random() - 5000,
        y: 1000 * (2 * Math.random() - 0.8),
        z: 10000 * Math.random() - 5000,
    }
}

function getPositionByRandomSphere(radius = 10, origin = { x: 0, y: 0, z: 0 }) {
    let u = Math.random();
    let v = Math.random();
    let theta = 2 * Math.PI * u;
    let phi = Math.acos(2 * v - 1);
    let x = Math.sin(theta) * Math.sin(phi);
    let y = Math.cos(theta) * Math.sin(phi);
    let z = Math.cos(phi);

    return {
        x: x * radius + origin.x,
        y: y * radius + origin.y,
        z: z * radius + origin.z
    }
}

function setState(data) {
    state = data;
}

module.exports = {
    getInitData,
    setState,
};


