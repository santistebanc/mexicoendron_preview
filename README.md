<img width="600" alt="México en Dron" src="https://s3-us-west-2.amazonaws.com/mexicoendron/MexicoEnDron.png">

## MÉXICO EN DRON

Compra stock-videos de lugares en México grabados en dron.

**Demo en https://mexicoendron.now.sh/ (v0.1.0)**

## Como usar

### Setup

*Tienes que tener node y git instalados*

En la consola de comandos entra al directorio donde quieres iniciar el proyecto:

```bash
git clone https://github.com/santistebanc/mexicoendron.git
cd mexicoendron
npm install
```

En el directorio padre del directorio `mexicoendron` crea un archivo llamado `awskeys.json` con lo siguiente:

```json
{
    "accessKeyId": "TU_ACCESS_KEY",
    "secretAccessKey": "TU_SECRET_ACCESS_KEY"
}
```

Esto es para poder accesar la API de AWS que se utiliza para cargar los videos

### Run

Para correr en modo desarrollador:

```bash
npm run dev
```

Abre el navegador en http://localhost:3000

### Deploy

Para subirlo a internet a forma de prueba:

Instala `now`:

```bash
npm install -g now
```

Dentro del directorio de `mexicoendron` corre:

```bash
npm run deploy
```

Asegurate que tienes los `secret` de tus awskeys en `now`, para ello realiza los siguientes comandos:

```bash
now secret add aws_access_key_id TU_ACCESS_KEY_ID
now secret add aws_secret_access_key TU_SECRET_ACCESS_KEY
```