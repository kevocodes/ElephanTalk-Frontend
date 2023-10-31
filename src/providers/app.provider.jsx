import {NextUIProvider} from "@nextui-org/react";

function AppProvider({ children }) {
  return (
    <NextUIProvider>
      { children }
    </NextUIProvider>
  )
}

export default AppProvider