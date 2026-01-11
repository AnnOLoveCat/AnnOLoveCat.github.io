# scripts/ltn_fetch.py
import re, requests, feedparser
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

USER_AGENT = {
    "User-Agent": ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                   "AppleWebKit/537.36 (KHTML, like Gecko) "
                   "Chrome/127.0.0.0 Safari/537.36")
}

def clean_url(u: str | None, base: str) -> str | None:
    if not u:
        return None
    u = u.strip()
    if u.startswith("//"):
        u = "https:" + u
    if not u.startswith("http"):
        u = urljoin(base, u)
    parsed = urlparse(u)
    if parsed.scheme not in ("http", "https"):
        return None
    return u

def shorten(text: str, max_len: int = 60) -> str:
    text = re.sub(r"\s+", " ", text.strip())
    return text if len(text) <= max_len else text[:max_len - 1] + "…"

def get_ltn(limit: int = 8):
    rss_url = "https://news.ltn.com.tw/rss/all.xml"
    feed = feedparser.parse(rss_url)
    results = []

    for entry in feed.entries[:limit]:
        url = entry.link
        title = entry.title

        try:
            r2 = requests.get(url, headers=USER_AGENT, timeout=10)
            r2.raise_for_status()
            soup2 = BeautifulSoup(r2.text, "lxml")

            h1 = soup2.select_one("h1")
            title = h1.get_text(strip=True) if h1 else entry.title

            time_str = None
            meta_time = soup2.find("meta", property="article:published_time")
            if meta_time and meta_time.get("content"):
                m = re.search(r"T(\d{2}:\d{2})", meta_time["content"])
                if m:
                    time_str = m.group(1)

            og_img = soup2.find("meta", property="og:image")
            img_url = og_img["content"].strip() if og_img and og_img.get("content") else None
            img_url = clean_url(img_url, url)
        except Exception:
            continue

        if not img_url:
            continue

        results.append({
            "time": time_str,
            "title": shorten(title, 90),
            "url": url,
            "image": img_url,
        })

    return results
