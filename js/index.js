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
    }
};

var game=new Phaser.Game(config);

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

    //적 유닛 생성
    this.load.image('enemy', '/node_modules/phaser/assets/')



}

function create(){
    //여기서 게임에 필요한 초기화 작업을 합니다.

    //배경 생성
    this.background = this.add.tileSprite(400,300,800,600, 'background');

    //플레이어 케릭터 생성 (화면 중앙에 고정)
    this.player = this.add.sprite(400,300, 'player');
    //플레이어의 depth 값을 배경보다 높게 설정
    this.player.setDepth(5);
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
            {key: 'frame8'},
            
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
            {key: 'frame16'},
        ],
        frameRate: 10,
        repeat: -1

    });




    //키보드 입력 활성화
    this.cursors = this.input.keyboard.createCursorKeys();

    
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
    if(!isMoving){
        this.player.anims.stop();
        this.player.setTexture('player'); // 기본 프레임으로 설정, 캐릭터의 기본 상태 이미지가 필요함 //키 입력이 없을 때는 애니메이션 정지
    }

    

}