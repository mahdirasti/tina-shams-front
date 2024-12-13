import { MapPin } from "lucide-react";
import { MapboxSearchItemType } from ".";
import { OrgTypography } from "@/components/shared-ui";

type Props = {
  item: MapboxSearchItemType;
  onItemClick: (item: MapboxSearchItemType) => void;
};
export default function MapboxSearchResultItem({ item, onItemClick }: Props) {
  return (
    <div
      className='flex flex-row items-center p-4 gap-x-4 cursor-pointer'
      onClick={() => {
        onItemClick(item);
      }}
    >
      <div className='text-neutral-foreground-subdued'>
        <MapPin />
      </div>
      <div className='flex flex-col gap-y-4'>
        <OrgTypography
          variant='bodyMedium'
          className='!text-neutral-foreground'
        >
          {item.title}
        </OrgTypography>
        <OrgTypography
          variant='bodySmall'
          className='!text-neutral-foreground-subdued'
        >
          {item.address}
        </OrgTypography>
      </div>
    </div>
  );
}
