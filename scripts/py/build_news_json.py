# scripts/build_news_json.py
import json
from datetime import datetime, timezone

from news_links import get_ltn

def main():
    items = get_ltn(limit=8)
    now_iso = datetime.now(timezone.utc).isoformat(timespec="seconds")

    out = []
    for it in items:
        out.append({
            "time": it.get("time"),
            "title": it.get("title"),
            "url": it.get("url"),
            "image": it.get("image"),
            "published_at": now_iso,   # 這是更新時間（像 Discord 的發送時間）
            "source": "LTN",
        })

    with open("data/news.json", "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    main()
