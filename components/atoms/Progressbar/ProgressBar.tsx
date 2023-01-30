import * as React from 'react';

type ProgressBarProps = {
    progress: number;
}

export const ProgressBar = ({ progress }: ) => {
  return (
    <div style={{ display: "flex", height: 20 }}>
      {[...Array(10)].map((section, index) => (
        <div
          key={index}
          style={{
            backgroundColor: index < progress ? "#FFA500" : "#F5F5F5",
            width: `${100 / 10}%`,
            height: "100%",
          }}
        />
      ))}
    </div>
  );
};
