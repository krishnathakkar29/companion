import CompanionForm from "@/components/Companion/CompanionForm";
import prismadb from "@/lib/db";
import React from "react";

type Props = {
  params: {
    companionId: string;
  };
};

const page = async ({ params: { companionId } }: Props) => {
  const companion = await prismadb.companion.findUnique({
    where: {
      id: companionId,
    },
  });
  const categories = await prismadb.category.findMany();
  return <CompanionForm initialData={companion} categories={categories} />;
};

export default page;
