if (pgrep -f server.js | wc -l > 0) then
forever stop server.js
fi
myFile="/root/.forever/testforever.log"
if [  -f "$myFile" ]; then
rm -rf "$myFile"
fi
forever start -l testforever.log -o testout.log -e testerr.log server.js
