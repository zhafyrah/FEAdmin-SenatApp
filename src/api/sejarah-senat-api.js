import Resource from "./resource"

const resource = new Resource('sejarah-senat')

export function listSejarahSenatRequest(page) {
    const result = resource.get({
        page: parseInt(page)
    });

    return result
}

export function getById(id) {
    return resource.get({}, id)
}

export function insertSejarahSenatRequest(data) {
    return resource.store(data, 'save', true);
}

export function updateSejarahSenatRequest(sejarahSenatId, data) {
    return resource.update(sejarahSenatId, data, 'update', true)
}

export function deleteSejarahSenatRequest(sejarahSenatId) {
    return resource.destroy('delete', sejarahSenatId)
}