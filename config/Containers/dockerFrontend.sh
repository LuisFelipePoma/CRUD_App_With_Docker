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

#Creacion de usuario
sudo usermod -aG docker ${USER}
sudo su - ${USER}
# ---------------------------------------- 

#Se trae la imagen de ngnix (143mb)

docker pull nginx

#Se crea el directorio donde pegaremos el build de nuestra pagina web

mkdir web

#Ahora se corre nuestro proyecto usamos nginx:alpine(41.5mb) en vez de nginx(143mb)

docker run -d --name emerginet-web -v /home/ubuntu/web/dist/emergencias:/usr/share/nginx/html -p 80:80 nginx:alpine