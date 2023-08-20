export function ucwords(str) {
    return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
        return $1.toUpperCase();
    });
}

export function generateFotoUrl(path) {
    return import.meta.env.VITE_BASE_URL + path;
}