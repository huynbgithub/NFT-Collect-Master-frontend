import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import FormikProviders from "./formik";
import { BigImage, ImportInput } from "./_components";
import CropImage from "./_components/CropImage";

export default function Page() {
  return (
    <Card>
      <FormikProviders>
      <CardHeader className="p-5">
        <div className="text-lg font-bold">CREATE GAME</div>
      </CardHeader>
      <CardBody>
      <BigImage/>
      </CardBody>
      <CardFooter className="p-5 gap-4">
        <ImportInput />
        <CropImage />
      </CardFooter>
      </FormikProviders>
    </Card>
  )
}
