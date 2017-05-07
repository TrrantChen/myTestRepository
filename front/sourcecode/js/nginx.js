/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-02-25 12:17:45
 * @version $Id$
 */
 /usr/local/nginx
 /home/x-plan/nginx 

./configure \
--prefix=/usr/local/nginx \
--conf-path=/usr/local/nginx/config/nginx.conf \
--with-zlib=/usr/ceba/source/zlib-1.2.8 \
--with-pcre=/usr/ceba/source/pcre-8.39 \

./configure \
--prefix=/home/x-plan/nginx  \
--conf-path=/home/x-plan/nginx/config/nginx.conf \
--with-zlib=/usr/ceba/source/zlib-1.2.8 \
--with-pcre=/usr/ceba/source/pcre-8.39 \

make && make install

make 2>&1|tee /home/x-plan/buildlog/test1.log
make install 2>&1|tee /home/x-plan/buildlog/haha.log


#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;
    gzip on;
    gzip_disable "MSIE [1-6]";
    gzip_types text/plain text/javascript text/css multipart/form-data application/x-www-form-urlencoded application/json application/xml image/jpeg image/gif image/png;
    gzip_proxied any;
    gzip_min_length  1024; 
    gzip_buffers     4 8k; 
    gzip_comp_level 3; 
    
    server {
        listen       19999;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
             proxy_pass http://localhost:9998;
             client_max_body_size 1000m;
             client_body_buffer_size 1000m;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

}


