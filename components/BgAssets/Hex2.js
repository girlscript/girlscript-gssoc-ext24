import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function Hex2() {
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
          src="https://user-images.githubusercontent.com/64256342/152650042-40a281d5-4bdc-40a0-bd06-d907023f1a04.png"
          alt="small-hex-light"
        />
      ) : (
        <div>
          <div>
            <img
              src="https://user-images.githubusercontent.com/64256342/152649559-ca1a548c-268f-4f55-9ac6-4a4a40143361.png"
              alt="small-hex-dark"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Hex2;
