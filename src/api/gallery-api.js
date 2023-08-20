import Resource from "./resource"

const resource = new Resource('gallery')

export function listGalleryRequest(page) {
    const result = resource.get({
        page: parseInt(page)
    });

    return result
}

export function getById(id) {
    return resource.get({}, id)
}

export function insertGalleryRequest(data) {
    return resource.store(data, 'save', true);
}

export function updateGalleryRequest(galleryId, data) {
    return resource.update(galleryId, data, 'update', true)
}

export function deleteGalleryRequest(galleryId) {
    return resource.destroy('delete', galleryId)
}