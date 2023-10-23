
"use client"
import { FormikContext } from "formik"
import { ChangeEvent, useContext } from "react"

export default function ImportInput(){
    const formik = useContext(FormikContext)
    if (formik == null) return

    return <input type="file" accept="image/*" onChange={(event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files == null) return

        const file = files.item(0)

        formik.setFieldValue("bigImage", file)
    }}/>
}