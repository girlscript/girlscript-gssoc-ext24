import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function Bighex() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <div>
      {theme === "light" ? (
        <img
          className="w-full"
          src="https://user-images.githubusercontent.com/64256342/152588880-e94c9c2f-b16b-4a29-859e-503b6232709c.png"
          alt="bg-hex-light"
        />
      ) : (
        <div>
          <img
            className="w-full"
            src="https://user-images.githubusercontent.com/64256342/152649740-d146a725-dc81-4d5b-a908-1d860674b931.png"
            alt="bg-hex"
          />
        </div>
      )}
    </div>
  );
}

export default Bighex;
