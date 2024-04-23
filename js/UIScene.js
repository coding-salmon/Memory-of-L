class UIScene extends Phaser.Scene{
    constructor(){
        super({key: 'UIScene'});
        this.timerEvent = null;  // 타이머 이벤트를 저장할 변수
        this.pausedTime = 0;     // 일시정지된 시간을 기록
        this.elapsed = 0; //게임의 총 경과 시간
        
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

        this.restartTimer();  // 타이머 초기화 및 시작
        }

        restartTimer() {
        if (this.timerEvent) this.timerEvent.remove(false);  // 기존 타이머 이벤트가 있다면 제거
        
           // 타이머 텍스트가 이미 생성되었다면 재사용, 그렇지 않으면 새로 생성
        if (!this.timerText) {
        this.timerText = this.add.text(this.scale.width / 2, 20, '00:00', {
            fontSize: '20px',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5, 0).setDepth(3);
    }
        
            this.timerEvent = this.time.addEvent({
                delay: 1000,
                callback: this.updateTimer,
                callbackScope: this,
                loop: true
            });
        
            this.pausedTime = 0;  // 일시 정지된 시간 초기화
            this.startTime = this.time.now;  // 시작 시간 설정
        }
        

    updateTimer(){
        this.elapsed = Math.floor((this.time.now - this.startTime) /1000);
        const minutes = Math.floor(this.elapsed / 60);
        const seconds = this.elapsed % 60;
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
    this.refreshMenu();  // 메뉴를 갱신하여 최신 정보 표시    
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
                                                .fillRect(100,70,650,500)
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
        const stats = ['[공격력] ' , '[공격속도] ' , '[방어력] ' , '[체력] ', '[이동속도] '];
        const statKeys = ['playerDamage', 'playerCasting', 'playerDefense', 'playerHp', 'playerSpeed'];
        const skills = ['에너지볼트[1]' ,'단검투척[2]', '콜라이트닝[2]' , '소드스톰[3]'];
        const skillKeys = ['fireEnergyBolt','castDagger', 'castThunder', 'castDis'];
        
         // 스탯 표시
    let yPosStats = 120; // 스탯 표시 시작 위치
    let statsTexts = stats.map((stat, index) => {
        let statValue = this.game.registry.get(statKeys[index]) || 0; // 레지스트리에서 값 가져오기
        let text = this.add.text(140, yPosStats, `${stat}+ ${statValue}`, {
            fontSize: '24px',
            fill: '#00FF00',
            fontStyle: 'bold'
        }).setDepth(5);
        yPosStats += 60; // 다음 항목 위치
        return text;
    });

    // 스킬 표시
    let yPosSkills = 120; // 스킬 표시 시작 위치, 스탯에서 약간의 여백을 두고 시작
    let skillTexts = skills.map((skill, index) => {
        let skillData = this.game.registry.get(skillKeys[index]);
        let skillStatus = skillData ? `Lv ${skillData.level}` : '미습득';
        let actionText = skillData ? '강화' : '배우기';
        let text = this.add.text(420, yPosSkills, `${skill}: ${skillStatus}`, {
            fontSize: '24px',
            fill: '#FF6347',
            fontStyle: 'bold',
            wrapWidth: {width: 200}
        }).setDepth(5);
        let actionButton = this.createSkillButton(450, yPosSkills+40, actionText, () => this.handleSkillAction(skillKeys[index]));
        yPosSkills += 90; // 다음 항목 위치
        return {text, actionButton};
    });

     // 스킬 포인트 표시
     let skillPoints = this.game.registry.get('playerSkillPoints') || 0; // 스킬 포인트 불러오기
    let skillPointsText = this.add.text(420, yPosStats+40, `스킬 포인트: ${skillPoints}`, {
        fontSize: '24px',
        fill: '#FFFF00',
        fontStyle: 'bold'
    }).setDepth(5);

        //메뉴 그룹화
        this.menuGroup = this.add.group([
        menuBackground,
        
        
        this.createButton(220, 520, '<계속하기>', this.playGame),
        this.createButton(460, 520, '<끝내기>', this.quitGame),
        closeButton,
        ...statsTexts,
        ...skillTexts.map(st => st.text),
        ...skillTexts.map(st => st.actionButton),
        skillPointsText
        
        ]);

    

        console.log("메뉴 생성 완료")

        this.menuGroup.setVisible(false);
    }

    createSkillButton(x, y, text, onClick) {
        return this.add.text(x, y, `[${text}]`, {
            fontSize: '20px',
            fill: '#00FF00',
            fontStyle: 'bold'
        }).setInteractive().on('pointerdown', onClick).setDepth(5);
    }
    
    handleSkillAction(skillKey) {
        let skillData = this.game.registry.get(skillKey) || { level: 0 };
        const skillCosts = {
            fireEnergyBolt: 1, // 에너지볼트는 1 스킬 포인트 필요
            castDagger: 2, // 단검투척은 1 스킬 포인트 필요
            castThunder: 2,   // 썬더는 2 스킬 포인트 필요
            castDis: 3        // 디스는 3 스킬 포인트 필요
        };

         // 스킬을 배우거나 업그레이드할 때 동일한 포인트 필요
        const requiredPoints = skillCosts[skillKey];

        
        // 사용자의 현재 스킬 포인트 가져오기
        let playerSkillPoints = this.game.registry.get('playerSkillPoints') || 0;

        if (playerSkillPoints >= requiredPoints) {
            skillData.level++;
            this.game.registry.set(skillKey, skillData);
            this.game.registry.set('playerSkillPoints', playerSkillPoints - requiredPoints); // 스킬 포인트 차감
            console.log(`스킬 ${skillKey}: level ${skillData.level}. 남은 스킬 포인트: ${playerSkillPoints - requiredPoints}`);
            this.refreshMenu();
        // 스킬 레벨 업그레이드 이벤트를 GameScene으로 전달
        this.events.emit('skillLevelChanged', { skillKey, level: skillData.level });

        } else {
            console.log('스킬 포인트 부족');
        }
    }

    refreshMenu() {
        // 메뉴 업데이트 로직 작성
        this.menuGroup.clear(true); // 기존 메뉴 요소 제거
    
        // 새로운 메뉴 생성
        this.createMenu();
    
        // 메뉴 그룹을 다시 표시
        this.menuGroup.setVisible(this.menuOpen);
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

    destroy() {
        this.scene.remove('GameScene');
    }    
    createQuitMenu(){
        if (this.modal) return;  // 모달이 이미 표시되어 있으면 추가하지 않음
        let rect = this.add.rectangle(400, 300, 500, 300, 0x000000, 1)
        .setDepth(100); // 높은 깊이 값으로 설정하여 다른 요소들 위에 표시
        let text = this.add.text(230, 200, '첫 화면으로 이동하시겠습니까?', {
            fontSize: '24px',
            fill: '#FF0000',
            fontStyle: 'bold',
            }).setDepth(100);
        let yesButton = this.add.text(350, 300, '예', { fontSize: '24px', fill: '#FFF' })
            .setInteractive()
            .setDepth(101) // 높은 깊이 값으로 설정하여 다른 요소들 위에 표시
            .on('pointerdown', () => {
                // GameScene에서 골드 정보를 registry에 저장하는 함수 호출
                this.scene.get('GameScene').saveGoldToRegistry();                
                this.destroy()
                this.scene.start('StartScene'); // StartScene으로 이동
                this.destroyModal();

            });
        let noButton = this.add.text(450, 300, '아니오', { fontSize: '24px', fill: '#FFF' })
            .setInteractive()
            .setDepth(101) // 높은 깊이 값으로 설정하여 다른 요소들 위에 표시
            .on('pointerdown', () => {
                this.destroyModal();
            });

        this.modal = this.add.group([rect, text, yesButton, noButton]);
    }

    destroyModal() {
        if (!this.modal) return;
        this.modal.destroy(true);
        this.modal = null;
    }

    

    
    // 게임진행
    playGame() {
        
        this.toggleMenu();
    }
    
    // 게임 종료 함수
    quitGame() {

        // 게임 종료 로직을 작성
        this.createQuitMenu()




}
    
    
}
