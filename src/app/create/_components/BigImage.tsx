/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Image } from "@nextui-org/react";
import { FormikPropsContext } from "../formik";
import { useContext, useEffect, useState } from "react";
import { createImageBlobUrl } from "@utils";

export default function BigImage() {
  const formik = useContext(FormikPropsContext);
  if (formik == null) return;

  console.log(formik.values.bigImage)
  const [imageBlobUrl, setImageBlobUrl] = useState("")

  useEffect(() => {
    const bigImage = formik.values.bigImage;
    if (bigImage == null) return;

    const handleEffect = async () => {
      const data = await bigImage.arrayBuffer();
    
      const _image = createImageBlobUrl(data)
      if (_image == null) return

      setImageBlobUrl(_image)
    };

    handleEffect();
  }, [formik.values.bigImage]);

  return <Image alt="Big Image" isZoomed radius="sm" className="w-full h-full" src={imageBlobUrl}/>
}
