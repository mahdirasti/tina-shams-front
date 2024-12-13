import { colors } from "@/app/const/_colors"
import { IconPropsType, defaultColor } from "."

type Props = {
  percent: number
} & IconPropsType

const GradientStar = ({
  color = colors.yellow[50],
  size = 24,
  percent,
}: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Define the gradient */}
      <defs>
        <linearGradient id="star-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset={`${percent}%`} stopColor={color} /> {/* Start color */}
          <stop
            offset={`${percent}%`}
            stopColor={colors.neutral.onBackgroundDisabled}
          />
          {/* End color */}
        </linearGradient>
      </defs>

      {/* Apply the gradient with stroke */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.5193 9.99552L16.4193 9.40452C16.1873 9.37552 15.9853 9.23052 15.8783 9.01652L14.0503 5.35652C14.0473 5.35252 14.0453 5.34852 14.0433 5.34352C13.8753 5.03252 13.6143 4.77152 13.2993 4.60452C12.4523 4.17352 11.4013 4.50552 10.9543 5.35652L9.12434 9.01552C9.01634 9.22952 8.81234 9.37552 8.57134 9.40552L4.48034 9.99552C4.08434 10.0545 3.73734 10.2305 3.47934 10.5025C3.16134 10.8315 2.99134 11.2655 3.00034 11.7235C3.00934 12.1815 3.19634 12.6065 3.52434 12.9205L6.49134 15.7765C6.65634 15.9305 6.73334 16.1655 6.69334 16.3945L5.99234 20.4125C5.93234 20.7875 5.99634 21.1745 6.17034 21.4945C6.38834 21.9045 6.75134 22.2035 7.19334 22.3395C7.36034 22.3905 7.53134 22.4155 7.70034 22.4155C7.97834 22.4155 8.25334 22.3475 8.50234 22.2145L12.1623 20.3225C12.3743 20.2095 12.6293 20.2095 12.8463 20.3245L16.4883 22.2085C16.8153 22.3885 17.1883 22.4535 17.5813 22.3935C18.5203 22.2395 19.1633 21.3495 19.0103 20.4045L18.3103 16.3945C18.2693 16.1585 18.3453 15.9275 18.5183 15.7615L21.4763 12.9205C21.7533 12.6535 21.9353 12.2965 21.9853 11.9155C22.1083 10.9835 21.4493 10.1215 20.5193 9.99552Z"
        fill="url(#star-gradient)" // Use the gradient as fill
        // stroke={colors.neutral.onBackgroundDisabled} // Border color
        // strokeWidth="1" // Border width
      />
    </svg>
  )
}

export default GradientStar
