const ModelOverlay = ({ children, title, onClose }) => {
  return (
    <main
      style={{
        position: "fixed", // 👈 locks it to the viewport
        inset: 0, // shorthand for top/right/bottom/left: 0
        width: "100vw",
        height: "100dvh",
        display: "flex",
        background: "rgba(0, 0, 0, 0.55)",
        backdropFilter: "blur(4px)",
        zIndex: 1000, // 👈 sits above all other content
        overflowY: "auto",
      }}
    >
      <div
        style={{
          margin: "auto",
          width: "100%",
          maxWidth: "480px",
          background: "#1a1a2e",
          border: "0.5px solid rgba(255,255,255,0.12)",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem 1.25rem",
            borderBottom: "0.5px solid rgba(255,255,255,0.1)",
            background: "#12122a",
          }}
        >
          <h5
            style={{
              margin: 0,
              color: "#e2e2f0",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {title}
          </h5>
          <button
            onClick={onClose}
            style={{
              background: "rgba(226,75,74,0.15)",
              border: "0.5px solid rgba(226,75,74,0.35)",
              color: "#f09595",
              fontSize: "12px",
              fontWeight: 500,
              padding: "4px 10px",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            ✕ Close
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "1.5rem 1.25rem", color: "#a0a0c0" }}>
          {children}
        </div>
      </div>
    </main>
  );
};

export default ModelOverlay;
