import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import FormikProviders from "./formik";
import { BigImage, ImportInput } from "./_components";

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
      <CardFooter className="p-5">
        <ImportInput />
      </CardFooter>
      </FormikProviders>
    </Card>
  )
}
