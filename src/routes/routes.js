const constantRoutes = [{
        path: "/",
        name: "Beranda",
        meta: {
            layout: 'Authenticated',
        },
        component: () => import("../pages/dashboard.vue"),
    },
    {
        path: "/auth/login",
        name: "Login",
        meta: {
            layout: 'Guest',
        },
        component: () => import("../pages/auth/Login.vue"),
    },
    {
        path: "/dokumen-pleno",
        name: "Dokumen Pleno",
        meta: {
            layout: 'Authenticated',
        },
        component: () => import("../pages/dokumen/DokumenPleno.vue"),
    },
    {
        path: "/detail-dokumen-pleno/:id",
        name: "DetailDokumenPleno",
        meta: {
            layout: 'Authenticated',
            breadcrumb: [{
                label: 'Dokumen Pleno',
                path: '/dokumen-pleno',
            }]
        },
        component: () => import("../pages/dokumen/DetailDokumenPleno.vue"),
    },
    {
        path: "/detail-dokumen-komisi/:id",
        name: "DetailDokumenKomisi",
        meta: {
            layout: 'Authenticated',
            breadcrumb: [{
                label: 'Dokumen Komisi',
                path: '/dokumen-komisi',
            }]
        },
        component: () => import("../pages/dokumen/DetailDokumenKomisi.vue"),
    },
    {
        path: "/tambah-dokumen-pleno",
        name: "TambahDokumenPleno",
        meta: {
            layout: 'Authenticated',
            breadcrumb: [{
                label: 'Dokumen Pleno',
                path: '/dokumen-pleno',
            }]
        },
        component: () => import('../pages/dokumen/FormAddDokumenPleno.vue'),
    },
    {
        path: "/edit-dokumen-pleno/:id?",
        name: "EditDokumenPleno",
        meta: {
            layout: 'Authenticated',
            breadcrumb: [{
                label: 'Dokumen Pleno',
                path: '/dokumen-pleno',
            }]
        },
        component: () => import('../pages/dokumen/FormAddDokumenPleno.vue'),
    },
    {
        path: "/tambah-dokumen-komisi",
        name: "TambahDokumenKomisi",
        meta: {
            layout: 'Authenticated',
            breadcrumb: [{
                label: 'Dokumen Komisi',
                path: '/dokumen-komisi',
            }]
        },
        component: () => import('../pages/dokumen/FormAddDokumenKomisi.vue'),
    },
    {
        path: "/edit-dokumen-komisi/:id?",
        name: "EditDokumenKomisi",
        meta: {
            layout: 'Authenticated',
            breadcrumb: [{
                label: 'Dokumen Komisi',
                path: '/dokumen-komisi',
            }]
        },
        component: () => import('../pages/dokumen/FormAddDokumenKomisi.vue'),
    },
    {
        path: "/tambah-dokumen-senat",
        name: "TambahDokumenSenat",
        meta: {
            layout: 'Authenticated',
            breadcrumb: [{
                label: 'Dokumen Senat',
                path: '/dokumen-senat',
            }]
        },
        component: () => import('../pages/dokumen/FormAddDokumenSenat.vue'),
    },
    {
        path: "/edit/dokumen-senat/:id?",
        name: "EditDokumenSenat",
        meta: {
            layout: 'Authenticated',
        },
        component: () => import('../pages/dokumen/FormAddDokumenSenat.vue'),
    },

]
const adminRoutes = [{
        path: "/dokumen-komisi",
        name: "Dokumen Komisi",
        meta: {
            layout: 'Authenticated',
            permission: ['dokumen komisi']
        },
        component: () => import("../pages/dokumen/DokumenKomisi.vue"),
    },
    {
        path: "/user",
        name: "User",
        meta: {
            layout: 'Authenticated',
            permission: ['user']
        },
        component: () => import("../pages/user/User.vue"),
    },
    {
        path: "/tambah-user",
        name: "TambahUser",
        meta: {
            layout: 'Authenticated',
            permission: ['user'],
            breadcrumb: [{
                label: 'User',
                path: '/user',
            }]
        },
        component: () => import("../pages/user/FormAddEditUser.vue"),
    },
    {
        path: "/edit-user/:id?",
        name: "EditUser",
        meta: {
            layout: 'Authenticated',
            permission: ['user'],
            breadcrumb: [{
                label: 'User',
                path: '/user',
            }]
        },
        component: () => import("../pages/user/FormAddEditUser.vue"),
    },
]

const routes = [
    ...constantRoutes,
    ...adminRoutes,
    {
        path: "/dokumen-senat",
        name: "Dokumen Senat",
        meta: {
            layout: 'Authenticated',
            permission: ['dokumen senat']
        },
        component: () => import("../pages/dokumen/DokumenSenat.vue"),
    },
    {
        path: "/tambah-fungsi",
        name: "Tambah FungsiKerja",
        meta: {
            layout: 'Authenticated',
        },
        component: () => import("../pages/struktur-organisasi/FormAddFungsi.vue"),
    },
    {
        path: "/anggota",
        name: "Keanggotaan",
        meta: {
            layout: 'Authenticated',
        },
        component: () => import("../pages/struktur-organisasi/Keanggotaan.vue"),
    },
    {
        path: "/tambah-anggota",
        name: "TambahAnggota",
        meta: {
            layout: 'Authenticated',
            breadcrumb: [{
                label: 'Keanggotaan',
                path: '/anggota',
            }]
        },
        component: () => import("../pages/struktur-organisasi/FormAddKeanggotaan.vue"),
    },
    {
        path: "/fungsi-kerja",
        name: "Fungsi Kerja",
        meta: {
            layout: 'Authenticated',
        },
        component: () => import("../pages/struktur-organisasi/FungsiKerja.vue"),
    },
    {
        path: "/berita",
        name: "Berita",
        meta: {
            layout: 'Authenticated',
        },
        component: () => import("../pages/news/News.vue"),
    },
    {
        path: "/tambah-berita",
        name: "TambahBerita",
        meta: {
            layout: 'Authenticated',
            breadcrumb: [{
                label: 'Berita',
                path: '/berita',
            }]
        },
        component: () => import("../pages/news/FormAddNews.vue"),
    },
    {
        path: "/edit-berita/:id?",
        name: "Edit Berita",
        meta: {
            layout: 'Authenticated',
            breadcrumb: [{
                label: 'Berita',
                path: '/berita',
            }]
        },
        component: () => import("../pages/news/FormAddNews.vue"),
    },
    {
        path: "/sambutan",
        name: "Sambutan Ketua Senat",
        meta: {
            layout: 'Authenticated',
        },
        component: () => import("../pages/profil/SambutanKetua.vue"),
    },
    {
        path: "/tambah-sambutan",
        name: "TambahSambutan",
        meta: {
            layout: 'Authenticated',
            permission: ['tambah sambutan']
        },
        component: () => import("../pages/profil/FormAddEditSambutan.vue"),
    },
    {
        path: "/edit-sambutan/:id?",
        name: "EditSambutan",
        meta: {
            layout: 'Authenticated',
            permission: ['edit sambutan']
        },
        component: () => import("../pages/profil/FormAddEditSambutan.vue"),
    },
    {
        path: "/sejarah",
        name: "Sejarah Polindra",
        meta: {
            layout: 'Authenticated',
        },
        component: () => import("../pages/profil/SejarahPolindra.vue"),
    },
    {
        path: "/tambah-sejarah",
        name: "Tambah Sejarah Polindra",
        meta: {
            layout: 'Authenticated',
            permission: ['tambah sejarah']
        },
        component: () => import("../pages/profil/FormAddEditSejarah.vue"),
    },
    {
        path: "/edit-sejarah/:id?",
        name: "Edit Sejarah Polindra",
        meta: {
            layout: 'Authenticated',
            permission: ['edit sejarah']
        },
        component: () => import("../pages/profil/FormAddEditSejarah.vue"),
    },
    {
        path: "/sejarah-senat",
        name: "Sejarah Senat Polindra",
        meta: {
            layout: 'Authenticated',
        },
        component: () => import("../pages/profil/SejarahSenat.vue"),
    },
    {
        path: "/tambah-sejarah-senat",
        name: "Tambah Sejarah Senat Polindra",
        meta: {
            layout: 'Authenticated',
            permission: ['tambah sejarah senat']
        },
        component: () => import("../pages/profil/FormAddEditSejarahSenat.vue"),
    },
    {
        path: "/edit-sejarah-senat/:id?",
        name: "Edit Sejarah Senat Polindra",
        meta: {
            layout: 'Authenticated',
            permission: ['edit sejarah senat']
        },
        component: () => import("../pages/profil/FormAddEditSejarahSenat.vue"),
    },
    {
        path: "/galeri",
        name: "Galeri",
        meta: {
            layout: 'Authenticated',
        },
        component: () => import("../pages/gallery/Gallery.vue"),
    },
    {
        path: "/tambah-foto",
        name: "Tambah Foto",
        meta: {
            layout: 'Authenticated',
        },
        component: () => import("../pages/gallery/FormAddGallery.vue"),
    },
    {
        path: "/edit-foto/:id?",
        name: "Edit Foto",
        meta: {
            layout: 'Authenticated',
            permission: ['edit foto']
        },
        component: () => import("../pages/gallery/FormAddGallery.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        meta: {
            layout: 'Authenticated',
        },
        component: () => import("../pages/NotFound.vue"),
    },
];

export default routes;