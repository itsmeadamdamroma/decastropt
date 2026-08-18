import re, os, glob
from html import unescape

with open('/root/decastropt/_partials/page.html') as f:
    TMPL = f.read()

files = glob.glob('/root/decastropt/*.html') + glob.glob('/root/decastropt/blog/*.html') + glob.glob('/root/decastropt/risorse/*.html')

for fn in files:
    if fn.endswith('/index.html') and 'decastropt/index.html' in fn:
        continue
    if 'google' in fn:
        continue
    with open(fn) as f:
        c = f.read()

    # Preserve current title
    m_title = re.search(r'<title>(.*?)</title>', c, re.I | re.S)
    title = m_title.group(1).strip() if m_title else 'Decastro PT'

    # Preserve current meta description
    m_desc = re.search(r'<meta[^>]*name=["\']description["\'][^>]*content=["\']([^"\']*?)["\']', c, re.I)
    desc = m_desc.group(1).strip() if m_desc else 'Personal trainer Roma Davide Decastro. Schede tecniche su misura.'

    # Canonical from file path
    rel = fn.replace('/root/decastropt/', '')
    canonical = 'https://decastropt.com/' + ('' if rel == 'index.html' else rel)

    # Preserve any JSON-LD scripts
    schemas = re.findall(r'<script type=["\']application/ld\+json["\']>.*?</script>', c, re.I | re.S)
    schema = '\n'.join(schemas)

    # Extract main content: first h1 through before footer or end of body
    # Drop old header/nav if present, keep everything from first h1 to before </body>
    c = re.sub(r'<head>.*?</head>', '', c, flags=re.I | re.S)
    c = re.sub(r'<header\b.*?</header>', '', c, flags=re.I | re.S, count=1)
    c = re.sub(r'<div\b[^>]*(?:mobile-menu|nav-mobile)[^>]*>.*?</div>', '', c, flags=re.I | re.S, count=1)
    c = re.sub(r'<nav\b.*?</nav>', '', c, flags=re.I | re.S, count=1)
    c = re.sub(r'<script>\(function\(\)\{var\s+m=document\.getElementById\(\'mobile-menu\'\).*?</script>', '', c, flags=re.I | re.S)
    c = re.sub(r'<script>document\.querySelectorAll\(\'\.nav-mobile a\'\).*?</script>', '', c, flags=re.I | re.S)
    c = re.sub(r'<script>\(function\(\)\{const\s+b=document\.querySelector\(\'\.nav-burger\'\).*?</script>', '', c, flags=re.I | re.S)
    # Drop old footer
    c = re.sub(r'<footer\b.*?</footer>', '', c, flags=re.I | re.S)
    # Trim to body content
    c = re.sub(r'^.*?<body[^>]*>', '', c, flags=re.I | re.S)
    c = re.sub(r'</body>.*$', '', c, flags=re.I | re.S).strip()

    main = '<main>\n<div class="container">\n' + c + '\n</div>\n</main>'

    out = TMPL.replace('{{TITLE}}', title)\
              .replace('{{DESCRIPTION}}', desc)\
              .replace('{{CANONICAL}}', canonical)\
              .replace('{{SCHEMA}}', schema)\
              .replace('{{MAIN}}', main)

    with open(fn, 'w') as f:
        f.write(out)
    print(f'done {os.path.basename(fn)}')
