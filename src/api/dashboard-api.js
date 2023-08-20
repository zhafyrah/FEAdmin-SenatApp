import Resource from "./resource"

const resource = new Resource('dashboard')
export function getDashboardRequest(path) {
    return resource.get({}, path)
}