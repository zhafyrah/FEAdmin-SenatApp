import {
    defineStore
} from 'pinia';

export const useLocalStorageStore = defineStore('localStorage', {
    state: () => ({
        user: null,
        permissions: {},
    }),
    getters: {
        getUser() {
            return this.user || JSON.parse(localStorage.getItem('user')) || null;
        },
        getPermission() {
            return Object.keys(this.permissions).length ?
                this.permissions :
                JSON.parse(localStorage.getItem('permission')) || {};
        },
    },
    actions: {
        setUser(user) {
            this.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        setPermissions(permissions) {
            this.permissions = permissions;
            localStorage.setItem('permissions', JSON.stringify(permissions));
        },
        clearUser() {
            this.user = null;
            localStorage.removeItem('user');
        },
        clearPermissions() {
            this.permissions = {};
            localStorage.removeItem('permissions');
        },
        clearLocalStorage() {
            this.clearUser();
            this.clearPermissions();
        },
    },
});