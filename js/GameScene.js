
class GameScene extends Phaser.Scene{
    constructor(){
        super({ key: 'GameScene'});
        this.enemies = null; // 전역 변수로 선언합니다.
        this.player = null; // player 전역 변수로 선언
        this.playerHp = 100; // 플레이어의 초기 HP
        this.maxHp = 100; // 플레이어의 최대 HP
        this.playerDamage = 100; //플레[이어가 적에게 입히는 데미지의 기본값입니다.
        this.score = 0; //점수
        this.gold  = 0; // 골드
        this.goldGroup = null; // 골드 그룹
        this.menuGroup = null; //메뉴 그룹
        this.menuOpen = false; // 메뉴 창이 열려 있는지 여부를 나타내는 변수 추가
        this.playerLevel = 1; //초기 레벨은 1로 설정
        this.playerMaxLevel = 52; //최대 레벨
        this.exp = null;
        this.maxExp =null;
        this.expNeededPerLevel = [
            100,  // 레벨 1
            125,  // 레벨 2
            175,  // 레벨 3
            200,  // 레벨 4
            250,  // 레벨 5
            546,  // 레벨 6
            1105, // 레벨 7
            1695, // 레벨 8
            2485, // 레벨 9
            3419, // 레벨 10
            4611, // 레벨 11
            6003, // 레벨 12
            7616, // 레벨 13
            9496, // 레벨 14
            11601, // 레벨 15
            14101, // 레벨 16
            17079, // 레벨 17
            20525, // 레벨 18
            24457, // 레벨 19
            28813, // 레벨 20
            33753, // 레벨 21
            39347, // 레벨 22
            45689, // 레벨 23
            52897, // 레벨 24
            61041, // 레벨 25
            70241, // 레벨 26
            80547, // 레벨 27
            92029, // 레벨 28
            104173, // 레벨 29
            117681, // 레벨 30
            132681, // 레벨 31
            149289, // 레벨 32
            167625, // 레벨 33
            187813, // 레벨 34
            209977, // 레벨 35
            234241, // 레벨 36
            260733, // 레벨 37
            289581, // 레벨 38
            320917, // 레벨 39
            354881, // 레벨 40
            391617, // 레벨 41
            431273, // 레벨 42
            474001, // 레벨 43
            519957, // 레벨 44
            569297, // 레벨 45
            622181, // 레벨 46
            678773, // 레벨 47
            739253, // 레벨 48
            803809, // 레벨 49
            872641, // 레벨 50
            946001, // 레벨 51
            1024061 // 레벨 52
        ]; // 각 레벨별 필요 경험치를 나타내는 배열
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

    //에너지볼트 이미지 생성
    this.load.image('vault', '/node_modules/phaser/assets/magic/EnergyVault.png')



}

create(){
    //여기서 게임에 필요한 초기화 작업을 합니다.
    console.log("게임 초기화 시작")



    this.scene.launch('UIScene');

    //메뉴 버튼 클릭 이벤트 핸들러 설정
    this.menuButton = this.add.text(10,9, '[M o L]', {
        fontSize:'20px',
        fill: '#fb2b2b',
        fontStyle:'bold'
    })
        .setInteractive()
        .setDepth(3)
        .on('pointerdown', ()=>{
            this.scene.get('UIScene').toggleMenu();
        });


    //경험치 바의 생성
    this.expBar = this.add.graphics();
    this.updateExpBar(0);
    //경험치 바의 depth 설정
    this.expBar.setDepth(3);
    
    this.energyBolts = this.physics.add.group();



    //스코어 생성
    this.scoreText = this.add.text(330, 9, 'Score: 0',{
        fontSize: '20px',
        fill: '#ffffff',
        fontStyle: 'bold' // 폰트 두께를 bold로 설정
    }).setOrigin(0.5,0).setDepth(3);

    // 골드 텍스트 생성 및 스타일 설정
    this.goldText = this.add.text(470, 9, 'Gold: 0', {
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

    this.time.addEvent({
        delay: 2000, //2초마다
        callback: this.fireEnergyBolt,
        callbackScope:this,
        loop: true // 무한반복
    })

    //키보드 입력 활성화
    this.cursors = this.input.keyboard.createCursorKeys();
    console.log(this.scoreText); // 스코어 텍스트 객체 정보 출력
    console.log(this.goldText); // 골드 텍스트 객체 정보 출력

    
}

//경험치 갱신 메서드
updateExpBar(currentExp){
    console.log("Player Level:", this.playerLevel, "Current Exp:", currentExp);

    this.currentExp = currentExp; // 현재 경험치를 업데이트
    const expNeeded = this.expNeededPerLevel[this.playerLevel -1]; //현재 레벨에 필요한 총경험치
    console.log("Exp Needed:", expNeeded);
    const expPercent = this.currentExp / expNeeded; //현재 경험치의 비율 계산

    console.log('currentExp:', currentExp, 'expNeeded:', expNeeded, 'expPercent:', expPercent);

    this.expBar.clear();
    //경험치 바의 배경 그리기
    this.expBar.fillStyle(0x444444,1); //경험치바 배경
    this.expBar.fillRect(0,0,800, 10);  //위치와 크기설정

    //현재 경험치에 따른 바 그리기
    this.expBar.fillStyle(0xC0C0C0,1); // 경험치 색상
    this.expBar.fillRect(0, 0, 800 * expPercent, 10);

    
}


updateScore(score){
    this.score += score;
    this.scoreText.setText(`Score: ${this.score}`);

}

updateGold(gold) {
    this.gold += gold;
    this.goldText.setText(`Gold: ${this.gold}`);
}





fireEnergyBolt(){
    if(this.enemies.getChildren().length === 0){
        return;
    }

    // 가장 가까운 적을 찾음
    let closestEnemy = this.enemies.getChildren().reduce((closest, enemy) => {
        let currentDistance = Phaser.Math.Distance.Between(this.player.x, this.player.y, enemy.x, enemy.y);
        if (currentDistance < closest.distance) {
            return { distance: currentDistance, enemy: enemy };
        }
        return closest;
    }, { distance: Infinity, enemy: null }).enemy;

    if (!closestEnemy) {
        // 가장 가까운 적이 없으면 아무것도 하지 않음
        return;
    }

    
    //에너지 볼트 속도 및 방향 설정
    let energyBolt = this.energyBolts.create(this.player.x, this.player.y, 'vault');
    energyBolt.setScale(0.1); //에너지 볼트 크기 조절
    energyBolt.damage = 50;// 에너지 볼트 데미지 
    
    this.physics.moveToObject(energyBolt, closestEnemy, 500); //에너지볼트 속도 300

    //에너지볼트가 적에게 닿았을 때의 처리를 위한 충돌 설정
    this.physics.add.collider(energyBolt, this.enemies,(bolt,enemy)=>{
        bolt.destroy(); //에너지 볼트 제거
        enemy.health -= bolt.damage; // 적의 체력 감소
        if(enemy.health <= 0){
            enemy.destroy(); //적 제거
        }
    })

    //에너지 볼트의 회전 각도 설정
    let angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, closestEnemy.x, closestEnemy.y);
    energyBolt.rotation = angle;
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
    if(this.player){
    console.log("기본공격 무한반복");
    this.isAttacking = true;
    this.player.anims.play('playerAttack', true); //공격 애니메이션 재생
        this.checkAttackHit();



    this.player.once('animationcomplete', (animation)=>{
        if(animation.key === 'playerAttack'){
            this.isAttacking = false;
            console.log("공격 애니메이션 완료"); // 콘솔 로그 추가
                
        }
    });
}
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

         // 적 하나 죽을 때마다 경험치 10 증가
        this.currentExp += 10;
        this.updateExpBar(this.currentExp); // 업데이트된 경험치로 경험치 바 업데이트
        
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
    scene:[GameScene],
    
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

