## Docker Deployment

Diese Anwendung kann einfach mit Docker und Docker Compose deployed werden. Befolgen Sie diese Schritte, um die Anwendung zu deployen.

### Voraussetzungen

- [Docker](https://docs.docker.com/get-docker/) auf Ihrem System installiert
- [Docker Compose](https://docs.docker.com/compose/install/) auf Ihrem System installiert

### Schnellstart

1. **Repository klonen**:
   ```bash
   git clone <ihre-repo-url>
   cd schaden-formular
   ```

2. **Umgebungsvariablen konfigurieren**:
   
   Kopieren Sie die Beispiel-Umgebungsdatei und bearbeiten Sie diese mit Ihren E-Mail-Einstellungen:
   ```bash
   cp example.env .env
   ```
   
   Bearbeiten Sie `.env` und setzen Sie Ihre E-Mail-Konfiguration:
   - `EMAIL`: Ihre Absender-E-Mail-Adresse
   - `EMAIL_PASS`: Ihr E-Mail-Passwort oder App-spezifisches Passwort
   - `EMAIL_HOST`: Ihr SMTP-Server (z.B. smtp.gmail.com)
   - `EMAIL_PORT`: SMTP-Port (normalerweise 465 für SSL oder 587 für TLS)
   - `EMAIL_DEST`: Die Empfänger-E-Mail-Adresse für Formularübermittlungen

3. **Anwendung bauen und starten**:
   ```bash
   docker-compose up -d
   ```

4. **Anwendung aufrufen**:
   
   Öffnen Sie Ihren Browser und navigieren Sie zu [http://localhost:3000](http://localhost:3000)

### Konfiguration

#### Port-Konfiguration

Standardmäßig läuft die Anwendung auf Port 3000. Um den Host-Port zu ändern, bearbeiten Sie `docker-compose.yml`:

```yaml
ports:
  - "80:3000"  # Port 80 auf dem Host verwenden
  # oder
  - "8080:3000"  # Port 8080 auf dem Host verwenden
```

#### E-Mail-Einrichtung

Die Anwendung benötigt gültige SMTP-Anmeldedaten zum Versenden von E-Mails. 

### Docker-Befehle

**Anwendung starten**:
```bash
docker-compose up -d
```

**Anwendung stoppen**:
```bash
docker-compose down
```

**Logs anzeigen**:
```bash
docker-compose logs -f
```

**Image neu bauen** (nach Code-Änderungen):
```bash
docker-compose up -d --build
```

**Anwendungsstatus prüfen**:
```bash
docker-compose ps
```

### Anwendung teilen

Um diese Anwendung mit jemandem zum Deployment zu teilen:

1. Teilen Sie die Repository-URL
2. Stellen Sie ihnen die E-Mail-Anmeldedaten zur Verfügung, die sie verwenden sollen (über einen sicheren Kanal)
3. Verweisen Sie sie auf diesen README-Abschnitt
4. Sie müssen nur:
   - Das Repository klonen
   - Eine `.env`-Datei mit den bereitgestellten Anmeldedaten erstellen
   - `docker-compose up -d` ausführen

