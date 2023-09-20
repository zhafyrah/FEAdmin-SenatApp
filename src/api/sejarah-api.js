import Resource from "./resource"

const resource = new Resource('sejarah')

export function listSejarahRequest(page) {
    const result = resource.get({
        page: parseInt(page)
    });

    return result
}

export function getById(id) {
    return resource.get({}, id)
}

export function insertSejarahRequest(data) {
    return resource.store(data, 'save', true);
}

export function updateSejarahRequest(sejarahId, data) {
    return resource.update(sejarahId, data, 'update', true)
}

export function deleteSejarahRequest(sejarahId) {
    return resource.destroy('delete', sejarahId)
}