import requests
import json
import time
from datetime import datetime

MAX_RETRIES = 3

def send_discord_message(webhook_url, json_message):
    headers = {"Content-Type": "application/json"}
    for _ in range(MAX_RETRIES):
        response = requests.post(webhook_url, data=json_message, headers=headers)
        if response.status_code == 204:
            return True
        time.sleep(1.5)  # Esperar 1.5 segundos antes de intentar nuevamente
    return False

def main():
    webhook_url = input("Ingresa la URL del webhook de Discord: ")

    # Realizar una solicitud GET a la API de juegos gratuitos
    api_url = "https://www.freetogame.com/api/games?platform=pc"
    response = requests.get(api_url)
    games = response.json()

    for idx, game in enumerate(games, start=1):
        title = game["title"]
        description = game["short_description"]
        genre = game["genre"]
        platform = game["platform"]
        publisher = game["publisher"]
        developer = game["developer"]
        release_date = game["release_date"]
        game_url = game["game_url"]
        thumbnail = game["thumbnail"]

        # Construir el mensaje en formato de embed para la notificación en Discord
        message = {
            "embeds": [
                {
                    "title": f"Juego {idx}: {title}",
                    "description": description,
                    "fields": [
                        {"name": "Género", "value": genre, "inline": True},
                        {"name": "Plataforma", "value": platform, "inline": True},
                        {"name": "Publicador", "value": publisher, "inline": True},
                        {"name": "Desarrollador", "value": developer, "inline": True},
                        {"name": "Fecha de lanzamiento", "value": release_date, "inline": True}
                    ],
                    "url": game_url,
                    "image": {"url": thumbnail},  # La foto se muestra debajo del contenido
                    "footer": {"text": f"Mensaje enviado el {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"}
                }
            ]
        }

        # Convertir el mensaje a JSON
        json_message = json.dumps(message)

        # Intentar enviar el mensaje a Discord
        if send_discord_message(webhook_url, json_message):
            print(f"Juego {idx} enviado: {title}")
        else:
            print(f"Error al enviar el juego {idx}: {title}. Se ha intentado {MAX_RETRIES} veces sin éxito.")

        # Pausar la ejecución durante 0.2 segundos (5 solicitudes por segundo)
        time.sleep(1.5)

if __name__ == "__main__":
    main()
