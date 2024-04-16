class UIScene extends Phaser.Scene{
    constructor(){
        super({key: 'UIScene', active: true});
        this.timerEvent = null;  // 타이머 이벤트를 저장할 변수
        this.pausedTime = 0;     // 일시정지된 시간을 기록
    }

    create(){

        console.log("UIScene이 생성되었습니다.");
        this.menuOpen =false;
        //메뉴 버튼 생성
        this.createMenuButton();

        //메뉴 그룹 초기화 및 구성
        this.createMenu();
        this.setupMenuControls();

        console.log("타이머가 생성되었습니다.");
        this.timerText = this.add.text(this.scale.width /2, 20, '00:00', {
            fontSize: '20px',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5,0).setDepth(3);

        
        this.timerEvent = this.time.addEvent ({
            delay: 1000, // 1초마다
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });

        this.startTime = this.time.now - this.pausedTime;
        }

    updateTimer(){
        const elapsed = Math.floor((this.time.now - this.startTime) /1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        this.timerText.setText(this.formatTime(minutes, seconds));
    }    

    formatTime(minutes, seconds) {
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        
    createMenuButton(){
        //메뉴 버튼 클릭 이벤트 핸들러 설정
    this.menuButton = this.add.text(10,0, '[M o L]', {
        fontSize:'20px',
        fill: '#fb2b2b',
        fontStyle:'bold'
    })
        .setInteractive()
        .setDepth(3)
        .on('pointerdown', ()=>{
            this.toggleMenu();
        });
    }

    
toggleMenu() {
    //메뉴의 가시성 토글
    this.menuOpen = !this.menuOpen;
    this.menuGroup.setVisible(this.menuOpen);
    if (this.menuOpen) {
    // 메뉴가 열릴 때, 현재 씬을 일시 정지
    this.scene.pause('GameScene');
    this.pausedTime = this.time.now - this.startTime;  // 현재 타이머 상태 저장
            this.timerEvent.paused = true;  // 타이머 이벤트 일시정지
    } else {
       // 메뉴가 닫힐 때, 현재 씬을 재개
    this.scene.resume('GameScene');
    this.startTime = this.time.now - this.pausedTime;  // 일시정지된 시간 고려
            this.timerEvent.paused = false;  // 타이머 이벤트 재개
    }
    }


    createMenu(){
        console.log("메뉴 생성 시작")
        
        //메뉴 UI 요소를 메뉴 그룹에 추가, 메뉴 배경 스타일 설정
        let menuBackground = this.add.graphics().fillStyle(0x000000, 0.7)
                                                .fillRect(100,70,600,500)
                                                .setDepth(4);

        //X버튼 추가
        let closeButton = this.add.text(675,70,'\u00D7',{
            fontSize:'30px',
            fill: '#FFFFFF',
            fontStyle:'bold'
        })
        .setInteractive()
        .setDepth(5)
        .on('pointerdown', ()=>{
            this.toggleMenu();
        })
        
        //스탯 및 스킬 이름 배열
        const stats = ['공격력' , '공격속도' , '방어력' , '체력', '이동속도'];
        const skills = ['에너지볼트' , '콜라이트닝' , '디스인티그레이트'];
        
         // 스탯 표시
    let yPosStats = 120; // 스탯 표시 시작 위치
    let statsTexts = stats.map(stat => {
        let text = this.add.text(140, yPosStats, `${stat}: [] `, {
            fontSize: '24px',
            fill: '#00FF00',
            fontStyle: 'bold'
        }).setDepth(5);
        yPosStats += 60; // 다음 항목 위치
        return text;
    });

    // 스킬 표시
    let yPosSkills = 120; // 스킬 표시 시작 위치, 스탯에서 약간의 여백을 두고 시작
    let skillTexts = skills.map(skill => {
        let text = this.add.text(420, yPosSkills, `${skill}:\n [] `, {
            fontSize: '24px',
            fill: '#FF6347',
            fontStyle: 'bold',
            wrapWidth: {width: 200}
        }).setDepth(5);
        yPosSkills += 90; // 다음 항목 위치
        return text;
    });

        //메뉴 그룹화
        this.menuGroup = this.add.group([
        menuBackground,
        
        
        this.createButton(350, 470, '계속하기', this.playGame),
        this.createButton(360, 520, '끝내기', this.quitGame),
        closeButton,
        ...statsTexts,
        ...skillTexts
        
        ]);

    

        console.log("메뉴 생성 완료")

        this.menuGroup.setVisible(false);
    }

    setupMenuControls(){
        //ESC 키 이벤트 핸들러 설정
        console.log("ESC키 이벤트 설정")
        
        this.input.keyboard.on('keydown-ESC', () => {
            this.toggleMenu();
        });
    
        
    }

    createButton(x,y,text,onClick){
        let button =this.add.text(x,y,text,{fontSize: '24px', fill:'#ffffff', fontStyle:'bold'})
                    .setInteractive().setDepth(4).on('pointerdown', onClick.bind(this));
                return button;    
    }

    

    
    // 게임진행
    playGame() {
        
        this.toggleMenu();
    }
    
    // 게임 종료 함수
    quitGame() {

        const isConfirmed = confirm("정말로 게임을 종료하시겠습니까?");
        // 게임 종료 로직을 작성

        // 사용자가 '확인'을 선택한 경우, 게임 종료 로직을 수행합니다.
    if (isConfirmed) {
        this.game.destroy(true); // Phaser 게임 인스턴스 종료
        this.game.destroy(true); // Phaser 게임 인스턴스 종료
    }
}
    
    
}
