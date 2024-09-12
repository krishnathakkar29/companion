import Categories from "@/components/Categories";
import Companions from "@/components/Companions";
import SearchInput from "@/components/SearchInput";
import prismadb from "@/lib/db";
import { UserButton } from "@clerk/nextjs";
import React from "react";

type Props = {};

interface PageProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
}

const page = async ({ searchParams }: PageProps) => {
  const data = await prismadb.companion.findMany({
    relationLoadStrategy: "join",
    where: {
      categoryId: searchParams.categoryId,
      name: {
        search: searchParams.name,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  const categories = await prismadb.category.findMany();

  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />
      <Categories categories={categories} />
      <Companions data={data} />
    </div>
  );
};

export default page;
