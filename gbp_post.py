#!/usr/bin/env python3
"""GBP weekly post generator — posts a fitness tip to Google Business Profile.
Run weekly via cron. Requires billing-enabled project + SA as GBP manager.

Usage: python3 /root/decastropt/gbp_post.py
"""
import json, requests, random, sys
from datetime import datetime
from google.oauth2 import service_account
import google.auth.transport.requests

SA_PATH = '/root/.hermes/gsc-service-account.json'
SCOPES = ['https://www.googleapis.com/auth/business.manage']
ACCOUNT_ID = 'hermes-gsc-505213'
# Location ID will be fetched dynamically after billing is enabled

TIPS = [
    {"title": "Tip della settimana: Zone 2 Cardio", "body": "Il cardio Zone 2 (60-70% HR max) brucia grassi e migliora la resistenza. 30-40 min, 2-3x/settimana. Pochi lo fanno, ma è il segreto dei maratoneti.", "cta": "Prenota la tua prima consulenza gratuita!"},
    {"title": "Forza = Longevità", "body": "Studi mostrano che mantenere la forza dopo i 40 anni riduce il rischio di mortalità del 23%. Allenamento della forza 2x/settimana minimum.", "cta": "Scopri l'assessment corporeo su decastropt.com"},
    {"title": "Recupero: il muscolo cresce a riposo", "body": "Dormi 7-9h, idratazione, proteine ogni 3-4h. Il recupero è quando i muscoli si ricostruiscono più forti.", "cta": "Programmazione personalizzata su decastropt.com/assessment.html"},
    {"title": "Mobilità: la dimenticata", "body": "10 min di mobilità al giorno prevengono infortuni e migliorano ogni esercizio. Squat profondo, hip flexor stretch, thoracic rotation.", "cta": "Prenota su decastropt.com"},
    {"title": "Proteine: quante davvero?", "body": "1.6-2.2g di proteine per kg di peso corporeo al giorno per chi si allena. Distribuile in 3-4 pasti per massimizzare la sintesi proteica.", "cta": "Calcola il tuo fabbisogno su decastropt.com"},
    {"title": "HIIT vs LISS: cosa scegliere?", "body": "HIIT (15-20 min) per tempo limitato. LISS (45-60 min) per recupero attivo e base aerobica. Il meglio? Alternarli durante la settimana.", "cta": "Scheda personalizzata su decastropt.com"},
    {"title": "Functional training: muoviti meglio", "body": "Squat, hinge, push, pull, carry: 5 pattern di movimento che replicano la vita reale. Meno macchine, più movimento libero.", "cta": "Prova l'allenamento funzionale con Decastro PT"},
]

def get_creds():
    return service_account.Credentials.from_service_account_file(SA_PATH, scopes=SCOPES)

def get_location_id(creds):
    """Fetch the first location ID for the account."""
    headers = {'Authorization': f'Bearer {creds.token}'}
    url = f'https://mybusinessbusinessinformation.googleapis.com/v1/accounts/{ACCOUNT_ID}/locations?readMask=name'
    resp = requests.get(url, headers=headers)
    if resp.status_code == 200:
        locations = resp.json().get('locations', [])
        if locations:
            return locations[0]['name'].split('/')[-1]
    return None

def create_post(creds, location_id, tip):
    """Create a local post on GBP."""
    headers = {'Authorization': f'Bearer {creds.token}', 'Content-Type': 'application/json'}
    url = f'https://mybusinessbusinessinformation.googleapis.com/v1/accounts/{ACCOUNT_ID}/locations/{location_id}/localPosts'
    
    payload = {
        "languageCode": "it",
        "summary": f"{tip['title']}\n\n{tip['body']}\n\n{tip['cta']}",
        "topicType": "STANDARD",
        "callToAction": {
            "actionType": "LEARN_MORE",
            "url": "https://decastropt.com"
        }
    }
    
    resp = requests.post(url, headers=headers, json=payload)
    return resp.status_code, resp.json()

def main():
    creds = get_creds()
    creds.refresh(google.auth.transport.requests.Request())
    
    location_id = get_location_id(creds)
    if not location_id:
        print("ERROR: No GBP location found. Check if SA is manager of the GBP.")
        sys.exit(1)
    
    tip = random.choice(TIPS)
    status, result = create_post(creds, location_id, tip)
    
    if status in (200, 201):
        print(f"OK: Posted '{tip['title']}' to GBP location {location_id}")
    else:
        print(f"ERROR {status}: {json.dumps(result, indent=2)}")

if __name__ == '__main__':
    main()
