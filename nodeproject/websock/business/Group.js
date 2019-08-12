// let state = void 0;
let cache = {};

// function setState(data) {
//     state = data;
// }

function getInitData(data) {
    let data_lst =  data.data_lst;
    let community = data.community;
    let result = cache[community];

    if (!result) {
        result = {};
        let bad_point_position_obj = {};
        let current_uid_position_obj = {};
        let target_position_obj = {};

        let hierarchy_distribute_sphere_radius = 0;
        let target_and_uid_relation_obj = {};

        for (var hierarchy = 0, hierarchy_length = data_lst.length; hierarchy < hierarchy_length; hierarchy++) {
            let uid_lst = data_lst[hierarchy];
            hierarchy_distribute_sphere_radius = hierarchy_distribute_sphere_radius + uid_lst.length / 10 * 60;

            if (hierarchy === 0) {
                for (var uid of uid_lst) {
                    let bad_uid_position = getPositionByRandomSphere(hierarchy_distribute_sphere_radius, { x: 0, y: 0, z: 0});
                    bad_point_position_obj[uid.uid] = bad_uid_position;

                    for (var target_point of uid.target_list) {
                        if (target_and_uid_relation_obj[target_point.target] === void 0) {
                            target_and_uid_relation_obj[target_point.target] = {
                                type: target_point.type.toString(),
                            };

                            target_and_uid_relation_obj[target_point.target][hierarchy] = [bad_uid_position];
                        }
                        else {
                            if (target_and_uid_relation_obj[target_point.target][hierarchy]) {
                                target_and_uid_relation_obj[target_point.target][hierarchy].push(bad_uid_position);
                            }
                            else {
                                target_and_uid_relation_obj[target_point.target][hierarchy] = [bad_uid_position];
                            }
                        }
                    }
                }
            }
            else {
                for (var uid of uid_lst) {
                    let pre_hierarchy_uid_relate_current_uid_positions = [];

                    for (var target_point of uid.target_list) {

                        if (target_and_uid_relation_obj[target_point.target]) {
                            let uid_relate_target_positions = target_and_uid_relation_obj[target_point.target][hierarchy - 1];

                            if (uid_relate_target_positions) {
                                pre_hierarchy_uid_relate_current_uid_positions = pre_hierarchy_uid_relate_current_uid_positions.concat(uid_relate_target_positions);
                            }
                        }
                    }

                    let current_uid_position = {
                        x: 0,
                        y: 0,
                        z: 0,
                    };

                    if (pre_hierarchy_uid_relate_current_uid_positions.length !== 0) {
                        current_uid_position = calculateHierarchyUidPosition(pre_hierarchy_uid_relate_current_uid_positions, hierarchy_distribute_sphere_radius);
                        current_uid_position_obj[uid.uid] = current_uid_position;
                    }
                    else {
                        console.error(`pre_hierarchy_uid_relate_current_uid_positions length is 0, uid is ${uid.uid}`);
                    }

                    for (var target_point of uid.target_list) {
                        if (target_and_uid_relation_obj[target_point.target] === void 0) {
                            target_and_uid_relation_obj[target_point.target] =  {
                                type: target_point.type.toString(),
                            };

                            target_and_uid_relation_obj[target_point.target][hierarchy] = [current_uid_position];
                        }
                        else {
                            if (target_and_uid_relation_obj[target_point.target][hierarchy]) {
                                target_and_uid_relation_obj[target_point.target][hierarchy].push(current_uid_position);
                            }
                            else {
                                target_and_uid_relation_obj[target_point.target][hierarchy] = [current_uid_position];
                            }
                        }
                    }
                }
            }
        }

        let keys = Object.keys(target_and_uid_relation_obj);

        for (var key of keys) {
            let target_point_obj = target_and_uid_relation_obj[key];
            let uid_position_lst = [];

            for (var hierarchy = 0, length = data_lst.length; hierarchy < length; hierarchy++) {
                if (target_point_obj[hierarchy]) {
                    uid_position_lst = uid_position_lst.concat(target_point_obj[hierarchy]);
                }
            }

            target_position_obj[key] = calculateCenterPosition(uid_position_lst);
        }

        result['bad_point_position_obj'] = bad_point_position_obj;
        result['current_uid_position_obj'] = current_uid_position_obj;
        result['target_position_obj'] = target_position_obj;

        cache[community] = result;
    }

    return {
        data: result,
        // state: state,
    };
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

function calculateHierarchyUidPosition(positions, radius) {
    let position = {
        x: 0,
        y: 0,
        z: 0,
    };

    let count = positions.length;
    let center = {
        x: 0,
        y: 0,
        z: 0,
    };

    for (var i = 0; i < count; i++) {
        center.x += positions[i].x;
        center.y += positions[i].y;
        center.z += positions[i].z;
    }

    center.x =  center.x / count;
    center.y =  center.y / count;
    center.z =  center.z / count;

    let vector = Math.sqrt(Math.pow(center.x, 2) + Math.pow(center.y, 2) + Math.pow(center.z, 2));

    // position.x = center.x * radius / vector + Math.random() * 100 - 50;
    // position.y = center.y * radius / vector + Math.random() * 100 - 50;
    // position.z = center.z * radius / vector + Math.random() * 100 - 50;

    position.x = center.x * radius / vector;
    position.y = center.y * radius / vector;
    position.z = center.z * radius / vector;

    position = getPositionByRandomSphere(40, position);
    // position = this.getPositionByRandomSphere(500, position);


    return position;
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

function calculateCenterPosition(positions, radius = 40) {
    let center = {
        x: 0,
        y: 0,
        z: 0,
    };

    let count = positions.length;

    for (var i = 0; i < count; i++) {
        let position = positions[i];
        center.x += position.x;
        center.y += position.y;
        center.z += position.z;
    }


    // center.x = center.x / count + Math.random() * 80;
    // center.y = center.y / count + Math.random() * 80;
    // center.z = center.z / count + Math.random() * 80;

    center.x = center.x / count;
    center.y = center.y / count;
    center.z = center.z / count;

    radius = Math.random() * 20 + 10;
    // radius = 0;

    center = getPositionByRandomSphere(radius, center);
    // center = this.getPositionByRandomSphere(500, center);

    return center;
}

module.exports = {
    // setState,
    getInitData,
};
