npm run build
rsync -avz dist root@64.227.170.235:/var/www/fe
ssh root@64.227.170.235 "systemctl restart nginx"

echo "Deployment complete.....!!!"
