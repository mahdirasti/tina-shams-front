type Props = {
  className?: string
}
export default function Skeleton({ className }: Props) {
  return (
    <div
      className={`skeleton animate-pulse rounded-xl bg-black/[0.07] max-w-full ${
        className || ""
      }`}
    ></div>
  )
}
