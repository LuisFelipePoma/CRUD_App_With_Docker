#Al iniciar instancia

sudo apt update
apt list --upgradable

#Ahora instalamos docker

sudo apt upgrade -y
sudo apt-get remove docker docker-engine docker.io containerd runc
sudo apt install apt-transport-https ca-certificates curl software-properties-common -y
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
apt-cache policy docker-ce
sudo apt install docker-ce -y

#------- PARA EVITAR USAR "SUDO DOCKER"
#Creamos contraseña
sudo passwd

// Creacion de usuario
sudo usermod -aG docker ${USER}
sudo su - ${USER}
#---------------------------------------- 

#Instalamos la imagen de mysql

sudo docker pull mysql

#Crear el contenedor para la base de datos

docker run -d --name emerginet-db -e MYSQL_ROOT_PASSWORD=sistemas20. -p 3306:3306 -v /home/ubuntu/data:/var/lib/mysql mysql

#Ingresar al contenedor desde el bash

docker exec -it [id-contendor] bash

# Ingresar a la base de datos desde el ssh
mysql -u root -h 172.17.0.2 -p mysql -p123



#Creamos el usuario

CREATE USER 'support'@'%' IDENTIFIED BY 'sistemas20.';
GRANT ALL PRIVILEGES ON *.* TO 'support'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

