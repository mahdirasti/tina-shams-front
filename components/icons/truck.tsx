import { IconPropsType, defaultColor } from "."

type Props = {} & IconPropsType

const Truck = ({ color = defaultColor, size = 24 }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.7039 25.7748L7.61878 25.7746C5.89666 25.7746 4.5 24.378 4.5 22.656V18.8877"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13.4552 25.775C13.4552 24.1871 12.168 22.8999 10.5801 22.8999C8.99229 22.8999 7.70508 24.1871 7.70508 25.775C7.70508 27.3629 8.99229 28.65 10.5801 28.65C12.168 28.65 13.4552 27.3629 13.4552 25.775Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M27.169 25.775C27.169 24.1871 25.8819 22.8999 24.294 22.8999C22.7061 22.8999 21.4189 24.1871 21.4189 25.775C21.4189 27.3629 22.7061 28.65 24.294 28.65C25.8819 28.65 27.169 27.3629 27.169 25.775Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.4531 25.7744H17.4495"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4.5 7.35059H21.1769C22.899 7.35059 24.2957 8.74725 24.2957 10.4694L24.2952 22.8998"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4.5 14.5797H11.1769M7.33191 10.9653H11.1775"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M27.1699 25.774L28.3807 25.7743C30.1029 25.7743 31.4995 24.3776 31.4995 22.6555V17.4907C31.4995 16.0867 30.6706 14.814 29.3863 14.2478L27.2811 13.3188"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M27.8965 18.6167H31.4983"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default Truck
