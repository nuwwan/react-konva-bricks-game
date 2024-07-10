import React, { ReactNode } from "react";

type PropType = {
  children: ReactNode;
};

const Section: React.FC<PropType> = ({ children }) => {
  return (
    <div
      style={{
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        border: "1px solid #0505050f",
        borderRadius: 5,
        padding: 10,
      }}
    >
      {children}
    </div>
  );
};

export default Section;
