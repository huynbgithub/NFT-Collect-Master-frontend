/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Image } from "@nextui-org/react";
import { FormikPropsContext } from "../formik";
import { useContext, useEffect, useState } from "react";
import { createImageBlobUrl } from "@utils";
import { splitImage } from "../../../utils/data/image.utils";
import axios from "axios";

export default function BigImage() {
  const formik = useContext(FormikPropsContext);
  if (formik == null) return;

  console.log(formik.values)
  const [imageBlobUrls, setImageBlobUrls] = useState<string[]>([])

  useEffect(() => {
    const bigImage = formik.values.bigImage;
    if (bigImage == null) return;

    const handleEffect = async () => {
      const data = await bigImage.arrayBuffer();
      console.log(data)
      const images = (await axios.post("/create/api", data)).data.images as ImageCut[]
      const _images : ArrayBuffer[] = []

      images.forEach(image => { 
        _images.push(arrayToBuffer(image.data))
     });

       formik.setFieldValue("cutImages", _images)
      

       const blobImages : string[] = [] 
       _images.forEach(image => {
         const _image = createImageBlobUrl(image) as string
         blobImages.push(_image)
       })

     setImageBlobUrls(blobImages)
    };

    handleEffect();
  }, [formik.values.bigImage]);

  return <div className="grid grid-cols-3 gap-3 justify-center justify-items-center"> 
    {
      imageBlobUrls.map((image, index) => <Image isZoomed radius="sm" className="w-full h-full"  key={index} src={image} alt="cutImage"/>)
    }
   </div>
}

export interface ImageCut {
  type: string,
  data: number[]
}

const arrayToBuffer = (array: number[]): ArrayBuffer => {
  const typedArray = new Uint8Array(array);
  return typedArray.buffer;
}