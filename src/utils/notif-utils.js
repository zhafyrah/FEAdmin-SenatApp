export function showConfirm(
    title = 'Konfirmasi',
    message = 'Konfirmasi Kan',
    icon = 'warning',
    confirmText = 'Okay',
    cancelText = 'Batal',
    onConfirm
    ) {
    Swal.fire({
        title: title,
        icon: icon,
        text: message,
        showCancelButton: true,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
    }).then((result) => {
        onConfirm(result.isConfirmed)
    })
}

export function showInfo(message) {
    Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: message,
        //footer: '<a href="">Why do I have this issue?</a>'
    })
}