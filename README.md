# Ecard

## How to Deploy Backend

Choice of deployment was to serve HTML files using an Nginx server hosted on an Ubuntu machine.

1. Install Nginx

    ```bash
    $ sudo apt update
    $ sudo apt install nginx
    ```

2. Clone Repository

    ```bash
    $ cd <DEPLOYMENT_DIRECTORY>
    $ git clone git@github.com:AI3SW/Ecard.git
    ```

3. Create an Nginx configuration file at `/etc/nginx/conf.d` and paste the following content into it:

    ```
    server {
        listen <IP_ADDRESS>:<PORT_NO>;
        root <DEPLOYMENT_DIRECTORY>/Ecard;

        location / {

        }
    }
    ```

4. Restart Nginx

    ```bash
    $ sudo service nginx restart
    ```

5. Check that the website is served at `<IP_ADDRESS>:<PORT_NO>`

## How to Deploy Frontend

1. Ecard Frontend
Open the page via a browser on the file index.html in the root folder, it will automatically redirect users based on the screen resolution.

2. Installing of the webpages
Just download the repo to a place where webpages can be hosted

3. Configuring the Backend
Go to /HTML/SCRIPT/config.js to change the IP and port of where the AI backend server is hosted.

4. UI Frontend architecture

To help with offloading different kinds of platform

The css and html of the
PC based devices are pushed and found in the "HTML/Desktop/" folder
Mobile base devices are pushed and found in the "HTML/Mobile/" folder

## Demo Videos

### Mobile version Demo

[![Ecards Demo video](https://res.cloudinary.com/marcomontalbano/image/upload/v1644200527/video_to_markdown/images/youtube--jQlLydD78Rs-c05b58ac6eb4c4700831b2b3070cd403.jpg)](https://youtu.be/jQlLydD78Rs "Ecards Demov")

### Desktop version Demo

[![Ecards Demo video](https://res.cloudinary.com/marcomontalbano/image/upload/v1644200753/video_to_markdown/images/youtube--VkYwTEMU7zg-c05b58ac6eb4c4700831b2b3070cd403.jpg)](https://youtu.be/VkYwTEMU7zg "Ecards Demo video")
