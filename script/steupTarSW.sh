name="flex-2.6.3"
tardoc=/usr/ceba/source
steuppath=/usr/local/$name
tar -zxvf  $tardoc/$name.tar.gz -C $tardoc
if [ -d "$steuppath" -a "ls -A $steuppath" != "" ]; then
	rm -rf $steuppath
	mkdir -m 777 $steuppath
fi
cd $tardoc/$name
./configure --prefix=$steuppath
make && make install

