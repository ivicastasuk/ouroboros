# Ouroboros

**Ouroboros** je napredna Electron desktop aplikacija za masovno slanje emailova putem SMTP servera. Dizajnirana je za efikasno kreiranje, upravljanje i slanje profesionalnih email kampanja uz integraciju sa MariaDB bazom i podršku za HTML i TXT šablone.

---

## ✨ Ključne funkcionalnosti

- 📤 Masovno slanje mejlova putem SMTP servera
- 📄 Podrška za HTML i TXT šablone mejlova
- 🖊️ WYSIWYG editor za lako kreiranje sadržaja
- ⚙️ Podesiva konfiguracija SMTP i baze kroz GUI
- 🗂️ Automatsko učitavanje kontakata iz MariaDB baze
- 📥 CSV import kontakata pomoću PapaParse biblioteke
- 🔄 Višestruke sekcije (stranice) unutar aplikacije:
  - Editor šablona
  - Podešavanja sistema
  - Izbor i slanje mejlova
  - Upravljanje kontaktima

---

## 📁 Struktura projekta

```
ouroboros/
├── src/
│   ├── main/           # Backend logika: slanje, konekcije, čitanje fajlova
│   ├── renderer/       # UI logika: stranice i stilovi
│   └── preload.js      # Sigurna komunikacija između procesa
├── public/             # Statika (ikone, stilovi)
├── emails/             # Šabloni mejlova (HTML/TXT)
├── config/             # Konfiguracije sistema
├── logs/               # Logovi slanja i grešaka
├── .env                # Osetljivi podaci (opciono)
├── package.json
└── README.md
```

---

## 🧪 Pokretanje aplikacije (dev režim)

```bash
npm install
npm start
```

---

## 🔧 Konfiguracija

Sve konfiguracije su u `config/settings.json`. Primer:

```json
{
  "smtp": {
    "host": "smtp.example.com",
    "port": 587,
    "secure": false,
    "auth": {
      "user": "your@email.com",
      "pass": "yourpassword"
    }
  },
  "database": {
    "host": "localhost",
    "port": 3306,
    "user": "mailer_user",
    "password": "mailer_pass",
    "database": "email_contacts"
  },
  "defaultEmailType": "html",
  "defaultTemplate": "welcome.html"
}
```

---

## 🧰 Tehnologije

- [Electron](https://www.electronjs.org/)
- [Node.js](https://nodejs.org/)
- [Nodemailer](https://nodemailer.com/about/)
- [MariaDB](https://mariadb.org/)
- [PapaParse](https://www.papaparse.com/)
- [Quill.js](https://quilljs.com/) ili TinyMCE

---

## 📦 Build aplikacije

```bash
npm run build
```

Koristi se `electron-builder` za pravljenje `.exe` fajlova.

---

## ✅ ToDo

- [x] Osnovna struktura Electron aplikacije
- [ ] Učitavanje konfiguracije iz fajla
- [ ] Povezivanje sa MariaDB bazom
- [ ] Slanje mejlova putem SMTP-a
- [ ] WYSIWYG editor za izradu HTML šablona
- [ ] Import CSV fajlova pomoću PapaParse
- [ ] Frontend sekcija za upravljanje kontaktima
- [ ] UI za izbor i testiranje SMTP/server podešavanja
- [ ] Napredna validacija mejlova i statusni logovi
- [ ] Multithread (batch) slanje mejlova sa izveštajima
- [ ] Integracija sa Google OAuth za slanje preko Gmail API-ja (opciono)
- [ ] I18n podrška za više jezika

---

## 📄 Licenca

Apache 2.0

Autor: Ivica S.

---

**Ouroboros** – automatizuj slanje emailova bez kompromisa. Jednostavno. Brzo. Moćno.
