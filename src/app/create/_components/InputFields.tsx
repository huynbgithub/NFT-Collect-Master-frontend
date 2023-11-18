import { Input } from "@nextui-org/react";
import { useContext } from "react";
import { FormikPropsContext } from "../formik";

export default function InputFields() {
    const formik = useContext(FormikPropsContext)
    if (formik == null) return 
    return (
        <div className="flex flex-col gap-4">
            <Input label="Name" title="Name" id="name" value={formik.values.name} onChange={formik.handleChange}/>
            <Input label="Reward" title="Reward" id="reward" value={formik.values.reward.toString()} onChange={formik.handleChange}/>
        </div>
    )
    
  }