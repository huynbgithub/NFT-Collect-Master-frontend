"use client"
import { Button, Card, CardBody, CardFooter, CardHeader, Spacer } from "@nextui-org/react";
import FormikProviders from "./formik";
import { BigImage, ImportInput } from "./_components";
import InputFields from "./_components/InputFields";

export default function Page() {
  return (
    <Card>
      <FormikProviders>
        <CardHeader className="p-5">
          <div className="text-lg font-bold">CREATE GAME</div>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-2 gap-6">
            <BigImage />
            <div>
              <InputFields />
              <Spacer y={4} />
              <div className="gap-4 flex">
                <ImportInput />
                <Button type="submit" color="warning"> Create </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </FormikProviders>
    </Card>
  )
}
