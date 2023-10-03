import Resource from "./resource"

const resource = new Resource('users')

export function listUserRequest(page, search) {
    const result = resource.get({
        page: parseInt(page),
        search: search
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
    return resource.updateFormData(userId, data, 'update')
}

export function deleteUserRequest(userId) {
    return resource.destroy('delete', userId)
}