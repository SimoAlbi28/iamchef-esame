export const getSummary = (summary: string | undefined): string => {
    return summary?.replace(/<[^>]*>/g, '').substring(0, 180) || "Nessuna descrizione disponibile."
}