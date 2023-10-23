import axios from "axios"

export const fetchAndCreateSvgBlobUrl = async (url: string) => {
    try {
        const response = await axios.get(url, {
            responseType: "text"
        })
        const blob = new Blob([response.data], { type: "image/svg+xml" })
        return URL.createObjectURL(blob)
    } catch (ex) {
        console.log(ex)
        return null
    }       
}

export const createImageBlobUrl = (dataBuffer: ArrayBuffer): string | null => {
    try {
      const blob = new Blob([dataBuffer]);
      const blobUrl = URL.createObjectURL(blob);
      return blobUrl;
    } catch (error) {
      console.error('Error creating SVG Blob URL:', error);
      return null
    }
  };