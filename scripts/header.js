document.addEventListener("DOMContentLoaded", () => {
  fetch("header.html")
    .then(response => {
      if (!response.ok) throw new Error("Network error");
      return response.text();
    })
    .then(data => {
      const header = document.querySelector("header");
      if (!header) throw new Error("No <header> element found in document");

      header.innerHTML = data;
    })
    .catch(error => {
      console.error("Error loading header:", error);
    });
});

const toggleOverlay = () => {
  const overlay = document.querySelector(".site-overlay")
  if (overlay.classList.contains("site-overlay--active")) {
    overlay.classList.remove("site-overlay--active")
  } else {
    overlay.classList.add("site-overlay--active")
  }
}