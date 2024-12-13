import React from "react";

export type ComponentType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "div"
  | "strong";

type SizePrefix =
  | "caption"
  | "body"
  | "button"
  | "subtitle"
  | "heading"
  | "display";

type BaseSizes = "large" | "medium" | "small";
type HeadingSizes = "1" | "2" | "3" | "4" | "5" | "6";
type ButtonOnlySize = "extraSmall";

export type NormalVariantTypes = `${Exclude<
  SizePrefix,
  "heading" | "caption" | "button"
>}${Capitalize<BaseSizes>}`;

export type TextVariants =
  | NormalVariantTypes
  | `heading${HeadingSizes}`
  | `button${Capitalize<BaseSizes | ButtonOnlySize>}`
  | "caption";

export type WeightType =
  | "thin"
  | "extraLight"
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extraBold"
  | "black";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  component?: ComponentType;
  children: React.ReactNode;
  variant?: TextVariants;
  weight?: WeightType;
}

const fontWeightGenerator = (fontWeight: WeightType) => {
  let weight: number = 400;

  switch (fontWeight) {
    case "thin":
      weight = 100;
      break;
    case "extraLight":
      weight = 200;
      break;
    case "light":
      weight = 300;
      break;
    default:
    case "normal":
      weight = 400;
      break;
    case "medium":
      weight = 500;
      break;
    case "semibold":
      weight = 600;
      break;
    case "bold":
      weight = 700;
      break;
    case "extraBold":
      weight = 800;
      break;
    case "black":
      weight = 900;
      break;
  }

  return weight;
};

const Typography: React.FC<TypographyProps> = ({
  component = "p",
  children,
  className = "",
  variant = "bodyMedium",
  weight = "normal",
  style = {},
  ...props
}) => {
  const Tag = component;

  let clss = "typography text-neutral-on-background";

  switch (variant) {
    default:
    case "bodyMedium":
      clss +=
        " text-mobile-body-medium md:text-tablet-body-medium lg:text-body-medium leading-mobile-body-medium md:leading-tablet-body-medium lg:leading-body-medium";
      break;
    case "bodySmall":
      clss +=
        " text-mobile-body-small md:text-tablet-body-small lg:text-body-small  lg:leading-body-large";
      break;
    case "bodyLarge":
      clss +=
        " text-mobile-body-large md:text-tablet-body-large lg:text-body-large leading-mobile-body-large md:leading-tablet-body-large lg:leading-body-large";
      break;
    case "buttonLarge":
      clss +=
        " text-mobile-button-large md:text-tablet-button-large lg:text-button-large leading-mobile-button-large md:leading-tablet-button-large lg:leading-button-large";
      break;
    case "buttonMedium":
      clss +=
        " text-mobile-button-medium md:text-tablet-button-medium lg:text-button-medium leading-mobile-button-medium md:leading-tablet-button-medium lg:leading-button-medium";
      break;
    case "buttonSmall":
      clss +=
        " text-mobile-button-small md:text-tablet-button-small lg:text-button-small leading-mobile-button-small md:leading-tablet-button-small lg:leading-button-small";
      break;
    case "buttonExtraSmall":
      clss +=
        " text-mobile-button-extra-small md:text-tablet-button-extra-small lg:text-button-extra-small leading-mobile-button-extra-small md:leading-tablet-button-extra-small lg:leading-button-extra-small";
      break;
    case "caption":
      clss +=
        " text-mobile-caption md:text-tablet-caption lg:text-caption leading-mobile-caption md:leading-tablet-caption lg:leading-caption";
      break;
    case "displayLarge":
      clss +=
        " text-mobile-display-large md:text-tablet-display-large lg:text-display-large leading-mobile-display-large md:leading-tablet-display-large lg:leading-display-large";
      break;
    case "displayMedium":
      clss +=
        " text-mobile-display-medium md:text-tablet-display-medium lg:text-display-medium leading-mobile-display-medium md:leading-tablet-display-medium lg:leading-display-medium";
      break;
    case "displaySmall":
      clss +=
        " text-mobile-display-small md:text-tablet-display-small lg:text-display-small leading-mobile-display-small md:leading-tablet-display-small lg:leading-display-small";
      break;
    case "heading1":
      clss +=
        " text-mobile-heading-1 md:text-tablet-heading-1 lg:text-heading-1 leading-mobile-heading-1 md:leading-tablet-heading-1 lg:leading-heading-1";
      break;
    case "heading2":
      clss +=
        " text-mobile-heading-2 md:text-tablet-heading-2 lg:text-heading-2 leading-mobile-heading-2 md:leading-tablet-heading-2 lg:leading-heading-2";
      break;
    case "heading3":
      clss +=
        " text-mobile-heading-3 md:text-tablet-heading-3 lg:text-heading-3 leading-mobile-heading-3 md:leading-tablet-heading-3 lg:leading-heading-3";
      break;
    case "heading4":
      clss +=
        " text-mobile-heading-4 md:text-tablet-heading-4 lg:text-heading-4 leading-mobile-heading-4 md:leading-tablet-heading-4 lg:leading-heading-4";
      break;
    case "heading5":
      clss +=
        " text-mobile-heading-5 md:text-tablet-heading-5 lg:text-heading-5 leading-mobile-heading-5 md:leading-tablet-heading-5 lg:leading-heading-5";
      break;
    case "heading6":
      clss +=
        " text-mobile-heading-6 md:text-tablet-heading-6 lg:text-heading-6 leading-mobile-heading-6 md:leading-tablet-heading-6 lg:leading-heading-6";

      break;
    case "subtitleLarge":
      clss +=
        " text-mobile-subtitle-large md:text-tablet-subtitle-large lg:text-subtitle-large leading-mobile-subtitle-large md:leading-tablet-subtitle-large lg:leading-subtitle-large";
      break;
    case "subtitleMedium":
      clss +=
        " text-mobile-subtitle-medium md:text-tablet-subtitle-medium lg:text-subtitle-medium leading-mobile-subtitle-medium md:leading-tablet-subtitle-medium lg:leading-subtitle-medium";
      break;
    case "subtitleSmall":
      clss +=
        " text-mobile-subtitle-small md:text-tablet-subtitle-small lg:text-subtitle-small leading-mobile-subtitle-small md:leading-tablet-subtitle-small lg:leading-subtitle-small";
      break;
  }

  return (
    <Tag
      className={`${clss} ${className}`}
      {...props}
      style={{
        fontWeight: fontWeightGenerator(weight),
        ...(style ? style : {}),
      }}
    >
      {children}
    </Tag>
  );
};

export default Typography;
