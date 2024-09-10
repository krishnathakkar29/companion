import Categories from "@/components/Categories";
import SearchInput from "@/components/SearchInput";
import prismadb from "@/lib/db";
import { UserButton } from "@clerk/nextjs";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const categories = await prismadb.category.findMany() || [];
console.log(categories)
  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />
      <Categories categories={categories} />
    </div>
  );
};

export default page;
