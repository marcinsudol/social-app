export default function SrOnly({ children }) {
  return (
    <div
      className="sr-only"
      style={{
        position: "absolute",
        left: "-10000px",
        top: "auto",
        height: "1px",
        width: "1px",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}
