export const getFileImageName = (imgFile: File) => {
    const { type } = imgFile
    const name = new Date().getTime()
    const extension = type.split('/')[1]
    return `${name}.${extension}`
}

export const getFileSize = async (imgFile: File): Promise<[number, number]> => {
    return new Promise((resolve, reject) => {
        try {
            const fr = new FileReader()
            fr.onload = () => {
                const img = new Image()
                img.onload = () => resolve([img.width, img.height])
                img.src = String(fr.result)
            }
            fr.readAsDataURL(imgFile)
        } catch (error) {
            reject(error)
        }
    })
}

export const getBase64 = async (
    imgFile: File,
): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
        try {
            const fr = new FileReader()
            fr.onload = () => resolve(fr.result)
            fr.readAsDataURL(imgFile)
        } catch (error) {
            reject(error)
        }
    })
}

export const getTheSizeOfTheFile = (imgFile: File) => {
    return imgFile.size
}
