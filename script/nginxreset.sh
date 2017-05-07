path="/usr/local/nginx"
if [ -d "$path" -a "ls -A $path" != "" ]; then
	rm -rf $path
	mkdir -m 777 $path
fi
cd /usr/ceba/source/nginx-1.11.10
./configure \
--prefix=$path  \
--conf-path=$path/config/nginx.conf \
--with-zlib=/usr/ceba/source/zlib-1.2.8 \
--with-pcre=/usr/ceba/source/pcre-8.39 \
--with-http_ssl_module \
--with-http_v2_module \
--with-openssl=/usr/ceba/source/openssl-1.1.0b \
--with-http_gzip_static_module \

make && make install
