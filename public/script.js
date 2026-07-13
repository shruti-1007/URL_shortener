const shortenForm = document.getElementById("shorten-form");
const analyticsForm = document.getElementById("analytics-form");

const statusEl = document.getElementById("status");
const resultEl = document.getElementById("result");
const shortLinkEl = document.getElementById("short-link");
const copyBtn = document.getElementById("copy-btn");

const analyticsStatusEl = document.getElementById("analytics-status");
const analyticsBoxEl = document.getElementById("analytics-box");
const clickCountEl = document.getElementById("click-count");

let currentShortLink = "";

function normalizeShortId(input) {
  const raw = String(input || "").trim();
  if (!raw) {
    return "";
  }

  // Accept either a plain shortId (AbC123) or a full short URL.
  try {
    const parsed = new URL(raw);
    return parsed.pathname.replace(/^\/+|\/+$/g, "");
  } catch {
    return raw.replace(/^\/+|\/+$/g, "");
  }
}

shortenForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(shortenForm);
  const longUrl = String(formData.get("url") || "").trim();

  if (!longUrl) {
    statusEl.textContent = "Please enter a valid URL.";
    return;
  }

  statusEl.textContent = "Making your cute link...";
  resultEl.classList.add("hidden");

  try {
    const response = await fetch("/url/url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: longUrl }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Could not shorten URL.");
    }

    const shortUrl = `${window.location.origin}/${data.shortId}`;
    currentShortLink = shortUrl;
    shortLinkEl.href = shortUrl;
    shortLinkEl.textContent = shortUrl;
    resultEl.classList.remove("hidden");
    statusEl.textContent = "Done! Your tiny link is ready.";
  } catch (error) {
    statusEl.textContent = error.message || "Something went wrong.";
  }
});

copyBtn.addEventListener("click", async () => {
  if (!currentShortLink) {
    return;
  }

  try {
    await navigator.clipboard.writeText(currentShortLink);
    copyBtn.textContent = "Copied!";
    setTimeout(() => {
      copyBtn.textContent = "Copy Link";
    }, 1200);
  } catch {
    statusEl.textContent = "Copy failed. Please copy it manually.";
  }
});

analyticsForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(analyticsForm);
  const shortId = normalizeShortId(formData.get("shortId"));

  if (!shortId) {
    analyticsStatusEl.textContent = "Please enter a short ID.";
    return;
  }

  analyticsStatusEl.textContent = "Checking analytics...";
  analyticsBoxEl.classList.add("hidden");

  try {
    const response = await fetch(`/url/analytics/${encodeURIComponent(shortId)}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Could not fetch analytics.");
    }

    clickCountEl.textContent = String(data.totalClicks ?? 0);
    analyticsBoxEl.classList.remove("hidden");
    analyticsStatusEl.textContent = "Analytics loaded.";
  } catch (error) {
    analyticsStatusEl.textContent = error.message || "Something went wrong.";
  }
});
