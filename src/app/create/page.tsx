"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Spacer,
} from "@nextui-org/react";
import FormikProviders from "./formik";
import { BigImage, ImportInput } from "./_components";
import InputFields from "./_components/InputFields";

export default function Page() {
  return (
    <Card className="mx-auto">
      <FormikProviders>
        <CardBody>
          <div className="grid grid-cols-2 gap-6 items-center">
            <BigImage />
            <div>
              <div className="text-4xl font-bold"> Create Your NFT Game</div>
              <InputFields />
            </div>
          </div>
        </CardBody>
      </FormikProviders>
    </Card>
  );
}
