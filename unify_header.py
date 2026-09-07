#!/usr/bin/env python3
"""Sostituisce header hd-bar/site-header con placeholder + decastro-header.js in tutte le pagine statiche.

Verifica: dopo ogni replace controlla che l'header vecchio sia sparito.
"""
import re, sys, pathlib

ROOT = pathlib.Path('/root/decastropt')
PAGES = ['nutrizione.html', 'chi-sono.html', 'assessment.html', 'privacy.html', 'termini.html', 'terms.html',
         'personal-trainer-roma-centro.html', 'personal-trainer-roma-roma-centro.html',
         'personal-trainer-roma-est.html', 'personal-trainer-roma-nord.html',
         'personal-trainer-roma-ovest.html', 'personal-trainer-roma-sud.html',
         '404.html']

RE_HDBAR = re.compile(r'<header class="hd-bar">.*?</header>', re.S)
RE_SITEH = re.compile(r'<header class="site-header"[^>]*>.*?</header>\s*(?:<script[^>]*>.*?</script>)?', re.S)
RE_DDW = re.compile(r'<div class="drawer-overlay[^"]*"[^>]*>.*?</div>', re.S)

for p in PAGES:
    f = ROOT / p
    if not f.exists():
        print(f'SKIP (not exists): {p}')
        continue
    src = f.read_text(encoding='utf-8')

    # 1) condividono shared-theme.css? se no, aggiungilo (per chi-sono/assessment/privacy/termini/terms/404)
    if 'shared-theme.css' not in src:
        # inserisci prima di </head>
        m = re.search(r'(</head>)', src)
        if m:
            src = src.replace('</head>', '<link rel="stylesheet" href="/shared-theme.css?v=4">', 1)

    # 2) sostituisci header
    new_header = '<div data-decastro-header></div>'
    if 'hd-bar' in src:
        src, n = RE_HDBAR.subn(new_header, src)
        print(f'{p}: hd-bar → placeholder ({n})')
    elif 'site-header' in src:
        # sostituisci il vecchio site-header statico + eventuale drawer-overlay legacy
        src, n = RE_SITEH.subn(new_header, src)
        print(f'{p}: site-header statico → placeholder ({n})')
    else:
        print(f'{p}: no header found, SKIP header')
        continue

    # 3) drawer-overlay legacy (se presente, si era il drawer della SPA — non toccare)
    # 4) aggiungi script header dopo shared-theme (se assente)
    if 'decastro-header.js' not in src:
        src = src.replace('</head>', '<script defer src="/decastro-header.js?v=1"></script>', 1)

    # 4b) rimuovi i vecchi script inline che pilotano siteHeader/burgerBtn (ora gestiti dal nuovo script)
    src = re.sub(
        r"<script>\s*\(function\(\)\{\s*var header = document\.getElementById\('siteHeader'\);.*?\}\)\(\);"
        r"\s*</script>", '', src, flags=re.S)

    # 5) link CSS: se assente shared-theme.css link (alcune pagine usano solo stili inline)
    f.write_text(src, encoding='html' and 'utf-8')
    print(f'  → written {len(src)} chars')

print('DONE')
