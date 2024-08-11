import { useState, useEffect } from "react";

const useResizeWindow = () => {
  const [isDesktopView, setIsDesktopView] = useState(false);

  useEffect(() => {
    // Verificar si window está disponible (en el cliente)
    if (typeof window !== "undefined") {
      // Inicializar el estado con el tamaño actual de la ventana
      setIsDesktopView(window.innerWidth >= 800);

      const handleResize = () => {
        setIsDesktopView(window.innerWidth >= 800);
      };

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Dependencia vacía para ejecutar el efecto solo una vez

  return isDesktopView;
};

export default useResizeWindow;
