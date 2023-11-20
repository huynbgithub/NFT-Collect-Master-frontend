"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext } from "react"
import * as Yup from "yup"
import { useSelector } from "react-redux"
import { RootState } from "@redux"
import { FactoryContract } from "../../blockchain/contracts"
import { uploadArrayBuffer, uploadImage } from "../../firebase/storage"

interface FormikValues {
    bigImage: File | null,
    cutImages: ArrayBuffer[],
    name: string,
    reward: number,
}

const initialValues: FormikValues = {
    bigImage: null,
    cutImages: [],
    name: "",
    reward: 0
}

export const FormikPropsContext =
    createContext<FormikProps<FormikValues> | null>(null)

const _renderBody = (
    props: FormikProps<FormikValues> | null,
    chidren: ReactNode
) => (
    <FormikPropsContext.Provider value={props}>
        <Form onSubmit={props?.handleSubmit}>
            {chidren}
        </Form>
    </FormikPropsContext.Provider>
)

const FormikProviders = ({ children }: { children: ReactNode }) => {
    const web3 = useSelector((state: RootState) => state.blockchain.web3)
    const account = useSelector((state: RootState) => state.blockchain.account)

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={
                async (values) => {
                    if (web3 == null) return
                    if (account == null) return
                    const contract = new FactoryContract(web3, account)

                    const bigImage = values.bigImage
                    if (bigImage == null) return
                    const _bigPictureUrl = await uploadImage(bigImage)

                    const cutImages = values.cutImages
                    const _urls: string[] = []

                    for (let i = 0; i < cutImages.length; i++) {
                        const url = await uploadArrayBuffer(cutImages[i], i)
                        _urls.push(url)
                    }

                    console.log(_urls)

                    const receipt = await contract.createBigPicture(
                        values.name,
                        _bigPictureUrl,
                        _urls,
                        BigInt(values.reward)
                    )
                }}
        >
            {(props) => _renderBody(props, children)}
        </Formik>
    )
}
export default FormikProviders