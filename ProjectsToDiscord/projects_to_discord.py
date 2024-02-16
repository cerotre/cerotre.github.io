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

def format_datetime(iso_date):
    return datetime.strptime(iso_date, "%Y-%m-%dT%H:%M:%SZ").strftime("%Y-%m-%d %H:%M:%S")

def main():
    webhook_url = input("Ingresa la URL del webhook de Discord: ")
    github_username = input("Ingresa tu nombre de usuario de GitHub: ")
    
    include_user_projects = input(f"¿Deseas incluir el proyecto '{github_username}' en la lista? (s/n): ").lower() == "s"
    include_gh_pages = input(f"¿Deseas incluir el proyecto '{github_username}.github.io' en la lista? (s/n): ").lower() == "s"

    api_url = f"https://api.github.com/users/{github_username}/repos"
    response = requests.get(api_url)
    projects = response.json()

    project_count = 0  # Contador de proyectos enviados

    for idx, project in enumerate(projects, start=1):
        project_name = project["name"]
        project_description = project["description"] or "Sin descripción"
        project_url = project["html_url"]
        created_at = format_datetime(project["created_at"])
        updated_at = format_datetime(project["updated_at"])

        # Verificar si se debe incluir el proyecto en función de las opciones seleccionadas
        if (include_user_projects and project_name == github_username) or (include_gh_pages and project_name == f"{github_username}.github.io"):
            message = {
                "embeds": [
                    {
                        "title": f"Proyecto {project_count + 1}: {project_name}",
                        "description": project_description,
                        "fields": [
                            {"name": "URL del proyecto", "value": project_url, "inline": False},
                            {"name": "Creado en", "value": created_at, "inline": True},
                            {"name": "Última actualización", "value": updated_at, "inline": True}
                        ],
                        "footer": {"text": f"Mensaje enviado el {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"}
                    }
                ]
            }

            json_message = json.dumps(message)

            if send_discord_message(webhook_url, json_message):
                print(f"Proyecto {project_count + 1} enviado: {project_name}")
                project_count += 1
            else:
                print(f"Error al enviar el proyecto {project_count + 1}: {project_name}. Se ha intentado {MAX_RETRIES} veces sin éxito.")

            time.sleep(1.5)
    
    # Enviar los demás proyectos
    for idx, project in enumerate(projects, start=1):
        project_name = project["name"]

        # Verificar si el proyecto debe ser incluido en función de las opciones seleccionadas
        if project_name != github_username and project_name != f"{github_username}.github.io":
            project_description = project["description"] or "Sin descripción"
            project_url = project["html_url"]
            created_at = format_datetime(project["created_at"])
            updated_at = format_datetime(project["updated_at"])

            message = {
                "embeds": [
                    {
                        "title": f"Proyecto {project_count + 1}: {project_name}",
                        "description": project_description,
                        "fields": [
                            {"name": "URL del proyecto", "value": project_url, "inline": False},
                            {"name": "Creado en", "value": created_at, "inline": True},
                            {"name": "Última actualización", "value": updated_at, "inline": True}
                        ],
                        "footer": {"text": f"Mensaje enviado el {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"}
                    }
                ]
            }

            json_message = json.dumps(message)

            if send_discord_message(webhook_url, json_message):
                print(f"Proyecto {project_count + 1} enviado: {project_name}")
                project_count += 1
            else:
                print(f"Error al enviar el proyecto {project_count + 1}: {project_name}. Se ha intentado {MAX_RETRIES} veces sin éxito.")

            time.sleep(1.5)

if __name__ == "__main__":
    main()
