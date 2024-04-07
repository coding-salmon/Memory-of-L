
class MyScene extends Phaser.Scene{
    constructor(){
        super({ key: 'MyScene'});
        this.enemies = null; // 전역 변수로 선언합니다.
        this.player = null; // player 전역 변수로 선언
        this.playerHp = 100; // 플레이어의 초기 HP
        this.maxHp = 100; // 플레이어의 최대 HP
        this.playerDamage = 100; //플레[이어가 적에게 입히는 데미지의 기본값입니다.
        this.score = 0; //점수
        this.gold  = 0; // 골드
        this.goldGroup = null; // 골드 그룹
        this.menuOpen = false; // 메뉴 창이 열려 있는지 여부를 나타내는 변수 추가
    }
preload(){
    //여기서 게임에 필요한 리소스를 미리 불러옵니다.

    //배경 이미지 가져오기
    this.load.image('background', '/node_modules/phaser/assets/backgroundImage.png')

    //플레이어 이미지 가져오기
    this.load.image('player','/node_modules/phaser/assets/playerImage.png')

    //왼쪽 오른쪽 아래 이동하는 애니메이션 추가하기
    this.load.image('frame1','/node_modules/phaser/assets/thiefFront_walk01.png');
    this.load.image('frame2','/node_modules/phaser/assets/thiefFront_walk02.png');
    this.load.image('frame3','/node_modules/phaser/assets/thiefFront_walk03.png');
    this.load.image('frame4','/node_modules/phaser/assets/thiefFront_walk04.png');
    this.load.image('frame5','/node_modules/phaser/assets/thiefFront_walk05.png');
    this.load.image('frame6','/node_modules/phaser/assets/thiefFront_walk06.png');
    this.load.image('frame7','/node_modules/phaser/assets/thiefFront_walk07.png');
    this.load.image('frame8','/node_modules/phaser/assets/thiefFront_walk08.png');

    //위로 이동하는 애니메이션 추가하기
    this.load.image('frame9','/node_modules/phaser/assets/thiefBack_walk01.png');
    this.load.image('frame10','/node_modules/phaser/assets/thiefBack_walk02.png');
    this.load.image('frame11','/node_modules/phaser/assets/thiefBack_walk03.png');
    this.load.image('frame12','/node_modules/phaser/assets/thiefBack_walk04.png');
    this.load.image('frame13','/node_modules/phaser/assets/thiefBack_walk05.png');
    this.load.image('frame14','/node_modules/phaser/assets/thiefBack_walk06.png');
    this.load.image('frame15','/node_modules/phaser/assets/thiefBack_walk07.png');
    this.load.image('frame16','/node_modules/phaser/assets/thiefBack_walk08.png');

    //플레이어 공격 애니메이션 추가하기
    this.load.image('frame17', '/node_modules/phaser/assets/playerAttack/thief_atk01.png');
    this.load.image('frame18', '/node_modules/phaser/assets/playerAttack/thief_atk02.png');
    this.load.image('frame19', '/node_modules/phaser/assets/playerAttack/thief_atk03.png');
    this.load.image('frame20', '/node_modules/phaser/assets/playerAttack/thief_atk04.png');
    this.load.image('frame21', '/node_modules/phaser/assets/playerAttack/thief_atk05.png');
    this.load.image('frame22', '/node_modules/phaser/assets/playerAttack/thief_atk06.png');


    

    //적 유닛 생성
    this.load.image('enemy0', '/node_modules/phaser/assets/Enemy0/Enemy0.png');
    this.load.image('enemy1', '/node_modules/phaser/assets/Enemy0/Enemy1.png');
    this.load.image('enemy2', '/node_modules/phaser/assets/Enemy0/Enemy2.png');
    this.load.image('enemy3', '/node_modules/phaser/assets/Enemy0/Enemy3.png');

    //적 유닛 피격 이미지
    this.load.image('enemy4', '/node_modules/phaser/assets/Enemy0/Enemy4.png');

    //적 유닛 죽을 때
    this.load.image('enemy5', '/node_modules/phaser/assets/Enemy0/Enemy5.png');

    //골드 이미지 생성
    this.load.image('gold','/node_modules/phaser/assets/gold/gold1.png')



}

create(){
    //여기서 게임에 필요한 초기화 작업을 합니다.

     // 메뉴 버튼 생성
    this.menuButton = this.add.text(750, 10, 'Menu', { fontSize: '20px', fill: '#fff' ,backgroundColor: '#000' })
    .setInteractive()
    .on('pointerdown', () => {
         // 메뉴를 열기 위한 함수 호출
        this.openMenu();
    });

    // ESC 키를 눌렀을 때 메뉴 창 열기/닫기 처리
    this.input.keyboard.on('keydown-ESC', () => {
        if (this.menuOpen) {
            // 메뉴 창이 열려있으면 닫기
            this.closeMenu();
        } else {
            // 메뉴 창이 닫혀있으면 열기
            this.openMenu();
        }
    });



    //스코어 생성
    this.scoreText = this.add.text(330, 1, 'Score: 0',{
        fontSize: '20px',
        fill: '#ffffff',
        fontStyle: 'bold' // 폰트 두께를 bold로 설정
    }).setOrigin(0.5,0).setDepth(3);

    // 골드 텍스트 생성 및 스타일 설정
    this.goldText = this.add.text(470, 1, 'Gold: 0', {
        fontSize: '20px',
        fill: '#ffd700', // 골드 색상
        fontStyle: 'bold' // 폰트 두께를 bold로 설정
    }).setOrigin(0.5, 0).setDepth(3);

    // 골드를 담을 그룹을 생성합니다.
    this.goldGroup = this.physics.add.group();


    // 적들을 담을 그룹을 생성합니다.
    this.enemies = this.physics.add.group();

    //배경 생성
    this.background = this.add.tileSprite(400,300,800,600, 'background');

    //플레이어 케릭터 생성 (화면 중앙에 고정)
    this.player = this.physics.add.sprite(400,300, 'player');
    //플레이어의 depth 값을 배경보다 높게 설정
    this.player.setDepth(1);
    this.player.displayWidth=96;
    this.player.displayHeight=114;

    //HP 바 그래픽 생성
    this.hpBar = this.add.graphics();
    this.updateHpBar();

    //Tween을 사용하여 캐릭터가 '숨쉬는'효과를 위해 약간 확대 /축소
    this.tweens.add({
        targets:this.player,
        scale: {start:0.98,to:1.02}, //시작 및 종료 스케일 값
        duration: 500, //한번 숨쉬는게 걸리는 시간
        yoyo: true, //애니메이션을 역방향으로도 실행
        repeat: -1 //무한반복 
    })

    

    

    //왼쪽으로 이동하는 애니메이션 추가
    this.anims.create({
        key:'walkLeft',
        frames:[
            {key: 'frame1'},
            {key: 'frame2'},
            {key: 'frame3'},
            {key: 'frame4'},
            {key: 'frame5'},
            {key: 'frame6'},
            {key: 'frame7'},
            {key: 'frame8'}
            
        ],
        
        frameRate: 10,
        repeat: -1
    });

    //뒤로 이동하는 애니메이션 추가
    this.anims.create({
        key:'walkBack',
        frames:[
            {key: 'frame9'},
            {key: 'frame10'},
            {key: 'frame11'},
            {key: 'frame12'},
            {key: 'frame13'},
            {key: 'frame14'},
            {key: 'frame15'},
            {key: 'frame16'}
        ],
        frameRate: 10,
        repeat: -1

    });

    //공격 애니메이션 생성
    this.anims.create({
        key: 'playerAttack',
        frames: [
            {key: 'frame17'},
            {key: 'frame18'},
            {key: 'frame19'},
            {key: 'frame20'},
            {key: 'frame21'},
            {key: 'frame22'}

        ],
        frameRate:10,
        repeat: -1
    })

    

    //적을 주기적으로 생성
    this.time.addEvent({
        delay:2000, // 2000ms 마다 실행
        callback: this.createEnemy,
        callbackScope: this,
        loop: true
    });

    //자동 공격 타이머 이벤트 설정
    this.time.addEvent({
        delay:3000, //3초마다
        callback: this.autoAttack, // 자동공격!
        callbackScope: this, // this 컨텍스트를 현재 Scene으로 설정
        loop: true // 무한 반복
                
    });

    //키보드 입력 활성화
    this.cursors = this.input.keyboard.createCursorKeys();
    console.log(this.scoreText); // 스코어 텍스트 객체 정보 출력
    console.log(this.goldText); // 골드 텍스트 객체 정보 출력

    
}

openMenu() {

    // 현재 Scene을 일시 정지
    this.scene.pause();

    // 메뉴 UI를 생성하고 표시
    this.menuBackground = this.add.graphics();
    this.menuBackground.fillStyle(0x000000, 0.7); // 배경색 및 투명도 설정
    this.menuBackground.fillRect(200, 150, 400, 300); // 메뉴 배경을 그림

    // 상점 버튼 추가
    this.shopButton = this.add.text(300, 200, '상점', { fontSize: '24px', fill: '#ffffff' })
        .setInteractive()
        .on('pointerdown', () => {
            // 상점으로 이동하는 로직 구현
            this.goToShop();
        });

    // 업그레이드 버튼 추가
    this.upgradeButton = this.add.text(300, 250, '업그레이드', { fontSize: '24px', fill: '#ffffff' })
        .setInteractive()
        .on('pointerdown', () => {
            // 업그레이드 UI를 표시하는 로직 구현
            this.showUpgradeUI();
        });

    // 저장하기 버튼 추가
    this.saveButton = this.add.text(300, 300, '저장하기', { fontSize: '24px', fill: '#ffffff' })
        .setInteractive()
        .on('pointerdown', () => {
            // 저장하기 기능을 수행하는 로직 구현
            this.saveGame();
        });

    // 불러오기 버튼 추가
    this.loadButton = this.add.text(300, 350, '불러오기', { fontSize: '24px', fill: '#ffffff' })
        .setInteractive()
        .on('pointerdown', () => {
            // 불러오기 기능을 수행하는 로직 구현
            this.loadGame();
        });

    // 끝내기 버튼 추가
    this.quitButton = this.add.text(300, 400, '끝내기', { fontSize: '24px', fill: '#ffffff' })
        .setInteractive()
        .on('pointerdown', () => {
            // 게임 종료 로직 구현
            this.quitGame();
        });

        this.menuOpen = true;
}

// 상점으로 이동하는 함수
goToShop() {
    // 상점으로 이동하는 로직을 작성
}

// 업그레이드 UI를 표시하는 함수
showUpgradeUI() {
    // 업그레이드 UI를 표시하는 로직을 작성
}

// 게임 저장하기 함수
saveGame() {
    // 게임 저장하기 로직을 작성
}

// 게임 불러오기 함수
loadGame() {
    // 게임 불러오기 로직을 작성
}

// 게임 종료 함수
quitGame() {
    // 게임 종료 로직을 작성
}

closeMenu() {
    // 메뉴를 닫기 위한 로직 구현
    // 메뉴 창을 숨기는 코드
    this.menuOpen = false;
}


updateScore(score){
    this.score += score;
    this.scoreText.setText(`Score: ${this.score}`);

}

updateGold(gold) {
    this.gold += gold;
    this.goldText.setText(`Gold: ${this.gold}`);
}



//hp바 그리기
updateHpBar() {
    this.hpBar.clear();
    this.hpBar.fillStyle(0xff0000,1) //빨간색으로 바탕 그리기
    this.hpBar.fillRect(350,345,100,10)  //바탕 위치와 크기 설정
    this.hpBar.fillStyle(0x00ff00,1) //초록색으로 현재 hp그리기
    let hpWidth = (this.playerHp / this.maxHp) * 100;  //hp비율에 따라 너비계산
    this.hpBar.fillRect(350,345,hpWidth,10); //현재 hp 위치와 크기 설정
}

//자동 공격 실행 로직
autoAttack(){
    console.log("기본공격 무한반복");
    this.isAttacking = true;
    this.player.anims.play('playerAttack', true); //공격 애니메이션 재생
        this.checkAttackHit();



    this.player.once('animationcomplete', (animation)=>{
        if(animation.key === 'playerAttack'){
            this.isAttacking = false;
                
        }
    });
}

checkAttackHit(){
    //플레이어와 충동한 적들을 가져옴
    const nearbyEnemies = this.enemies.getChildren();

    //플레이어의 위치
    const playerX = this.player.x;
    const playerY = this.player.y;

     // 콘솔에 플레이어의 현재 위치 출력
    console.log(`플레이어 위치 - X: ${playerX}, Y: ${playerY}`);

    // 플레이어 주변의 적을 순회하며 공격 범위 내에 있는지 확인하고 데미지를 적용
    nearbyEnemies.forEach((enemy) => {
        // 적의 위치
        const enemyX = enemy.x;
        const enemyY = enemy.y;

        // 플레이어와 적 사이의 거리 계산
        const distance = Phaser.Math.Distance.Between(playerX, playerY, enemyX, enemyY);

        // 콘솔에 거리 정보 출력
        console.log(`플레이어와 적 간의 거리: ${distance}`);

        // 공격 범위 내에 있는 경우에만 데미지를 적용
        if (distance <= 100) {
            // 적의 체력 감소
            enemy.health -= this.playerDamage;

            // 만약 적의 체력이 0 이하면 적을 제거
            if (enemy.health <= 0) {
                enemy.destroy();
            }
        }
    });
}





createEnemy() {
    //화면의 가장자리에서 랜덤 위치 선택
    let x = Phaser.Math.Between(0,800);
    let y = Phaser.Math.Between(0,600);
    
    // this.add.sprite 대신 this.physics.add.sprite를 사용하여 적을 생성
    let enemy = this.physics.add.sprite(x, y, 'enemy0');

    //크기 설정
    enemy.setScale(3);
    enemy.setDepth(1);
    enemy.health = 100;
    
    //적의 이동 방향을 플레이어(중앙) 쪽으로 설정
    let angle = Phaser.Math.Angle.Between(x,y,this.player.x, this.player.y);
    enemy.rotation = angle;

    //적의 속도와 방향 설정
    this.physics.moveToObject(enemy, this.player , 60);

    //플레이어의 공격에 피격당할 수 있도록 충돌 처리
    this.physics.add.overlap(this.player, enemy, this.playerHitEnemy, null, this);

    enemy.on('destroy', ()=>{
        this.createGold(enemy.x,enemy.y);
        this.updateScore(10); //적하나 죽을때마다 10점 증가
        
    });

    

    this.enemies.add(enemy);
    
    return enemy;

    
}

// 골드를 생성하고 떨어뜨리는 함수
createGold(x, y) {
    // 새로운 골드 객체를 생성합니다.
    let gold = this.physics.add.sprite(x, y, 'gold');
    // 적당한 크기로 조정합니다.
    gold.setScale(2);
    // 골드를 골드 그룹에 추가합니다.
    this.goldGroup.add(gold);
    
    // 골드와 플레이어 간의 충돌을 처리합니다.
    this.physics.add.overlap(this.player, gold, this.collectGold, null, this);
}

// 골드와 플레이어의 충돌을 감지하고, 골드를 주운 경우의 처리를 수행합니다.
checkGoldCollision() {
    this.physics.overlap(this.player, this.goldGroup, (player, gold) => {
        gold.destroy(); // 골드를 제거합니다.
        this.collectGold(); // 골드를 주운 후 처리를 합니다.
    }, null, this);
}


// 플레이어가 골드를 획득했을 때 호출되는 함수
collectGold(player, gold) {
   // 골드 수를 증가시키고, 골드 텍스트를 업데이트합니다.
    this.updateGold(1); // 골드를 획득할 때마다 1을 증가시킴
    
    // 골드가 흔들리고 사라지는 효과를 주기 위해 Tween 애니메이션을 추가합니다.
    this.tweens.add({
        targets: gold,
        duration: 200, // 0.2초 동안 애니메이션 수행
        scaleX: 0.8, // X 축 스케일을 줄이기
        scaleY: 0.8, // Y 축 스케일을 줄이기
        alpha: 0, // 투명도를 0으로 설정하여 사라지도록 함
        onComplete: () => {
            // 애니메이션이 완료되면 골드를 제거합니다.
            gold.destroy();
        }
    });
}


//플레이어가 적을 공격했을 때 실행되는 함수
playerHitEnemy(player, enemy){

    if(!enemy.isHit){//적이 피격되지 않았다면
        enemy.isHit = true; //피격 상태로 변경
        
    //적의 에너지 감소
    enemy.health -= this.playerDamage; //체력 감소 
    if(enemy.health <=0){
        //적이 사망한 경우에는 특별한 처리를 해줄 수 있습니다.
        //예 적을 제거하고 점수를 증가시키는 등의 작업을 수행합니다.

        enemy.destroy();
    }else{
        //피격 후 잠시 무적 시간 설정
        this.time.addEvent({
        delay: 500, //0.5초 동안
        callback: () => {enemy.isHit = false;}
    });
    }
}
}




update(){

    //키 입력에 따른 애니메이션과 배경 이동 처리를 위한 플래그
    let isMoving = false;
    
   // 키 입력에 따라 배경 이동 처리
    if (this.cursors.left.isDown) {

        this.enemies.getChildren().forEach(function(enemy) {
            enemy.x += 2; // 적을 오른쪽으로 이동
            
        });

        this.goldGroup.getChildren().forEach(function(gold){
            gold.x += 2; //골드를 오른쪽으로 이동
        });

        this.background.tilePositionX -= 2;
        this.player.anims.play('walkLeft',true);
        this.player.setScale(1); //왼쪽으로 이동할때는 원래 스케일
        isMoving = true;
    } 

    if (this.cursors.right.isDown) {

        this.enemies.getChildren().forEach(function(enemy) {
            enemy.x -= 2; // 적을 왼쪽으로 이동
            
        });

        this.goldGroup.getChildren().forEach(function(gold){
            gold.x -= 2; //골드를 오른쪽으로 이동
        });

        this.background.tilePositionX += 2;
        this.player.anims.play('walkLeft',true);
        this.player.setScale(-1, 1); // X 축 기준으로 이미지 반전
        isMoving = true;
    }
    if (this.cursors.up.isDown) {

        this.enemies.getChildren().forEach(function(enemy) {
            enemy.y += 2; // 적을 아래로 이동
            
        });

        this.goldGroup.getChildren().forEach(function(gold){
            gold.y += 2; //골드를 오른쪽으로 이동
        });

        this.background.tilePositionY -= 2;
        this.player.anims.play('walkBack', true);
        this.player.setScale(1); // 위로 이동할 때는 원래 스케일
        isMoving = true;
    }
    // 오른쪽과 위쪽 키가 동시에 눌렸을 때만 반전시킵니다.
    if (this.cursors.up.isDown && this.cursors.right.isDown) {
        this.player.anims.play('walkBack', true);
        this.player.setScale(-1, 1); // X 축 기준으로 이미지 반전
        isMoving = true;
    }

    if (this.cursors.up.isDown && this.cursors.left.isDown){
        this.player.anims.play('walkBack', true);
        this.player.setScale(1); // 위쪽 이동만 있는 경우 원래 스케일
        isMoving = true;
    }
    if (this.cursors.down.isDown) {

        this.enemies.getChildren().forEach(function(enemy) {
            enemy.y -= 2; // 적을 위로 이동
           
        });
        this.goldGroup.getChildren().forEach(function(gold){
            gold.y -= 2; //골드를 오른쪽으로 이동
        });
        

        this.background.tilePositionY += 2;
        this.player.anims.play('walkLeft',true);
        isMoving = true;
    } 
    if(!isMoving && !this.isAttacking){
        this.player.anims.stop();
        this.player.setTexture('player'); // 기본 프레임으로 설정, 캐릭터의 기본 상태 이미지가 필요함 //키 입력이 없을 때는 애니메이션 정지
    }

    //적들의 플레이어를 향해 이동하도록 처리
    this.enemies.getChildren().forEach((enemy) =>{

        var angle = Phaser.Math.Angle.Between(enemy.x, enemy.y, this.player.x , this.player.y);
        
        
        // 적의 속도 벡터를 설정하여 플레이어를 향해 이동시킴
        enemy.body.velocity.x = Math.cos(angle) * 60; //60은 초당 프레임 수
        enemy.body.velocity.y = Math.sin(angle) * 60;
    });

    //플레이어와 적의 충돌 감지 로직 추가
    this.physics.overlap(this.player, this.enemies, (player,enemy) => {
        if(!enemy.isHit){//적이 피격되지 않았다면
        console.log("플레이어가 적에게 피격됨"); //콘솔 로그로 충돌 확인
        enemy.isHit = true; // 피격 상태로 변경
        this.playerHp -=1 ; //플레이어 hp 감소     
        console.log(`플레이어 HP: ${this.playerHp}`); //현재 HP로깅
        this.updateHpBar(); //hp바 업데이트

        //피격 후 잠시 무적 시간 설정
        this.time.addEvent({
            delay:500,// 0.5초 동안
            callback: ()=> {
                enemy.isHit = false;
            }
        });
    
    }
    }, null, this)
    

    

}
}


//게임의 초기 설정을 위한 config 객체입니다.
var config={
    type:Phaser.AUTO,
    scale:{
        mode: Phaser.Scale.FIT,
        parent: 'phaser-container',
        autoCenter : Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
        backgroundColor: '#5DACD8'
    },
    scene:[MyScene],
    
    //여기에 physics 설정을 추가합니다.
    physics: {
        default: 'arcade',
        arcade:{
            gravity: {y: 0}, 
            debug: false

        }
    }
};


var game=new Phaser.Game(config);

