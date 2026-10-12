#!/usr/bin/env python3
"""Download licensed Wikimedia Commons stills for project cards."""

from io import BytesIO
from pathlib import Path
from urllib.parse import quote
from urllib.request import Request, urlopen

from PIL import Image

UA = "PrimeRebarSite/1.0 (https://www.primerebar.com/; office@primerebar.com)"
OUT = Path("public/images/projects")
TARGET_W, TARGET_H = 1600, 900

FILES = {
    "virgin-hotels": "Virgin Hotel Manhattan 003.jpg",
    "625-fulton": "City Point - Brooklyn (55268461473).jpg",
    "200-kent": "420 Kent Avenue apartments at blue hour, Williamsburg, Brooklyn, New York - 20221123.jpg",
    "200-montague": "People's Trust Company Building 183 Montague Street Brooklyn.jpg",
    "69-adams": "Adams Street beneath the Manhattan Bridge, Dumbo, Brooklyn, New York.jpg",
    "240-willoughby": "Willoughby St Jul 2024 59.jpg",
    "334-wallabout": "11 Second Place Brooklyn.jpg",
    "1634-flatbush": "Flatbush Avenue, Park Slope, Brooklyn, NY.jpg",
    "321-main": "Hackensack NJ Old Ch on the Green PHS735.jpg",
    "711-montgomery": "Small apartment building and new apartment tower in Jersey City on Cottage Street.jpg",
    "626-newark": "Newark Avenue 295 Jersey City.jpg",
    "622-summit": "330FairmountAve.JerseyCity.jpg",
    "620-w-153rd": "Harlem Jul 2026 47.jpg",
    "509-3rd": "Kips Bay Towers.jpg",
    "249-east-62": "Lexington Avenue and 62nd Street, 130 East 63rd Street building, Lenox Hill, Upper East Side, Manhattan, NY.jpg",
    "113-w-24th": "West 24th Street (Manhattan) May 2023.JPG",
    "347-flushing": "Williamsburg Brooklyn April 2025 026.jpg",
    "310-grand": "2021 Grand Concourse, Bronx, NY.jpg",
    "46-10-70th": "21st Street Astoria 04.jpg",
    "1850-jerome": "OGM - Anderson-Jerome Avenue building.jpg",
    "98-08-queens": "Queens Boulevard west of Yellowstone Boulevard.jpg",
    "198-135th": "Mott Haven Bronx August 2026 02.jpg",
    "147-35-95th": "Jamaica Queens Nov 2025 175.jpg",
}


def crop_16x9(img: Image.Image) -> Image.Image:
    img = img.convert("RGB")
    w, h = img.size
    target_ratio = TARGET_W / TARGET_H
    if w / h > target_ratio:
        nw = int(h * target_ratio)
        left = (w - nw) // 2
        img = img.crop((left, 0, left + nw, h))
    else:
        nh = int(w / target_ratio)
        top = int((h - nh) * 0.28)
        top = max(0, min(top, h - nh))
        img = img.crop((0, top, w, top + nh))
    return img.resize((TARGET_W, TARGET_H), Image.Resampling.LANCZOS)


def fetch(filename: str) -> bytes:
    url = f"https://commons.wikimedia.org/wiki/Special:FilePath/{quote(filename)}?width=1920"
    req = Request(url, headers={"User-Agent": UA})
    with urlopen(req, timeout=90) as res:
        return res.read()


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    failed = []
    for pid, filename in FILES.items():
        dest = OUT / f"{pid}.jpg"
        try:
            raw = fetch(filename)
            img = Image.open(BytesIO(raw))
            crop_16x9(img).save(dest, "JPEG", quality=84, optimize=True)
            print(f"ok {pid} {dest.stat().st_size} {filename}")
        except Exception as exc:
            failed.append((pid, filename, str(exc)))
            print(f"FAIL {pid}: {exc}")
    if failed:
        raise SystemExit(f"{len(failed)} downloads failed")


if __name__ == "__main__":
    main()
