import Resource from "./resource"

const resource = new Resource('sambutan')

export function listSambutanRequest(page) {
    const result = resource.get({
        page: parseInt(page)
    });

    return result
}

export function getById(id) {
    return resource.get({}, id)
}

export function insertSambutanRequest(data) {
    return resource.store(data, 'save', true);
}

export function updateSambutanRequest(sambutanId, data) {
    return resource.update(sambutanId, data, 'update', true)
}

export function deleteSambutanRequest(sambutanId) {
    return resource.destroy('delete', sambutanId)
}