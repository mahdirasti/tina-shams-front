import { IconPropsType, defaultColor } from "."

type Props = {} & IconPropsType

const CheckCircle = ({ color = defaultColor, size = 24 }: Props) => {
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
        d="M32.4862 18.3222C33.0718 18.9079 33.0718 19.8577 32.4862 20.4434L23.2506 29.679C22.665 30.2646 21.7154 30.2648 21.1296 29.6792L16.5099 25.0614C15.924 24.4758 15.9238 23.526 16.5094 22.9402C17.0951 22.3542 18.0448 22.354 18.6307 22.9396L22.1898 26.4972L30.3648 18.3222C30.9506 17.7364 31.9004 17.7364 32.4862 18.3222Z"
        fill={color}
      />
    </svg>
  )
}

export default CheckCircle
