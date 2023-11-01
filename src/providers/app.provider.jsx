import { NextUIProvider } from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";


function AppProvider({ children }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
          {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}

export default AppProvider;
