import Resource from "./resource"

const resource = new Resource('keanggotaan')

export function listKeanggotaanRequest(page) {
    const result = resource.get({
        page: parseInt(page)
    });

    return result
}

export function getById(id) {
    return resource.get({}, id)
}

export function insertKeanggotaanRequest(data) {
    return resource.store(data, 'save', true);
}

export function updateKeanggotaanRequest(keanggotaanId, data) {
    return resource.update(keanggotaanId, data, 'update', true)
}

export function deleteKeanggotaanRequest(keanggotaanId) {
    return resource.destroy('delete', keanggotaanId)
}