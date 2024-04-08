class UIScene extends Phaser.Scene{
    constructor(){
        super({key: 'UIScene',active: true});
    }

    create(){

        console.log("UIScene이 생성되었습니다.");

    


        //메뉴 그룹 초기화 및 구성
        this.menuGroup = this.add.group();
        this.setupMenuControls();
        this.createMenu();
        //메뉴 버튼 및 ESC 키 이벤트 핸들러 설정
    
        console.log("메뉴 컨트롤 설정 완료")
        
    }


    createMenu(){
        console.log("메뉴 생성 시작")
        
        //메뉴 UI 요소를 메뉴 그룹에 추가, 메뉴 배경 스타일 설정
        let menuBackground = this.add.graphics().fillStyle(0x000000, 0.7)
                                                .fillRect(200,150,400,300)
                                                .setDepth(4);
    
        //UI 요소 추가 
        // 상점 버튼 추가
        this.shopButton = this.add.text(300, 200, '상점보기', { fontSize: '24px', fill: '#ffffff', fontStyle:'bold' })
            .setInteractive()
            .setDepth(4)
            .on('pointerdown', () => {
                // 상점으로 이동하는 로직 구현
                this.goToShop();
            });
    
        // 업그레이드 버튼 추가
        this.upgradeButton = this.add.text(300, 250, '강화하기', { fontSize: '24px', fill: '#ffffff', fontStyle:'bold' })
            .setInteractive()
            .setDepth(4)
            .on('pointerdown', () => {
                // 업그레이드 UI를 표시하는 로직 구현
                this.showUpgradeUI();
            });
    
        // 저장하기 버튼 추가
        this.saveButton = this.add.text(300, 300, '저장하기', { fontSize: '24px', fill: '#ffffff', fontStyle:'bold' })
            .setInteractive()
            .setDepth(4)
            .on('pointerdown', () => {
                // 저장하기 기능을 수행하는 로직 구현
                this.saveGame();
            });
    
        // 불러오기 버튼 추가
        this.loadButton = this.add.text(300, 350, '불러오기', { fontSize: '24px', fill: '#ffffff', fontStyle:'bold' })
            .setInteractive()
            .setDepth(4)
            .on('pointerdown', () => {
                // 불러오기 기능을 수행하는 로직 구현
                this.loadGame();
            });
    
        // 끝내기 버튼 추가
        this.quitButton = this.add.text(300, 400, '끝내기', { fontSize: '24px', fill: '#ffffff', fontStyle:'bold' })
            .setInteractive()
            .setDepth(4)
            .on('pointerdown', () => {
                // 게임 종료 로직 구현
                this.quitGame();
            });
    
            this.menuGroup.add(menuBackground);
            this.menuGroup.add(this.shopButton);
            this.menuGroup.add(this.upgradeButton);
            this.menuGroup.add(this.saveButton);
            this.menuGroup.add(this.loadButton);
            this.menuGroup.add(this.quitButton);
        console.log("메뉴 생성 완료")
    
        this.menuGroup.setVisible(false);
        this.menuOpen = false;
    
    }
    
    
    setupMenuControls(){
        //ESC 키 이벤트 핸들러 설정
        console.log("ESC키 이벤트 설정")
        
        this.input.keyboard.on('keydown-ESC', () => {
            this.toggleMenu();
        });
    
        
    }
    
    
    
    openMenu() {
    
        console.log('openMenu 함수 호출');
        this.menuOpen = true; // 메뉴 상태를 열림으로 설정
        console.log(`메뉴 상태 변경됨: ${this.menuOpen}`);
    
        // 메뉴 UI 요소를 컨테이너에 추가
        this.menuGroup.setVisible(true);
    
        // 현재 Scene을 일시 정지
        this.scene.pause('GameScene');
    
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
        console.log('closeMenu 함수 호출');
        // 메뉴를 닫기 위한 로직 구현
        // 메뉴 창을 숨기는 코드
        this.menuOpen = false;
        this.menuGroup.setVisible(false);
        this.scene.resume('GameScene'); //게임 재개
        
        console.log(`메뉴 상태 변경됨: ${this.menuOpen}`);
    }
    
    

toggleMenu() {
    //메뉴의 가시성 토글
    this.menuOpen = !this.menuOpen;
    this.menuGroup.setVisible(this.menuOpen);
    if (this.menuOpen) {
    // 메뉴가 열릴 때, 현재 씬을 일시 정지
    this.scene.pause('GameScene');
    } else {
       // 메뉴가 닫힐 때, 현재 씬을 재개
    this.scene.resume('GameScene');
    }
    }
}