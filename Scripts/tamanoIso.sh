#!/bin/bash

# Función para mostrar el uso del script
mostrar_uso() {
  echo "Uso: $0 RUTA_ISO"
  echo "Donde RUTA_ISO es la ruta de la imagen ISO que deseas copiar."
}

# Verificar si se proporciona la ruta de la ISO como argumento
if [ $# -ne 1 ]; then
  mostrar_uso
  exit 1
fi

# Obtener la ruta de la ISO del primer argumento
RUTA_ISO="$1"

# Verificar si la ISO existe
if [ ! -f "$RUTA_ISO" ]; then
  echo "La ISO especificada no existe."
  exit 1
fi

# Crear una carpeta temporal para copiar la ISO
CARPETA_TEMPORAL=$(mktemp -d)

# Iniciar el temporizador
TIEMPO_INICIAL=$(date +%s)

# Copiar el contenido de la ISO a la carpeta temporal
echo "Copiando el contenido de la ISO a la carpeta temporal..."
dd if="$RUTA_ISO" of="$CARPETA_TEMPORAL/iso_copiada.bin" bs=4M

# Detener el temporizador
TIEMPO_FINAL=$(date +%s)

# Calcular el tiempo transcurrido
TIEMPO_TOTAL=$((TIEMPO_FINAL - TIEMPO_INICIAL))

# Calcular el espacio ocupado por la carpeta temporal
ESPACIO_OCUPADO=$(du -sh "$CARPETA_TEMPORAL" | cut -f1)

# Mostrar resultados
echo "El proceso tomó $TIEMPO_TOTAL segundos."
echo "El espacio ocupado por la carpeta temporal es de $ESPACIO_OCUPADO."

# Borrar la carpeta temporal
rm -rf "$CARPETA_TEMPORAL"

exit 0
