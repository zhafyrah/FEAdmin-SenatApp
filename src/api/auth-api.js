import Resource from "./resource"

const resource = new Resource('auth')

export function loginRequest(email, password) {
    
    return resource.store({
        email: email,
        password: password,
    }, 'login')
}

