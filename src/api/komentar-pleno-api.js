import Resource from "./resource"

const resource = new Resource('komentar-pleno')

export function listKomentarRequest(page, documentId) {
    const result = resource.get({
        page: parseInt(page),
        documentId: documentId
    });

    return result
}

export function insertKomentarRequest(data) {
    return resource.store(data, 'save', true);
}

export function deleteKomentarRequest(komentarId) {
    return resource.destroy('delete', komentarId)
}