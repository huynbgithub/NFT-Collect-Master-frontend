/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Button, Image } from "@nextui-org/react";
import { FormikPropsContext } from "../formik";
import { useContext, useEffect, useState } from "react";
import { createImageBlobUrl } from "@utils";
// import { splitImage } from "../../../utils/data/image.utils";
import axios from "axios";
import { CameraIcon } from "@heroicons/react/24/outline";

export default function BigImage() {
  const formik = useContext(FormikPropsContext);
  if (formik == null) return;

  const [imageBlobUrl, setImageBlobUrl] = useState("")

  useEffect(() => {
    const bigImage = formik.values.bigImage;   
    if (bigImage == null) return;

    setImageBlobUrl(URL.createObjectURL(bigImage))

    const handleEffect = async () => {
      const data = await bigImage.arrayBuffer();
      const images = (await axios.post("/create/api", data)).data.images as ImageCut[]
      const _images: ArrayBuffer[] = []

      images.forEach(image => {
        _images.push(arrayToBuffer(image.data))
      });
    
      formik.setFieldValue("cutImages", _images)
    }
    handleEffect();
  }, [formik.values.bigImage]);

  const _handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files == null) return
    const file = files[0]
    if (file == null) return
    formik.setFieldValue("bigImage", file)
}

const _handleButtonClick = () => {
    const fileInput = document.getElementById("upload")
    if (fileInput) {
        fileInput.click()
    }
}

  return  (
  <>
  {imageBlobUrl ?
      <div className="grid gap-4">
          <Button onPress={_handleButtonClick} isIconOnly className="bg-white w-full h-full grid place-items-center">
              <Image isZoomed className="w-full" src={imageBlobUrl}/>
          </Button> 
          
      </div>
      :
      <div className="grid items-center">
          <div className="aspect-square">
              <Button onPress={_handleButtonClick} isIconOnly variant="light" className="w-full h-full grid place-items-center">
                  <CameraIcon className="text-teal-500 w-12 h-12"/>
              </Button> 
          </div>
      </div>
  }
  <input
      type="file"
      id="upload"
      accept="image/*"
      onChange={_handleUpload}
      className="hidden"
  />
</> 
  )   
}

export interface ImageCut {
  type: string,
  data: number[]
}

const arrayToBuffer = (array: number[]): ArrayBuffer => {
  const typedArray = new Uint8Array(array);
  return typedArray.buffer;
}