import moment from "jalali-moment"

export default function getRelativeTime(pastTime: any) {
  const now = moment()
  const time = moment(pastTime)
  const diffMinutes = now.diff(time, "minutes")
  const diffHours = now.diff(time, "hours")
  const diffDays = now.diff(time, "days")
  const diffMonths = now.diff(time, "months")

  if (diffMinutes < 60) {
    return `${diffMinutes} دقیقه پیش`
  } else if (diffHours < 24) {
    return `${diffHours} ساعت پیش`
  } else if (diffDays < 30) {
    return `${diffDays} روز پیش`
  } else {
    return `${diffMonths} ماه پیش`
  }
}
