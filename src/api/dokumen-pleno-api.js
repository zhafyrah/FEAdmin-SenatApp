import Resource from "./resource"

const resource = new Resource('dokumen-pleno')

export function listDokPlenoRequest(page) {
    const result = resource.get({
        page: parseInt(page)
    });

    return result
}

export function getById(id) {
    return resource.get({}, id)
}

export function insertDokPlenoRequest(data) {
    return resource.store(data, 'save', true);
}

export function updateDokPlenoRequest(dokId, data) {
    return resource.update(dokId, data, 'update', true)
}

export function deleteDokPlenoRequest(dokId) {
    return resource.destroy('delete', dokId)
}