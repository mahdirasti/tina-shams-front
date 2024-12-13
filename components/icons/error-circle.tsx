import { IconPropsType, defaultColor } from "."

type Props = {} & IconPropsType

const ErrorCircle = ({ color = defaultColor, size = 24 }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M24.5 7.5C15.3866 7.5 8 14.8866 8 24C8 33.1116 15.3867 40.5 24.5 40.5C33.6134 40.5 41 33.1116 41 24C41 14.8866 33.6134 7.5 24.5 7.5ZM5 24C5 13.2297 13.7297 4.5 24.5 4.5C35.2702 4.5 44 13.2297 44 24C44 34.7682 35.2704 43.5 24.5 43.5C13.7296 43.5 5 34.7682 5 24Z"
        fill={color}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M24.4922 15.1133C25.3206 15.1133 25.9922 15.7849 25.9922 16.6133V25.2124C25.9922 26.0408 25.3206 26.7124 24.4922 26.7124C23.6638 26.7124 22.9922 26.0408 22.9922 25.2124V16.6133C22.9922 15.7849 23.6638 15.1133 24.4922 15.1133ZM24.4998 29.8882C25.3282 29.8882 25.9998 30.5598 25.9998 31.3882V31.4836C25.9998 32.312 25.3282 32.9836 24.4998 32.9836C23.6714 32.9836 22.9998 32.312 22.9998 31.4836V31.3882C22.9998 30.5598 23.6714 29.8882 24.4998 29.8882Z"
        fill={color}
      />
    </svg>
  )
}

export default ErrorCircle
