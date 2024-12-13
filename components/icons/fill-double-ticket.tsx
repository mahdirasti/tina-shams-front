import { IconPropsType, defaultColor } from "."

type Props = {} & IconPropsType

const FillDoubleTicket = ({ color = defaultColor, size = 24 }: Props) => {
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
        d="M9.27494 18.7179C6.84894 18.0619 5.40394 15.5559 6.05194 13.1319L7.87246 6.29714C7.92319 6.1067 7.77964 5.91992 7.58257 5.91992H6.40294C4.43594 5.91992 2.83594 7.51692 2.83594 9.47992V17.9699C2.83594 19.9389 4.43594 21.5399 6.40294 21.5399H12.4189C13.2499 21.5399 13.979 21.1005 14.3889 20.443C14.4937 20.2749 14.3734 20.0707 14.179 20.033C14.0844 20.0147 13.9901 19.9933 13.8959 19.9679L9.27494 18.7179Z"
        fill={color}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18.5247 3.82446L13.9137 2.58446C12.9927 2.33746 12.0287 2.46346 11.2017 2.93946C10.3757 3.41646 9.78567 4.18646 9.53967 5.10746L7.35567 13.3065C6.84867 15.1985 7.97767 17.1555 9.87367 17.6695L14.4947 18.9195C14.8017 19.0025 15.1147 19.0435 15.4247 19.0435C16.0417 19.0435 16.6497 18.8815 17.1987 18.5645C18.0237 18.0885 18.6127 17.3175 18.8587 16.3955L21.0447 8.18546C21.5487 6.29346 20.4197 4.33746 18.5247 3.82446Z"
        fill={color}
      />
    </svg>
  )
}

export default FillDoubleTicket
