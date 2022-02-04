<<<<<<< HEAD
# Ecard Frontend
Open the page via a browser on the file index.html in the root folder, it will automatically redirect users based on the screen resolution.

# Installing of the webpages
Just download the repo to a place where webpages can be hosted

#configuring the Backend
Go to /HTML/SCRIPT/config.js to change the IP and port of where the AI backend server is hosted.

#UI Frontend architecture

To help with offloading different kinds of platform

The css and html of the
PC based devices are pushed and found in the "HTML/Desktop/" folder
Mobile base devices are pushed and found in the "HTML/Mobile/" folder
=======
# Ecard

## How to Deploy

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
>>>>>>> adc66741df68e56e2283754a708edcaff527b8fb
