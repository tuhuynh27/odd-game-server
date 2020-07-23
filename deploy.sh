ssh root@34.87.148.195 <<EOF
    cd /home/oddx/odd-game-server
    git checkout .
    git pull origin master
    npm install
    pm2 reload main
    exit
EOF
