import type { ReactElement } from "react";
import { IconBadge } from "../components/card-components/IconBadge";

export const getHealtScore = (healthScore: number | undefined): ReactElement | false | 0 | undefined => {
    return healthScore &&
    IconBadge({icon:'💚',text: `Health Score ${healthScore}`,color: "bg-blue-100 text-blue-950"})
}