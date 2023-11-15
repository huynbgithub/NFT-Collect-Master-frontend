/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Button, Image } from "@nextui-org/react";
import { FormikPropsContext } from "../formik";
import { useContext, useEffect, useState } from "react";
import { createImageBlobUrl } from "@utils";
import { ScissorsIcon } from "@heroicons/react/20/solid";

export default function CropImage() {
  const formik = useContext(FormikPropsContext);
  if (formik == null) return;

  useEffect(() => {
    const handleEffect = async () => {
    };

    handleEffect();
  }, [formik.values.bigImage]);

  return <Button isIconOnly> <ScissorsIcon className="w-8 h-8"/> </Button>
}
