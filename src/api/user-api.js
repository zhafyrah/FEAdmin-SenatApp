import Resource from "./resource"

const resource = new Resource('users')

export function listUserRequest(page) {
    const result = resource.get({
        page: parseInt(page)
    });

    return result
}

export function getById(id) {
    return resource.get({}, id)
}

export function insertUserRequest(data) {
    return resource.store(data, 'save', true);
}

export function updateUserRequest(userId, data) {
    return resource.update(userId, data, 'update')
}

export function deleteUserRequest(userId) {
    return resource.destroy('delete', userId)
}