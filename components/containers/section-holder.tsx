import React, { ReactNode } from "react";
import { OrgIconButton, OrgTypography } from "../shared-ui";
import { ArrowRight } from "lucide-react";
import { ComponentType, TextVariants } from "../shared-ui/o-typography";

interface Props {
  title: string;
  children: ReactNode;
  onIconClick?: () => void;
  icon?: ReactNode;
  headerComponent?: ComponentType;
  headerVariant?: TextVariants;
  afterNode?: ReactNode;
  className?: string;
}

const SectionHolder = ({
  title,
  children,
  onIconClick,
  icon = <ArrowRight size={26} />,
  afterNode,
  className = "",
  headerComponent = "span",
  headerVariant = "heading4",
}: Props) => {
  let hasBeforeIcon = onIconClick && icon;

  return (
    <div className={`flex w-full flex-col gap-y-8 items-start ${className}`}>
      <div className='sec-heading flex items-center justify-between w-full'>
        <div className='flex items-center gap-x-3'>
          {hasBeforeIcon && (
            <OrgIconButton className='w-6 h-6' onClick={onIconClick}>
              {icon}
            </OrgIconButton>
          )}
          <OrgTypography
            component={headerComponent}
            className='sec-title'
            variant={headerVariant}
            weight='medium'
          >
            {title}
          </OrgTypography>
        </div>
        <div className='after-node'>{afterNode && afterNode}</div>
      </div>
      {children}
    </div>
  );
};

export default SectionHolder;
