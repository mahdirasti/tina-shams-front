type Props = {
  height?: number;
};
export default function OSpace({ height = 16 }: Props) {
  return <div className='w-full' style={{ height }}></div>;
}
