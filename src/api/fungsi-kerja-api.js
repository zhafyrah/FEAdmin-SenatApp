import Resource from "./resource"

const resource = new Resource('fungsi-kerja')

export function listFungsiKerjaRequest(page, search) {
    const result = resource.get({
        page: parseInt(page),
        search: search
    });

    return result
}

export function getById(id) {
    return resource.get({}, id)
}

export function insertFungsiKerjaRequest(data) {
    return resource.store(data, 'save', true);
}

export function updateFungsiKerjaRequest(fungsiKerjaId, data) {
    return resource.update(fungsiKerjaId, data, 'update', true)
}

export function deleteFungsiKerjaRequest(fungsiKerjaId) {
    return resource.destroy('delete', fungsiKerjaId)
}