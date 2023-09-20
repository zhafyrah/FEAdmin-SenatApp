import Resource from "./resource"

const resource = new Resource('dokumen-senat')

export function listDokSenatRequest(page, search) {
    const result = resource.get({
        page: parseInt(page),
        search: search
    });

    return result
}

export function getById(id) {
    return resource.get({}, id)
}

export function insertDokSenatRequest(data) {
    return resource.store(data, 'save', true);
}

export function updateDokSenatRequest(beritaId, data) {
    return resource.update(beritaId, data, 'update', true)
}

export function deleteDokSenatRequest(beritaId) {
    return resource.destroy('delete', beritaId)
}