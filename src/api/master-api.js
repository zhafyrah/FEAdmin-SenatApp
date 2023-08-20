import Resource from "./resource"

const resource = new Resource('master')

export function getMstRolesRequest() {
    const result = resource.get({}, 'roles');

    return result
}