class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' });
    }

    preload() {
        // 로고, 시작 버튼 등의 리소스를 불러옵니다.
        this.load.image('startButton', '/node_modules/phaser/assets/start.png');
        this.load.image('st_background', '/node_modules/phaser/assets/mol.png')
    }

    create() {
        
        console.log("StartScene 생성됨"); // 콘솔에 로그 출력

         // 화면 오른쪽 상단에 골드 표시
        let gold = this.game.registry.get('gold') || 0;  // 게임 레지스트리에서 골드 값을 가져옴, 없으면 0으로 설정
        this.goldText = this.add.text(700, 20, `Gold: ${gold}`, {
        fontSize: '20px',
        fontStyle: 'bold',
        fill: '#ffd700'
        }).setOrigin(1, 0)
           .setDepth(5);  // 오른쪽 정렬을 위해 Origin을 (1, 0)으로 설정
        
        

        let bg = this.add.image(0,0,'st_background').setOrigin(0,0);
        // 이미지를 화면 크기에 맞게 조정
        bg.displayWidth = this.sys.game.config.width;
        bg.displayHeight = this.sys.game.config.height;

        // 시작 버튼을 추가하고 클릭 이벤트를 설정합니다.
        let startButton = this.add.image(400, 480, 'startButton').setInteractive();
        startButton.setScale(0.4);
        startButton.on('pointerdown', () => {
            this.scene.start('GameScene'); // 게임 메인 장면으로 전환
        });

        // 시작 화면의 타이틀, 설명 등을 표시합니다.
        this.add.text(400, 520, 'Memory of L', { fontSize: '32px', fill: '#fff' , fontStyle:'bold' }).setOrigin(0.5);
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
    scene:[StartScene, GameScene, UIScene], // StartScene을 게임의 첫 장면으로 추가
    
    //여기에 physics 설정을 추가합니다.
    physics: {
        default: 'arcade',
        arcade:{
            gravity: {y: 0}, 
            debug: true

        }
    }
};


var game=new Phaser.Game(config);