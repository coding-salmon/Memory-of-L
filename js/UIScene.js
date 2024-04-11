class UIScene extends Phaser.Scene{
    constructor(){
        super({key: 'UIScene', active: true});
    }

    create(){

        console.log("UIScene이 생성되었습니다.");
        this.menuOpen =false;
        //메뉴 버튼 생성
        this.createMenuButton();

        //메뉴 그룹 초기화 및 구성
        this.createMenu();
        this.setupMenuControls();
        
        
    
        
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
    } else {
       // 메뉴가 닫힐 때, 현재 씬을 재개
    this.scene.resume('GameScene');
    }
    }


    createMenu(){
        console.log("메뉴 생성 시작")
        
        //메뉴 UI 요소를 메뉴 그룹에 추가, 메뉴 배경 스타일 설정
        let menuBackground = this.add.graphics().fillStyle(0x000000, 0.7)
                                                .fillRect(200,150,400,300)
                                                .setDepth(4);

        //X버튼 추가
        let closeButton = this.add.text(570,150,'\u00D7',{
            fontSize:'30px',
            fill: '#fFFFFFFF',
            fontStyle:'bold'
        })
        .setInteractive()
        .setDepth(5)
        .on('pointerdown', ()=>{
            this.toggleMenu();
        })                                        
        
        //메뉴 그룹화
        this.menuGroup = this.add.group([
        menuBackground,
        this.createButton(300, 200, '상점', this.goToShop),
        this.createButton(300, 250, '스텟&스킬', this.statAndSkill),
        this.createButton(300, 300, '저장하기', this.saveGame),
        this.createButton(300, 350, '불러오기', this.loadGame),
        this.createButton(300, 400, '끝내기', this.quitGame),
        closeButton
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

    
    // 상점으로 이동하는 함수
    goToShop() {
        // 상점으로 이동하는 로직을 작성
        console.log("상점으로 이동");
    }
    
    // 스텟&스킬 UI를 표시하는 함수
    statAndSkill() {
        // 스텟&스킬 UI를 표시하는 로직을 작성
        console.log("스텟스킬 UI 표시");
    }
    
    // 게임 저장하기 함수
    saveGame() {
        // 게임 저장하기 로직을 작성
        console.log("게임 저장하기");
    }
    
    // 게임 불러오기 함수
    loadGame() {
        // 게임 불러오기 로직을 작성
        console.log("게임 불러오기");
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