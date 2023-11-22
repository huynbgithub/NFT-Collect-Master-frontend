import { Input } from "@nextui-org/react";
import { useContext } from "react";
import { FormikPropsContext } from "../formik";

export default function InputFields() {
    const formik = useContext(FormikPropsContext)
    if (formik == null) return 
    return (
        <div className="flex flex-col gap-4">
            <Input label="Name" variant="underlined" placeholder="Enter name" id="name" value={formik.values.name} onChange={formik.handleChange}/>
            <div className="grid grid-cols-2 gap-6">
            <Input label="Mint Price" variant="underlined" placeholder="Enter price" title="Reward" id="mintPrice" value={formik.values.mintPrice.toString()} onChange={formik.handleChange}/>
            <Input label="Reward" variant="underlined" placeholder="Enter reward" title="Reward" id="reward" value={formik.values.reward.toString()} onChange={formik.handleChange}/>
            </div>
        </div>
    )
    
  }