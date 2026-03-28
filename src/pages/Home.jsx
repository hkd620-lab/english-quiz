export default function Home() {
  return (
    <div style={{ padding: 20, background: "#f5f7fb", minHeight: "100vh" }}>
      
      <h1 style={{ textAlign: "center" }}>
        Interrogative Quiz
      </h1>

      <div
        style={{
          background: "white",
          padding: 20,
          borderRadius: 12,
          marginTop: 20,
        }}
      >
        <h2>What is your name?</h2>

        <div style={{ marginTop: 10 }}>
          <button style={{ margin: 5 }}>What</button>
          <button style={{ margin: 5 }}>Who</button>
          <button style={{ margin: 5 }}>Where</button>
        </div>

        <button style={{ marginTop: 15 }}>Check Answer</button>
      </div>

      <div style={{ marginTop: 30 }}>
        <h3>Wrong Notes</h3>
        <p>No mistakes yet</p>
      </div>
    </div>
  );
}