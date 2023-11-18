import { storage } from "@firebase"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

export const uploadImage = async (file: File) : Promise<string> => {
    const storageRef = ref(storage, `images/${file.name}`)

    try {
        const metadata = {
            contentType: "image/png",
        }
        await uploadBytes(storageRef, file, metadata)    
        const downloadUrl = await getDownloadURL(storageRef)
        return downloadUrl
        
    } catch (error) {
        console.error("Error uploading file: ", error)
        throw error
    }
}

export const uploadArrayBuffer = async (arr: ArrayBuffer, index: number) : Promise<string> => {
    const storageRef = ref(storage, `images/${Date.now()}-${index}`)

    try {
        const metadata = {
            contentType: "image/png",
        }
        await uploadBytes(storageRef, arr, metadata)    
        const downloadUrl = await getDownloadURL(storageRef)
        return downloadUrl
        
    } catch (error) {
        console.error("Error uploading file: ", error)
        throw error
    }
}