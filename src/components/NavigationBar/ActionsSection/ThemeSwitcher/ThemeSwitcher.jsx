import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      isIconOnly
      size="lg"
      variant="light"
      color="primary"
      aria-label="Theme Switcher"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Icon icon="ion:moon" className="text-foreground"/>
        ) : (
        <Icon icon="material-symbols:sunny-rounded" className="text-foreground"/>
      )}
    </Button>
  );
}
