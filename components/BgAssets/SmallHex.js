import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function SmallHex() {
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
          src="https://user-images.githubusercontent.com/64256342/152588822-2cb7c0fe-4361-40bb-891a-5c8b4d615ec2.png"
          alt="small-hex-light"
        />
      ) : (
        <div>
          <div>
            <img
              src="https://user-images.githubusercontent.com/64256342/152585664-d547484c-2ac2-4fda-99a3-c38e9668c43f.png"
              alt="small-hex-dark"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default SmallHex;
