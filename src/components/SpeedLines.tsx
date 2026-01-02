export const SpeedLines = () => {
  return (
    <div className="speed-lines">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="speed-line"
          style={{
            top: `${15 + i * 18}%`,
            width: `${100 + Math.random() * 200}px`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${1.5 + Math.random() * 1}s`,
          }}
        />
      ))}
    </div>
  );
};
