import { IconPropsType } from "."

type Props = {} & IconPropsType

const NextLine = ({ color = "#757575", size = 24 }: Props) => {
  return (
    <svg
      width={size}
      height={size - 2}
      viewBox="0 0 44 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.146446 37.8536C-0.0488167 37.6583 -0.0488167 37.3417 0.146446 37.1464L3.32843 33.9645C3.52369 33.7692 3.84027 33.7692 4.03553 33.9645C4.2308 34.1597 4.2308 34.4763 4.03553 34.6716L1.20711 37.5L4.03553 40.3284C4.2308 40.5237 4.2308 40.8403 4.03553 41.0355C3.84027 41.2308 3.52369 41.2308 3.32843 41.0355L0.146446 37.8536ZM43.5 0V17.5H42.5V0H43.5ZM23 38H0.5V37H23V38ZM43.5 17.5C43.5 28.8218 34.3218 38 23 38V37C33.7696 37 42.5 28.2696 42.5 17.5H43.5Z"
        fill={color}
      />
    </svg>
  )
}

export default NextLine
