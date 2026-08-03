"""Generate a branded PDF of every course curriculum into public/curriculum-pdf/.

Usage:
  bun --preload scripts/img-stub-plugin.ts scripts/export-curriculum-json.ts
  python3 scripts/generate_curriculum_pdfs.py
"""
import asyncio, html, json, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "curriculum-pdf"
OUT.mkdir(parents=True, exist_ok=True)
DATA = json.loads(pathlib.Path("/tmp/curricula.json").read_text())

PURPLE = "#500b9e"
PURPLE_LIGHT = "#945ff9"

CSS = f"""
@page {{ size: A4; margin: 16mm 14mm 18mm 14mm; }}
* {{ box-sizing: border-box; }}
body {{ font-family: "DejaVu Sans", Arial, Helvetica, sans-serif; color:#1a1a1f; font-size:10.5px; line-height:1.5; margin:0; }}
h1,h2,h3,h4 {{ margin:0; color:{PURPLE}; }}
.cover {{ page-break-after: always; padding-top:38mm; }}
.cover .brand {{ font-size:13px; letter-spacing:.28em; text-transform:uppercase; color:{PURPLE}; font-weight:700; }}
.cover h1 {{ font-size:40px; line-height:1.1; margin-top:14px; }}
.cover .sub {{ font-size:15px; color:#444; margin-top:10px; }}
.rule {{ height:3px; background:linear-gradient(90deg,{PURPLE},{PURPLE_LIGHT}); border-radius:3px; margin:18px 0; }}
.rule.thin {{ height:1.5px; margin:8px 0 12px; }}
.meta {{ display:flex; flex-wrap:wrap; gap:8px; margin-top:18px; }}
.meta div {{ border:1px solid {PURPLE}; border-radius:8px; padding:8px 12px; min-width:120px; }}
.meta span {{ display:block; font-size:8.5px; text-transform:uppercase; letter-spacing:.12em; color:{PURPLE}; font-weight:700; }}
.meta strong {{ font-size:12px; font-weight:600; }}
.box {{ border:1px solid #e2ddf0; border-left:4px solid {PURPLE}; border-radius:8px; padding:12px 14px; margin-top:16px; background:#faf8ff; }}
.box h4 {{ font-size:10px; text-transform:uppercase; letter-spacing:.14em; margin-bottom:5px; }}
.toc {{ page-break-after: always; }}
.toc ol {{ margin:0; padding-left:18px; }}
.toc li {{ margin-bottom:5px; }}
.week {{ page-break-before: always; }}
.week-head {{ border-bottom:2px solid {PURPLE}; padding-bottom:8px; margin-bottom:12px; }}
.badge {{ display:inline-block; background:{PURPLE}; color:#fff; font-size:9px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; padding:4px 10px; border-radius:20px; }}
.week-head h2 {{ font-size:22px; margin-top:9px; }}
.sec-title {{ font-size:11px; text-transform:uppercase; letter-spacing:.14em; color:{PURPLE}; font-weight:700; margin-top:14px; }}
ul {{ margin:6px 0 0; padding-left:16px; }}
li {{ margin-bottom:3px; }}
.section {{ border:1px solid #e6e1f2; border-radius:8px; padding:10px 12px; margin-top:9px; page-break-inside:avoid; }}
.section .sid {{ color:{PURPLE_LIGHT}; font-weight:700; margin-right:6px; }}
.section .stitle {{ font-weight:700; font-size:11.5px; color:{PURPLE}; }}
.topics {{ margin-top:6px; display:flex; flex-wrap:wrap; gap:4px; }}
.topics span {{ border:1px solid #ded6f3; background:#f6f2ff; border-radius:5px; padding:2.5px 7px; font-size:9.5px; }}
.two {{ display:flex; gap:14px; page-break-inside:avoid; }} .two > div {{ flex:1; }}
.sec-title {{ page-break-after:avoid; }}
.footer-note {{ margin-top:26px; font-size:9px; color:#777; text-align:center; }}
"""


def ul(items):
    return "<ul>" + "".join(f"<li>{html.escape(i)}</li>" for i in items) + "</ul>"


def week_html(w, total):
    secs = "".join(
        f'<div class="section"><div><span class="sid">{html.escape(s["id"])}</span>'
        f'<span class="stitle">{html.escape(s["title"])}</span></div>'
        f'<div class="topics">{"".join(f"<span>{html.escape(t)}</span>" for t in s["topics"])}</div></div>'
        for s in w["sections"]
    )
    parts = [
        f'<section class="week"><div class="week-head">'
        f'<span class="badge">Week {w["number"]} of {total}</span><h2>{html.escape(w["title"])}</h2></div>'
    ]
    if w.get("overview"):
        parts.append(f'<p>{html.escape(w["overview"])}</p>')
    parts.append('<div class="sec-title">Learning Objectives</div><div class="rule thin"></div>' + ul(w["objectives"]))
    parts.append('<div class="sec-title">Detailed Topic Breakdown</div><div class="rule thin"></div>' + secs)
    parts.append('<div class="sec-title">Hands-on Exercises</div><div class="rule thin"></div>' + ul(w["exercises"]))
    parts.append('<div class="two"><div><div class="sec-title">Assignments</div><div class="rule thin"></div>'
                 + ul(w["assignments"]) + '</div><div><div class="sec-title">Projects</div><div class="rule thin"></div>'
                 + ul(w["projects"]) + "</div></div>")
    parts.append('<div class="sec-title">Weekly Learning Outcomes</div><div class="rule thin"></div>' + ul(w["outcomes"]))
    if w.get("assessment"):
        parts.append(f'<div class="box"><h4>Weekly Assessment</h4>{html.escape(w["assessment"])}</div>')
    parts.append("</section>")
    return "".join(parts)


def course_html(c):
    meta = [("Duration", c["duration"]), ("Total Weeks", str(c["totalWeeks"])), ("Level", c["level"]),
            ("Projects", c["projectsCount"]), ("Capstone", c["capstone"])]
    meta_html = "".join(f"<div><span>{html.escape(k)}</span><strong>{html.escape(v)}</strong></div>" for k, v in meta)
    toc = "".join(f'<li><strong>Week {w["number"]}:</strong> {html.escape(w["title"])}</li>' for w in c["weeks"])
    weeks = "".join(week_html(w, c["totalWeeks"]) for w in c["weeks"])
    return f"""<!doctype html><html><head><meta charset="utf-8"><style>{CSS}</style></head><body>
<div class="cover">
  <div class="brand">OxVerse Academy</div>
  <h1>{html.escape(c["title"])}<br>Curriculum</h1>
  <div class="rule"></div>
  <div class="sub">{html.escape(c["tagline"])} &middot; Cohort-based &middot; Project-driven</div>
  <div class="meta">{meta_html}</div>
  <div class="box"><h4>Programme Goal</h4>{html.escape(c["goal"])}</div>
  <div class="box"><h4>Overview</h4>{html.escape(c["overview"])}</div>
  <div class="footer-note">No 82, Century Bus Stop, Ago Palace Way, Okota, Lagos &middot; +234 913 869 1147</div>
</div>
<div class="toc"><h2>Course Outline</h2><div class="rule"></div><ol>{toc}</ol></div>
{weeks}
</body></html>"""


async def main():
    from playwright.async_api import async_playwright
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        for c in DATA:
            await page.set_content(course_html(c), wait_until="load")
            target = OUT / f'{c["slug"]}-curriculum.pdf'
            await page.pdf(path=str(target), format="A4", print_background=True,
                           display_header_footer=True,
                           header_template='<div></div>',
                           footer_template=(
                               '<div style="width:100%;font-size:8px;color:#777;padding:0 14mm;'
                               'display:flex;justify-content:space-between;font-family:Arial">'
                               f'<span>{html.escape(c["title"])} Curriculum &middot; OxVerse Academy</span>'
                               '<span class="pageNumber"></span></div>'),
                           margin={"top": "14mm", "bottom": "16mm", "left": "0", "right": "0"})
            print("wrote", target.name, target.stat().st_size // 1024, "KB")
        await browser.close()

asyncio.run(main())
