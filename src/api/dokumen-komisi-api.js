import Resource from "./resource"

const resource = new Resource('dokumen-komisi')

export function listDokKomisiRequest(page, search) {
    const result = resource.get({
        page: parseInt(page),
        search: search
    });

    return result
}

export function getById(id) {
    return resource.get({}, id)
}

export function insertDokKomisiRequest(data) {
    return resource.store(data, 'save', true);
}

export function updateDokKomisiRequest(dokId, data) {
    return resource.updateFormData(dokId, data, 'update', true)
}

export function deleteDokKomisiRequest(dokId) {
    return resource.destroy('delete', dokId)
}