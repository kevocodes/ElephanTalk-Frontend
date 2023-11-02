function SendIcon({
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
        d="m5 12l-.604-5.437C4.223 5.007 5.825 3.864 7.24 4.535l11.944 5.658c1.525.722 1.525 2.892 0 3.614L7.24 19.465c-1.415.67-3.017-.472-2.844-2.028L5 12Zm0 0h7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

export default SendIcon;
