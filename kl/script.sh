#!/bin/bash
# Instalación de dependencias en sistema Ubuntu
sudo apt install build-essential autotools-dev autoconf kbd -y

mkdir .art
cd .art/

# Descarga del keylogger LogKeys
wget https://github.com/kernc/logkeys/archive/master.zip

# Descomprime el archivo
unzip master.zip

# Ingresa al directorio generado
cd logkeys-master/

# Ejecuta el script autogen
./autogen.sh

# Configura, compila e instala LogKeys
./configure && make && sudo make install

# Descarga el mapa de teclado en español
wget https://raw.githubusercontent.com/kernc/logkeys/master/keymaps/es_ES.map

# Ejecuta LogKeys en modo seguimiento, especificando el mapa de teclado y excluyendo las teclas de función
sudo logkeys -s -m es_ES.map --no-func-keys

# Abre otro terminal y muestra en tiempo real el contenido del archivo de registro de LogKeys
sudo tail -f /var/log/logkeys.log
