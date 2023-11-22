"use client"
import { Button, Card, CardBody, CardFooter, CardHeader, Spacer } from "@nextui-org/react";
import FormikProviders from "./formik";
import { BigImage, ImportInput } from "./_components";
import InputFields from "./_components/InputFields";

export default function Page() {
  return (
    <Card className="max-w-[500px] mx-auto">
      <FormikProviders>
        <CardHeader className="p-5">
          <div className="text-lg w-full font-bold text-center">CREATE GAME</div>
        </CardHeader>
        <CardBody>
          <div>
            <BigImage />
              <Spacer y={4} />
              <InputFields />
              <Spacer y={4} />
              <div className="gap-6 grid grid-cols-2">
                <ImportInput/>
                <Button type="submit" color="warning"> Create </Button>
              </div>
            </div>
        </CardBody>
      </FormikProviders>
    </Card>
  )
}
