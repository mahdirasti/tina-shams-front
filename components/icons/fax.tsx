import { IconPropsType, defaultColor } from ".";

type Props = {} & IconPropsType;

function Fax({ color = defaultColor, size = 24 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.24748 7.72461C5.82412 7.72461 4.66699 8.88391 4.66699 10.2954V14.3099C4.66699 15.7288 5.82283 16.8806 7.24748 16.8806H8.32748C8.74169 16.8806 9.07748 17.2164 9.07748 17.6306C9.07748 18.0448 8.74169 18.3806 8.32748 18.3806H7.24748C5.00012 18.3806 3.16699 16.5629 3.16699 14.3099V10.2954C3.16699 8.05234 4.99883 6.22461 7.24748 6.22461H18.5962C20.8477 6.22461 22.667 8.0552 22.667 10.2954V14.3099C22.667 16.5601 20.8465 18.3806 18.5962 18.3806H17.5435C17.1293 18.3806 16.7935 18.0448 16.7935 17.6306C16.7935 17.2164 17.1293 16.8806 17.5435 16.8806H18.5962C20.018 16.8806 21.167 15.7316 21.167 14.3099V10.2954C21.167 8.88105 20.0167 7.72461 18.5962 7.72461H7.24748Z"
        fill={color}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.33008 14.0586C8.74429 14.0586 9.08008 14.3944 9.08008 14.8086V18.5789C9.08008 19.3137 9.67542 19.9091 10.4103 19.9091H15.425C16.1587 19.9091 16.7542 19.314 16.7542 18.5789V14.8086C16.7542 14.3944 17.09 14.0586 17.5042 14.0586C17.9185 14.0586 18.2542 14.3944 18.2542 14.8086V18.5789C18.2542 20.1419 16.9876 21.4091 15.425 21.4091H10.4103C8.847 21.4091 7.58008 20.1422 7.58008 18.5789V14.8086C7.58008 14.3944 7.91586 14.0586 8.33008 14.0586Z"
        fill={color}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.7041 14.8086C6.7041 14.3944 7.03989 14.0586 7.4541 14.0586H18.3816C18.7958 14.0586 19.1316 14.3944 19.1316 14.8086C19.1316 15.2228 18.7958 15.5586 18.3816 15.5586H7.4541C7.03989 15.5586 6.7041 15.2228 6.7041 14.8086Z"
        fill={color}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.708 10.5508C15.708 10.1366 16.0438 9.80078 16.458 9.80078H18.5781C18.9923 9.80078 19.3281 10.1366 19.3281 10.5508C19.3281 10.965 18.9923 11.3008 18.5781 11.3008H16.458C16.0438 11.3008 15.708 10.965 15.708 10.5508Z"
        fill={color}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.4113 4.08984C9.67663 4.08984 9.08105 4.68594 9.08105 5.42006V6.98849C9.08105 7.40271 8.74527 7.73849 8.33105 7.73849C7.91684 7.73849 7.58105 7.40271 7.58105 6.98849V5.42006C7.58105 3.85797 8.84775 2.58984 10.4113 2.58984H15.426C16.9888 2.58984 18.2552 3.8582 18.2552 5.42006V6.98849C18.2552 7.40271 17.9194 7.73849 17.5052 7.73849C17.091 7.73849 16.7552 7.40271 16.7552 6.98849V5.42006C16.7552 4.68571 16.1594 4.08984 15.426 4.08984H10.4113Z"
        fill={color}
      />
    </svg>
  );
}

export default Fax;
