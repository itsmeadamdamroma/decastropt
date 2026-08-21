#!/usr/bin/env python3
"""
DecastroPT Google Push — every 2 days cron.
1. Submit all sitemap URLs to Google Indexing API
2. Submit all URLs to IndexNow (Bing/Yandex)
3. Log results
"""
import json, subprocess, sys, os
from datetime import datetime, timezone

SERVICE_ACCOUNT = "/root/.hermes/gsc-service-account.json"
INDEXNOW_KEY = "89c34137e077bdf8ebc85945bc06e826"
SITE = "https://decastropt.com"
SITEMAP = f"{SITE}/sitemap.xml"
LOG = "/root/decastropt/cron_push.log"

URLS = [
    f"{SITE}/",
    f"{SITE}/servizi.html",
    f"{SITE}/assessment.html",
    f"{SITE}/chi-sono.html",
    f"{SITE}/risorse/",
    f"{SITE}/risorse/faq-personal-trainer-roma.html",
    f"{SITE}/blog/",
    f"{SITE}/blog/personal-trainer-roma-come-scegliere.html",
    f"{SITE}/blog/personal-trainer-roma-prezzi-2026.html",
    f"{SITE}/blog/assessment-corporeo-roma-bmi-bfr-bmr.html",
    f"{SITE}/blog/personal-trainer-online-vs-presenza.html",
    f"{SITE}/blog/programmazione-allenamento-principianti.html",
    f"{SITE}/blog/allenamento-post-infortunio-roma.html",
    f"{SITE}/blog/personal-trainer-donna-roma.html",
    f"{SITE}/blog/nutrizione-sportiva-calcolo-macronutrienti.html",
    f"{SITE}/blog/scheda-tecnica-personalizzata-cosa-aspettarsi.html",
    f"{SITE}/blog/allenamento-a-casa-vs-palestra.html",
    f"{SITE}/privacy.html",
    f"{SITE}/terms.html",
    f"{SITE}/termini.html",
    f"{SITE}/blog/proteine-per-massa-la-chiave-del-successo-per-i-tuoi-obiettivi.html",
    f"{SITE}/blog/deficit-calorico-il-segreto-per-un-corpo-perfetto.html",
    f"{SITE}/blog/migliaia-di-muscoli-il-segreto-della-masse-muscolare.html",
    f"{SITE}/blog/calcolare-bmi-bmr-e-tdee-la-chiave-per-un-allenamento-personalizzato.html",
]

def log(msg):
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")
    line = f"[{ts}] {msg}"
    print(line)
    with open(LOG, "a") as f:
        f.write(line + "\n")

# 1. Google Indexing API via JWT
def google_index():
    try:
        from google.oauth2 import service_account
        from google.auth.transport.requests import Request
        import google.auth.transport.requests as tr
        import urllib.request
        
        creds = service_account.Credentials.from_service_account_file(
            SERVICE_ACCOUNT,
            scopes=["https://www.googleapis.com/auth/indexing"]
        )
        creds.refresh(Request())
        
        ok = 0
        err = 0
        for url in URLS:
            payload = json.dumps({"url": url, "type": "URL_UPDATED"}).encode()
            req = urllib.request.Request(
                "https://indexing.googleapis.com/v3/urlNotifications:publish",
                data=payload,
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {creds.token}"
                },
                method="POST"
            )
            try:
                with urllib.request.urlopen(req, timeout=15) as resp:
                    if resp.status == 200:
                        ok += 1
                    else:
                        err += 1
            except Exception as e:
                err += 1
        log(f"Google Indexing API: {ok} OK, {err} errors out of {len(URLS)} URLs")
        return ok, err
    except Exception as e:
        log(f"Google Indexing API: FAILED - {e}")
        return 0, len(URLS)

# 2. IndexNow (Bing + Yandex)
def indexnow():
    payload = json.dumps({
        "host": "decastropt.com",
        "key": INDEXNOW_KEY,
        "keyLocation": f"{SITE}/indexnow.txt",
        "urlList": [u.replace(SITE, "") for u in URLS if u != f"{SITE}/"]
    })
    # Full URLs
    payload = json.dumps({
        "host": "decastropt.com",
        "key": INDEXNOW_KEY,
        "keyLocation": f"{SITE}/indexnow.txt",
        "urlList": URLS
    })
    
    ok = 0
    err = 0
    for endpoint in ["https://api.indexnow.org/IndexNow", "https://www.bing.com/indexnow"]:
        try:
            req = urllib.request.Request(
                endpoint,
                data=payload.encode(),
                headers={"Content-Type": "application/json"},
                method="POST"
            )
            with urllib.request.urlopen(req, timeout=15) as resp:
                ok += 1
                log(f"IndexNow ({endpoint}): HTTP {resp.status}")
        except Exception as e:
            err += 1
            log(f"IndexNow ({endpoint}): FAILED - {e}")
    
    return ok, err

if __name__ == "__main__":
    import urllib.request
    log(f"=== Push started: {len(URLS)} URLs ===")
    g_ok, g_err = google_index()
    i_ok, i_err = indexnow()
    log(f"=== Done. Google: {g_ok} ok/{g_err} err | IndexNow: {i_ok} ok/{i_err} err ===")
