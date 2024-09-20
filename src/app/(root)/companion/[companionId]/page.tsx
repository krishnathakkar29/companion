import CompanionForm from "@/components/Companion/CompanionForm";
import prismadb from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { auth, redirectToSignIn } from "@clerk/nextjs/server";
import React from "react";

type Props = {
  params: {
    companionId: string;
  };
};

const page = async ({ params: { companionId } }: Props) => {
  const { userId } = auth();

  if (!userId) return redirectToSignIn();

  const companion = await prismadb.companion.findUnique({
    where: { id: companionId, userId },
  });

  const categories = await prismadb.category.findMany();
  return <CompanionForm initialData={companion} categories={categories} />;
};

export default page;
