import React, { useState, memo } from "react";

interface LinkProps {
  links: string[];
}

const Links: React.FC<LinkProps> = memo(({ links }) => {
    
  const [activeLink, setActiveLink] = useState<string>("Nike");

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
      {links.map((link, index) => (
        <div key={index}>
          <button
            style={{
              backgroundColor: activeLink === link ? "white" : "black",
              color: activeLink === link ? "black" : "white",
            }}
            onClick={() => setActiveLink(link)}
          >
            {link.toUpperCase()}
          </button>
        </div>
      ))}
    </div>
  );
});

Links.displayName = "Links";

export default Links;
