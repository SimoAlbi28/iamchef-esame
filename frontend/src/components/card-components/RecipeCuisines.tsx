import { IconBadge } from "./IconBadge";

type RecipeCuisinesProps = {
    cuisines: string[] | undefined
}

export const RecipeCuisines = ({cuisines}: RecipeCuisinesProps) => {

    return cuisines && cuisines.length > 0 &&
              <IconBadge icon={"🌎"} text={cuisines.join(', ')} color={"bg-emerald-100 text-emerald-900"} />

}