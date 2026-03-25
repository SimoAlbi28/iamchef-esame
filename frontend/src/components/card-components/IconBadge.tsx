type IconBadgeProps = {
  icon: string,
  text: string,
  color?: string
}

export const IconBadge = ({icon, text, color = "bg-green-200 text-green-900"}: IconBadgeProps) => (
    <span className={`flex items-center gap-1 rounded-full px-3 py-1 font-bold text-xs shadow-sm ${color}`}>
      <span aria-label={text}>{icon}</span>
      {text}
    </span>
  );