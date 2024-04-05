

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
    scene:{
        preload:preload,
        create:create,
        update:update
    },

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
var enemies; // 전역 변수로 선언합니다.

function preload(){
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



}

function create(){
    //여기서 게임에 필요한 초기화 작업을 합니다.

    // 적들을 담을 그룹을 생성합니다.
    enemies = this.physics.add.group();

    

    //배경 생성
    this.background = this.add.tileSprite(400,300,800,600, 'background');

    //플레이어 케릭터 생성 (화면 중앙에 고정)
    this.player = this.add.sprite(400,300, 'player');
    //플레이어의 depth 값을 배경보다 높게 설정
    this.player.setDepth(1);
    this.player.displayWidth=96;
    this.player.displayHeight=114;

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
        callback: createEnemy,
        callbackScope: this,
        loop: true
    });

    //자동 공격 타이머 이벤트 설정
    this.time.addEvent({
        delay:3000, //3초마다
        callback: autoAttack, // 자동공격!
        callbackScope: this, // this 컨텍스트를 현재 Scene으로 설정
        loop: true // 무한 반복
                
    });

    //키보드 입력 활성화
    this.cursors = this.input.keyboard.createCursorKeys();

    
}

//자동 공격 실행 로직
function autoAttack(){
    console.log("기본공격 무한반복");
    this.isAttacking = true;
    this.player.anims.play('playerAttack', true); //공격 애니메이션 재생
    // this.checkAttackHit(); //공격 범위 확인 및 데미지 적용 함수 호출



    this.player.once('animationcomplete', (animation)=>{
        if(animation.key === 'playerAttack'){
            this.isAttacking = false;    
        }
    });
}






function createEnemy() {
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
    let angle = Phaser.Math.Angle.Between(x, y, 400, 300);
    enemy.rotation = angle;

    //적의 속도와 방향 설정
    this.physics.moveTo(enemy, 400, 300, 60);

    //플레이어의 공격에 피격당할 수 있도록 충돌 처리
    this.physic.add.overlap(player, enemy, playerHitEnemy, null, this);

    enemies.add(enemy);
    
    return enemy;

    
}

//플레이어가 적을 공격했을 때 실행되는 함수
function playerHitEnemy(player, enemy){
    //적의 에너지 감소
    enemy.health -= playerDamage; 
    if(enemy.health <=0){
        //적이 사망한 경우에는 특별한 처리를 해줄 수 있습니다.
        //예 적을 제거하고 점수를 증가시키는 등의 작업을 수행합니다.

        enemy.destroy();
    }
}




function update(){

    //키 입력에 따른 애니메이션과 배경 이동 처리를 위한 플래그
    let isMoving = false;
    
   // 키 입력에 따라 배경 이동 처리
    if (this.cursors.left.isDown) {
        this.background.tilePositionX -= 2;
        this.player.anims.play('walkLeft',true);
        this.player.setScale(1); //왼쪽으로 이동할때는 원래 스케일
        isMoving = true;
    } 

    if (this.cursors.right.isDown) {
        this.background.tilePositionX += 2;
        this.player.anims.play('walkLeft',true);
        this.player.setScale(-1, 1); // X 축 기준으로 이미지 반전
        isMoving = true;
    }
    if (this.cursors.up.isDown) {
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
        this.background.tilePositionY += 2;
        this.player.anims.play('walkLeft',true);
        isMoving = true;
    } 
    if(!isMoving && !this.isAttacking){
        this.player.anims.stop();
        this.player.setTexture('player'); // 기본 프레임으로 설정, 캐릭터의 기본 상태 이미지가 필요함 //키 입력이 없을 때는 애니메이션 정지
    }

    enemies.getChildren().forEach(enemy => {
        enemy.x += player.body.velocity.x / 60; //60은 초당 프레임 수
        enemy.y += player.body.velocity.y / 60;
    })
    

    

}