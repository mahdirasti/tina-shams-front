import { IconPropsType, defaultColor } from ".";

type Props = {} & IconPropsType;

const ChevronDown = ({ color = defaultColor, size = 24 }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M5.25 7.5L9 11.25L12.75 7.5H5.25Z' fill={color} />
    </svg>
  );
};

export default ChevronDown;
