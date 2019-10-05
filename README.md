# mongoDB 계정 생성
- 터미널(cmd) 2개 필요, 1개는 mongod(몽고디비 데몬) 실행용, 하나는 명령어 입력용
    - 위의 명령이 먹지 않을 때
    - C:\program files\mongodb\server\버전\bin 에서 실행
    - ![mongod](https://imgur.com/a/qIaHcCx)
    - THINK) 추후에도 진행하려면 환경변수 잡아주는 편이 좋을 듯
    - 해당 위치에서 mongod.exe 실행 후 터미널에서 mongo 실헹
        - 창이 바로 켜졌다가 꺼져서 cmd 에서 실행해보았는데 그냥 종료된다.
        - 그대로 진행을 했는데 정상적으로 진행되어서 그냥 mongo 만 실행해도 되는 것으로 판단됨
- cmd 에서 mongo 가 실행되면 입력 프롬프트가 > 로 변경됨
``` shell
> use admin
> db.createUser({user: "아이디", pwd: "비밀번호", roles:['root']})
Successfully added user: { "user" : "아이디", "roles" : [ "root" ] } 
```
- 이후 mongoose연결 할 때 설정한 값들 입력
``` js
mongoose.connect('mongodb://아이디:비밀번호@호스트:포트/admin', {dbName: "사용할 데이터베이스"});
```

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