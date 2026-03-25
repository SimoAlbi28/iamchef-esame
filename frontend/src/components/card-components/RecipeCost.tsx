import { IconBadge } from "./IconBadge"

type RecipeCostProps = {
    pricePerServing: number | undefined
}

export const RecipeCost = ({pricePerServing}: RecipeCostProps) => {
    return pricePerServing && pricePerServing >= 3 && 
        <IconBadge icon={"💸"} text={"bg-yellow-100 text-yellow-800"} />
}