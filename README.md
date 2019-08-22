# Git 과 heroku 연동 필수
# heroku console 에서 github 와 연결
# Source Code에 express 서버 열때 포트를 process.env.PORT 로 변경 후 git 에 업로드
# heroku console - setting - configs_var - KEY : PORT , VALUES : 5000 추가
# git push heroku 를 통해 heroku에도 deploy 실시
# 배포 완료되면 실행
https://hello-sol-heroku.herokuapp.com/