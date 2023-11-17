import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
// import FormikProviders from "./formik";
// import { BigImage, ImportInput } from "./_components";

export default function Page() {
  
  return (
    <Card>
      {/* <FormikProviders> */}
      <CardHeader className="p-5">
        <div className="text-lg font-bold">GAME LIST</div>
      </CardHeader>
      <CardBody>
      {/* <BigImage/> */}
      </CardBody>
      <CardFooter className="p-5 gap-4">
        {/* <ImportInput /> */}
      </CardFooter>
      {/* </FormikProviders> */}
    </Card>
  )
}
