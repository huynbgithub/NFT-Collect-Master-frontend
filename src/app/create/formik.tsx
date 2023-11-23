"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext } from "react"
import * as Yup from "yup"
import { useSelector } from "react-redux"
import { RootState } from "@redux"
import { FactoryContract } from "../../blockchain/contracts"
import { uploadArrayBuffer, uploadImage } from "../../firebase/storage"
import { pinataPOSTArrayBuffer, pinataPOSTFile, pinataPOSTJson } from "../../api"
import { calculateIRedenomination } from "../../utils/math"

interface FormikValues {
    bigImage: File | null,
    cutImages: ArrayBuffer[],
    name: string,
    mintPrice: number,
    reward: number,
}

const initialValues: FormikValues = {
    bigImage: null,
    cutImages: [],
    name: "",
    mintPrice: 0,
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
                    const _bigPictureRes = await pinataPOSTFile(bigImage)
                    if (_bigPictureRes == null) return
                    const _bigPictureUrl = _bigPictureRes.IpfsHash

                    const cutImages = values.cutImages
                    const _urls: string[] = []

                    const pinataPOSTArrayBufferPromises : Promise<void>[] = [] 
                    for (let i = 0; i < cutImages.length; i++) {
                        pinataPOSTArrayBufferPromises.push(pinataPOSTArrayBuffer(cutImages[i])
                        .then(async (_cutImageRes) => {
                            if (_cutImageRes == null) return 
                            const data = {index: i, url: _cutImageRes.IpfsHash}
                            const _res = await pinataPOSTJson(data)
                            if (_res == null) return
                            _urls.push(_res.IpfsHash)
                        })
                        )
                    }
                    await Promise.all(pinataPOSTArrayBufferPromises)
                    
                    const receipt = await contract.createBigPicture(
                        values.name,
                        _bigPictureUrl,
                        _urls,
                        calculateIRedenomination(values.mintPrice, 18),
                        calculateIRedenomination(values.reward, 18)
                    )

                    console.log(receipt)
                }}
        >
            {(props) => _renderBody(props, children)}
        </Formik>
    )
}
export default FormikProviders