import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { PostsProvider } from "../context/postsContext";

function AppProvider({ children }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <PostsProvider>{children}</PostsProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}

export default AppProvider;
