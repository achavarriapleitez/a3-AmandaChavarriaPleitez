document.querySelector("#loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const username = document.querySelector("#username").value.trim();
    if (!username) return;
  
    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
  
      const result = await res.json();
  
      if (result.success) {
        // Redirect to mood tracker with username in query string
        window.location.href = `/index.html?username=${encodeURIComponent(username)}`;
      } else {
        alert("Login failed: " + (result.error || "unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("Login failed: " + err.message);
    }
  });
  