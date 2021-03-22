export default function FullScreenComponent({ children }) {
  return (
    <div style={{ display: "grid", height: "100vh", width: "100vw" }}>
      {children}
    </div>
  );
}
