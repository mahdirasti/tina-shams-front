import { cn, urlWithQueryParams } from "@/app/lib/utils";
import { useQueryParams } from "@/app/utils";
import { OrgButton } from "@/components/shared-ui";
import { CategoryType } from "@/types/category";
import { Check } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

type Props = {
  item: CategoryType;
};
export default function ChipsItem({ item }: Props) {
  const pathame = usePathname();
  const router = useRouter();
  const { query } = useQueryParams();

  const defaultCategories = query?.["categories"] ?? "";
  let defaultCategoriesArray = useMemo((): string[] => {
    return (defaultCategories?.split(",") ?? [])?.filter((a: string) => !!a);
  }, [defaultCategories]);

  const indexCategory = defaultCategoriesArray?.findIndex((a) => a === item.id);

  const handleToggleCategory = (category: CategoryType) => {
    if (indexCategory === -1) {
      defaultCategoriesArray.push(category.id);
    } else {
      defaultCategoriesArray = defaultCategoriesArray.filter(
        (a, index) => index !== indexCategory
      );
    }

    router.push(
      urlWithQueryParams(pathame, {
        ...query,
        categories: defaultCategoriesArray.join(",").trim(),
      })
    );
  };

  const selected = indexCategory > -1;

  return (
    <OrgButton
      onClick={() => handleToggleCategory(item)}
      className={cn(
        "rounded-xl w-full",
        selected
          ? "!bg-[#E6E0E9] !text-black"
          : "hover:bg-[#E6E0E9] hover:text-black"
      )}
      variant={"outlined"}
      startIcon={selected ? <Check size={16} /> : undefined}
    >
      {item.name}
    </OrgButton>
  );
}
