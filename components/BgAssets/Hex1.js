import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function Hex1() {
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
          src="https://user-images.githubusercontent.com/64256342/152650045-df82c3ea-e3ac-4bf2-acaa-14d80729384d.png"
          alt="small-hex-light"
        />
      ) : (
        <div>
          <div>
            <img
              src="https://user-images.githubusercontent.com/64256342/152649557-7948e286-a251-499f-bac8-8cefda0afe7f.png"
              alt="small-hex-dark"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Hex1;
