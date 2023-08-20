export function komentarForm(komentarForm, attachmentFile) {
    const formData = new FormData()
    formData.append('dokId', komentarForm.dokId)
    formData.append('komentar', komentarForm.komentar)
    if (attachmentFile)
    {
        formData.append('attachment', attachmentFile)    
    }
    

    return formData
}

export async function urlToFile(url) {
    const response = await fetch(url, {
        headers: {
            // "Access-Control-Allow-Origin": "*",
            // "Access-Control-Allow-Methods": "GET"
        }
    });
    const blob = await response.blob();
    const file = new File([blob], 'image.jpg', { type: blob.type });
    console.log('blob', blob)
    return file
}