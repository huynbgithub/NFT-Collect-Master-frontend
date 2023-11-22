
"use client"
import { PhotoIcon } from "@heroicons/react/24/outline"
import { Button } from "@nextui-org/react"
import { FormikContext } from "formik"
import { ChangeEvent, useContext, useRef } from "react"

interface ImportInputProps{
  className?: string
}

export default function ImportInput(props :ImportInputProps){
    const formik = useContext(FormikContext)
    const fileInputRef = useRef<HTMLInputElement>(null);
  
    const handleButtonClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click()
      }
    };

    if (formik == null) return
    return (
    <>
    <input ref={fileInputRef} className="hidden" type="file" accept="image/*" onChange={(event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files == null) return;

        const file = files.item(0)

        formik.setFieldValue("bigImage", file)
    }}/>
    <Button onClick={handleButtonClick}  color="warning" variant="bordered"> Import </Button>
    </>
    )   

}