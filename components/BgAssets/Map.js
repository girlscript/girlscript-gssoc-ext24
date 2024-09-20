import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
function Map() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <div>
      <div>
        {theme === "light" ? (
          <img
            src="https://user-images.githubusercontent.com/64256342/152845808-59fb9617-fdb7-47f3-99be-3a553ea8e37f.svg"
            alt="map-light"
          />
        ) : (
          <div>
            <div>
              <img
                src="https://user-images.githubusercontent.com/64256342/152846276-5a87ebb4-defb-485e-abbd-faf0b3d4897b.svg"
                alt="map-dark"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Map;
