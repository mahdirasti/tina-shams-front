import { colors } from "@/app/const/_colors"
import { IconPropsType, defaultColor } from "."

type Props = { fillColor?: string } & IconPropsType

const FillHeart = ({
  color = colors.error.onBackgroundDefault,
  size = 24,
  fillColor = colors.error.onBackgroundDefault,
}: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.35196 11.8276C2.33622 8.65149 3.52346 5.02346 6.85586 3.94993C8.60971 3.38995 10.8875 4.00299 12.0009 6.13489C13.1417 3.97362 15.3844 3.39942 17.1364 3.94993C20.4688 5.02346 21.6655 8.65149 20.6488 11.8276C19.0665 16.8569 13.2971 20.2453 12.0009 20.2453C10.7047 20.2453 4.98926 16.9157 3.35196 11.8276Z"
        stroke={color}
        fill={fillColor}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default FillHeart
