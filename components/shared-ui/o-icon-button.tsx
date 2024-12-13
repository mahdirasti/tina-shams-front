import { cn } from "@/app/lib/utils";
import OrgButton, { OrgButtonProps } from "./o-button";

type OrgIconButtonProps = OrgButtonProps;

const OrgIconButton = ({
  children,
  className,
  variant,
  size = "icon",
  ...rest
}: OrgIconButtonProps) => {
  let clss = ` flex flex-col !p-0 items-center justify-center rounded-full`;

  switch (size) {
    case "lg":
      clss = cn(clss, "min-w-12 min-h-12 w-12 h-12");
      break;
    case "sm":
      clss = cn(clss, "min-w-10 min-h-10 w-10 h-10");
      break;
    default:
    case "default":
    case "icon":
      clss = cn(clss, "min-w-8 min-h-8 w-8 h-8");
      break;
  }

  clss = cn(clss, className);

  return (
    <OrgButton variant={"iconButton"} className={clss} size={"icon"} {...rest}>
      {children}
    </OrgButton>
  );
};

export default OrgIconButton;
