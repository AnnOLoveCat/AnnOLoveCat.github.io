(async function () {
  const el = document.getElementById("newsList");
  if (!el) return;

  const accents = ["#ff2d55", "#ffd60a", "#00e5ff", "#ff7a00", "#39ff14", "#7c4dff"];

  function esc(s) {
    return String(s ?? "").replace(/[<>]/g, "");
  }

  function formatPosted(iso) {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const mi = String(d.getMinutes()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd} ${hh}:${mi}`;
  }

  function card(item, idx) {
    const accent = accents[idx % accents.length];
    const time = esc(item.time || "");
    const title = esc(item.title || "");
    const url = item.url || "#";
    const posted = formatPosted(item.published_at) || "";
    const img = item.image;

    const thumb = img
      ? `<div class="news-thumb"><img src="${img}" alt="news thumbnail" loading="lazy"></div>`
      : `<div class="news-thumb"></div>`;

    return `
      <article class="news-card" style="--accent:${accent}">
        <a href="${url}" target="_blank" rel="noopener">
          <div class="news-card-inner">
            <div class="news-meta">
              <div class="news-time">${time}</div>
              <div class="news-headline">${title}</div>
              <div class="news-posted">${posted}</div>
            </div>
            ${thumb}
          </div>
        </a>
      </article>
    `;
  }

  try {
    const res = await fetch(`data/news.json?v=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      el.innerHTML = `<p>目前沒有新聞資料。</p>`;
      return;
    }

    el.innerHTML = data.slice(0, 8).map(card).join("");
  } catch (e) {
    console.error(e);
    el.innerHTML = `<p>新聞載入失敗：請確認 data/news.json 存在，且 GitHub Pages 已更新。</p>`;
  }
})();
