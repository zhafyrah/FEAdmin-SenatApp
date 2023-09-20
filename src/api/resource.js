import request from "./request"

class Resource {
    constructor(uri) {
        this.version = '' // versioning such as v1, v2 etc
        this.uri = this.version + '/' + uri;
    }

    get(params = {}, path = '') {
        const finalPath = path ? '/' + path : ''
        const finalUrl = this.uri ? this.uri + finalPath : ''
        const result = request({
            url: finalUrl,
            method: 'get',
            params
        });
        return result
    }

    store(data, path = '', isUpload = false) {
        const finalPath = path ? '/' + path : ''
        const finalUrl = this.uri ? this.uri + finalPath : ''
        const headers = isUpload ? {
            'Content-Type': 'multipart/form-data'
        } : {
            'Content-Type': 'application/x-www-form-urlencoded',
            "Content-Type": "application/json",
        }

        return request({
            url: finalUrl,
            method: 'post',
            data: data,
            headers: headers
        });
    }

    update(id = 0, data = {}, path = '', isUpload = false) {
        const finalPath = path ? '/' + path : ''
        const finalId = id > 0 ? finalPath + '/' + id : ''
        const finalUrl = this.uri ? this.uri + finalId : ''
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            "Content-Type": "application/json",
        }
        return request({
            url: finalUrl,
            method: 'put',
            data: data,
            headers: headers
        });
    }

    destroy(path, id) {
        const finalPath = path ? '/' + path : ''
        const finalId = id > 0 ? finalPath + '/' + id : ''
        const finalUrl = this.uri ? this.uri + finalId : ''

        return request({
            url: finalUrl,
            method: 'delete',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Content-Type": "application/json",
            }
        });
    }
}

export {
    Resource as
    default
};