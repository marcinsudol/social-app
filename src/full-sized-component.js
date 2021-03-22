export default function FullSizedComponent({ children }) {
  return (
    <div
      style={{
        display: "grid",
        height: "100%",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}
