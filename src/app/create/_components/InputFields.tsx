import { Button, Input } from "@nextui-org/react";
import { useContext } from "react";
import { FormikPropsContext } from "../formik";

export default function InputFields() {
  const formik = useContext(FormikPropsContext);
  if (formik == null) return;
  return (
    <div className="flex flex-col gap-4">
      <div className="mt-3">
        <div className="font-bold text-teal-500"> Name </div>
        <Input
          variant="underlined"
          id="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-6 mt-3">
        <div>
          <div className="font-bold text-teal-500"> Price </div>
          <Input
            variant="underlined"
            title="Reward"
            id="mintPrice"
            value={formik.values.mintPrice.toString()}
            onChange={formik.handleChange}
            endContent={<div className="text-gray-500"> KLAY </div>}
          />
        </div>
        <div>
          <div className="font-bold text-teal-500"> Reward </div>
          <Input
            variant="underlined"
            placeholder="Enter reward"
            title="Reward"
            id="reward"
            value={formik.values.reward.toString()}
            onChange={formik.handleChange}
            endContent={<div className="text-gray-500"> KLAY </div>}
          />
        </div>
      </div>
      <Button
                type="submit"
                className="bg-teal-500 text-base text-white w-full mt-3"
              >
                {" "}
                Create{" "}
              </Button>
    </div>
  );
}
