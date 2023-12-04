import {ThemeProvider} from "@/components/theme-provider"
import Home from "./pages/Home.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Home/>
        <Toaster />
      </ThemeProvider>
    </>
  )
}

export default App
