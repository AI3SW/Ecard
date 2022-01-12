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
