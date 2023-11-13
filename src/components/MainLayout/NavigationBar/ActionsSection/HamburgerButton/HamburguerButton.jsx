function HamburguerButton({ isMenuOpen }) {
  return (
    <div className="space-y-2 flex flex-col items-end">
      <span
        className={`block h-[3px] w-6 origin-center rounded-full bg-foreground transition-transform ease-in-out ${
          isMenuOpen && "translate-y-[5px] -rotate-45"
        }`}
      ></span>
      <span
        className={`block h-[3px] w-3 origin-center rounded-full bg-foreground transition-transform ease-in-out ${
          isMenuOpen && "!w-6 -translate-y-[5px] rotate-45"
        }`}
      ></span>
    </div>
  );
}

export default HamburguerButton;
