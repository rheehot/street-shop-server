# Git 과 heroku 연동 필수
# heroku console 에서 github 와 연결
# Source Code에 express 서버 열때 포트를 process.env.PORT 로 변경 후 git 에 업로드
# heroku console - setting - configs_var - KEY : PORT , VALUES : 5000 추가
# git push heroku 를 통해 heroku에도 deploy 실시
# 배포 완료되면 실행
https://street-shop-server.herokuapp.com/

# 에러가 발생을 하였으므니다.
...잠깐 포멧으로 인해 데이터를 다 날려 먹었스므니다 ㅎ.ㅎ....

조금있다 복구를 진행하도록 하겠습니다.
해야할일 
1. 헤로쿠 재설치
2. 헤로쿠 실행
3. 에러발생시 아래 작성된 내용은 아닌지 확인
# H10 ERROR 발생 시
##  소스코드에 에러가 있을 가능성이 큽니다.
``` shell
heroku logs --tail 
```
# H14 ERROR 발생 시
## heroku로 띄우는 web이 죽은것 같습니다.
``` shell
heroku ps:scale web=1
Scaling dynos... done 이 뜨고 web실행가능
```


# build 설정 에러일 수 있으니 
``` shell
heroku buildpacks:clear
heroku buildpacks:add --index heroku/node.js
```