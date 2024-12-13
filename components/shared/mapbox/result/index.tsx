import BlurFade from "@/components/ui/blur-fade"
import LoadingState from "./loading"
import MapboxSearchResultItem from "./item"

export type MapboxSearchItemType = {
  address: string
  category: string
  location: { x: number; y: number }
  neighbourhood: string
  region: string
  title: string
  type: string
}

type Props = {
  items: MapboxSearchItemType[]
  loading?: boolean
  onItemClick: (item: MapboxSearchItemType) => void
}

export default function MapboxSearchResult({
  items,
  loading,
  onItemClick,
}: Props) {
  if (loading) return <LoadingState />

  return (
    <div className="flex flex-col divide-y">
      {items.map((result, key) => (
        <BlurFade inView key={key + 1} delay={0.05 + key * 0.05}>
          <MapboxSearchResultItem item={result} onItemClick={onItemClick} />
        </BlurFade>
      ))}
    </div>
  )
}
