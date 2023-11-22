/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Image } from "@nextui-org/react";
import { FormikPropsContext } from "../formik";
import { useContext, useEffect, useState } from "react";
import { createImageBlobUrl } from "@utils";
// import { splitImage } from "../../../utils/data/image.utils";
import axios from "axios";

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

  return <Image isZoomed radius="sm" className="w-full h-full" key={imageBlobUrl} src={imageBlobUrl} alt="cutImage" />
}

export interface ImageCut {
  type: string,
  data: number[]
}

const arrayToBuffer = (array: number[]): ArrayBuffer => {
  const typedArray = new Uint8Array(array);
  return typedArray.buffer;
}