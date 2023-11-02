function FavoriteIcon({
  size = 24,
  width,
  height,
  strokeWidth = 1.5,
  fill = "none",
  ...props
}) {
  return (
    <svg
      aria-hidden="true"
      fill={fill}
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M5 21V5q0-.825.588-1.413T7 3h10q.825 0 1.413.588T19 5v16l-7-3l-7 3Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

export default FavoriteIcon;
