# Player – vibe prototyp

Interaktivní prototyp nového TV playeru (SmartTV / ATV) podle Figmy „player – vibe app" a „sport-player – design dle new playeru". Není to produkční kód – jde o živou ukázku chování: fokus a stavy tlačítek, časová osa a přetáčení, klientské i serverové reklamy, panel Titulky/Zvuk a sportovní režim (Průběh, Statistiky, Sestavy, Nastavení, gólový toast).

## Spuštění

Statický web, stačí jakýkoli HTTP server:

```bash
python3 -m http.server 8765
```

a otevřít http://localhost:8765. Video jsou veřejné testovací HLS/MP4 streamy třetích stran (mohou být dočasně nedostupné).

## Ovládání

Klikni do obrazu a ovládej jako dálkovým: šipky, Enter (OK), Esc/Backspace (Zpět), mezerník (Play/Pauza). Scénáře a nastavení jsou v panelu vpravo.

## Verze

- `index.html` – aktuální stav
- `v1-2026-09-07.html` – před sportovním režimem
- `v2-2026-09-07.html` – první verze sportovního režimu (design 1:1 dle Figmy)
