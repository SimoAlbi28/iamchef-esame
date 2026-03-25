import type { ReactElement } from "react"
import { IconBadge } from "../components/card-components/IconBadge"

export const getCost = (pricePerServing: number | undefined): ReactElement | null => {
    if (!pricePerServing || pricePerServing < 3) {
        return null
    }
    return <IconBadge icon={"💸"} text={"Costoso"} color={"bg-yellow-100 text-yellow-800"} />
}

