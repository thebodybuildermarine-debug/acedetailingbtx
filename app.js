document.getElementById("year").textContent = new Date().getFullYear();

// --- MOBILE MENU ---
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
  navLinks.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

// --- COPY QUICK TEXT ---
const copyBtn = document.getElementById("copyBtn");
if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    const text =
      "Hey Ace Detailing! I want a quote. Vehicle: (Year/Make/Model). Service: (Exterior/Interior/Full/Ceramic). Notes: (stains/pet hair/etc). I can send photos too.";
    try {
      await navigator.clipboard.writeText(text);
      copyBtn.textContent = "Copied ✔";
      setTimeout(() => (copyBtn.textContent = "Copy Quote Message"), 1200);
    } catch {
      alert("Copy failed — copy this:\n\n" + text);
    }
  });
}

// --- FORM SUBMIT (Formspree) ---
const FORM_ENDPOINT = "https://formspree.io/f/REPLACE_ME"; // <-- paste your Formspree link here
const form = document.getElementById("quoteForm");
const msg = document.getElementById("formMsg");
const sendBtn = document.getElementById("sendBtn");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (FORM_ENDPOINT.includes("REPLACE_ME")) {
      msg.textContent = "Fix needed: paste your Formspree endpoint into app.js (FORM_ENDPOINT).";
      return;
    }

    msg.textContent = "";
    sendBtn.disabled = true;
    sendBtn.textContent = "Sending...";

    const formData = new FormData(form);

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" }
      });

      if (!res.ok) throw new Error("Request failed");

      form.reset();
      msg.textContent = "✅ Sent! We’ll text/call you back ASAP.";
      sendBtn.textContent = "Sent ✔";
      setTimeout(() => {
        sendBtn.textContent = "Send Quote Request";
        sendBtn.disabled = false;
      }, 1500);

    } catch (err) {
      msg.textContent = "❌ Didn’t send. Check your Formspree link and try again.";
      sendBtn.textContent = "Send Quote Request";
      sendBtn.disabled = false;
    }
  });
}
