import Resource from "./resource"

const resource = new Resource('berita')

export function listBeritaRequest(page, search) {
    const result = resource.get({
        page: parseInt(page),
        search: search
    });

    return result
}

export function getById(id) {
    return resource.get({}, id)
}

export function insertBeritaRequest(data) {
    return resource.store(data, 'save', true);
}

export function updateBeritaRequest(beritaId, data) {
    return resource.update(beritaId, data, 'update', true)
}

export function deleteBeritaRequest(beritaId) {
    return resource.destroy('delete', beritaId)
}