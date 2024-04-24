
class GameScene extends Phaser.Scene{
    constructor(){
        super({ key: 'GameScene'});
        this.playerSkillPoints = 0; // 플레이어의 스킬 포인트
        this.skills = { // 스킬 레벨 관리
            fireEnergyBolt: 0,
            castThunder: 0,
            castDis: 0,
            castDagger: 0
        };
        this.enemies = null; // 전역 변수로 선언합니다.
        this.player = null; // player 전역 변수로 선언
        this.playerHitBox = null;
        this.playerHp = 50; // 플레이어의 초기 HP
        this.maxHp = 50; // 플레이어의 최대 HP
        this.playerDamage = 5; //플레이어가 적에게 입히는 데미지의 기본값입니다.
        this.playerCasting = 5;
        this.playerDefense = 5;
        this.playerSpeed =5;
        this.score = 0; //점수
        this.gold  = 0; // 골드
        this.goldGroup = null; // 골드 그룹
        this.menuGroup = null; //메뉴 그룹
        this.menuOpen = false; // 메뉴 창이 열려 있는지 여부를 나타내는 변수 추가
        this.playerLevel = 1; //초기 레벨은 1로 설정
        this.playerMaxLevel = 52; //최대 레벨
        this.exp = 0;
        this.maxExp =null;
        this.lastDirection = 'left';
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
    this.load.image('background', './assets/backgroundImage.png')

    //플레이어 이미지 가져오기
    this.load.image('player','./assets/playerImage.png')

    //왼쪽 오른쪽 아래 이동하는 애니메이션 추가하기
    this.load.image('frame1','./assets/thiefFront_walk01.png');
    this.load.image('frame2','./assets/thiefFront_walk02.png');
    this.load.image('frame3','./assets/thiefFront_walk03.png');
    this.load.image('frame4','./assets/thiefFront_walk04.png');
    this.load.image('frame5','./assets/thiefFront_walk05.png');
    this.load.image('frame6','./assets/thiefFront_walk06.png');
    this.load.image('frame7','./assets/thiefFront_walk07.png');
    this.load.image('frame8','./assets/thiefFront_walk08.png');


    //플레이어 공격 애니메이션 추가하기
    this.load.image('frame17', './assets/playerAttack/thief_atk01.png');
    this.load.image('frame18', './assets/playerAttack/thief_atk02.png');
    this.load.image('frame19', './assets/playerAttack/thief_atk03.png');
    this.load.image('frame20', './assets/playerAttack/thief_atk04.png');
    this.load.image('frame21', './assets/playerAttack/thief_atk05.png');
    this.load.image('frame22', './assets/playerAttack/thief_atk06.png');


    

    //적 유닛 생성
    this.load.image('enemy0', './assets/Enemy0/Enemy0.png');
    this.load.image('enemy1', './assets/Enemy0/Enemy1.png');
    this.load.image('enemy2', './assets/Enemy0/Enemy2.png');
    this.load.image('enemy3', './assets/Enemy0/Enemy3.png');

    //적 유닛 피격 이미지
    this.load.image('enemy4', './assets/Enemy0/Enemy4.png');

    //적 유닛 죽을 때
    this.load.image('enemy5', './assets/Enemy0/Enemy5.png');

    //적w 유닛 생성
    this.load.image('enemyW0', './assets/Enemy1/w0.png')
    this.load.image('enemyW1', './assets/Enemy1/w1.png')
    this.load.image('enemyW2', './assets/Enemy1/w2.png')
    this.load.image('enemyW3', './assets/Enemy1/w3.png')
    this.load.image('enemyW4', './assets/Enemy1/w4.png')
    this.load.image('enemyW5', './assets/Enemy1/w5.png')
    //적w 피격 이미지
    this.load.image('enemyW6', './assets/Enemy1/w6.png')
    // 적w 유닛 죽을 때
    this.load.image('enemyW7', './assets/Enemy1/w7.png')


    //적t 유닛생성
    this.load.image('enemyT0', './assets/Enemy2/t0.png')
    this.load.image('enemyT1', './assets/Enemy2/t1.png')

    //적 t 피격이미지
    this.load.image('enemyT2', './assets/Enemy2/t2.png')
    //적 t 죽었을때 
    this.load.image('enemyT3', './assets/Enemy2/t3.png')

 


    //적 z 생성
    this.load.image('enemyZ0', './assets/Enemy3/z0.png')
    this.load.image('enemyZ1', './assets/Enemy3/z1.png')
    this.load.image('enemyZ2', './assets/Enemy3/z2.png')
    this.load.image('enemyZ3', './assets/Enemy3/z3.png')
    this.load.image('enemyZ4', './assets/Enemy3/z4.png')
    this.load.image('enemyZ5', './assets/Enemy3/z5.png')
    //적 z 피격
    this.load.image('enemyZ6', './assets/Enemy3/z6.png')

    //적 z 죽었을때
    this.load.image('enemyZ7', './assets/Enemy3/z7.png')






    //적 o 생성
    this.load.image('enemyO0','./assets/Enemy4/o0.png')
    this.load.image('enemyO1','./assets/Enemy4/o1.png')
    this.load.image('enemyO2','./assets/Enemy4/o2.png')
    this.load.image('enemyO3','./assets/Enemy4/o3.png')
    this.load.image('enemyO4','./assets/Enemy4/o4.png')
    this.load.image('enemyO5','./assets/Enemy4/o5.png')
    //적 o 피격
    this.load.image('enemyO6','./assets/Enemy4/o6.png')
    //적 o 죽었을때
    this.load.image('enemyO7','./assets/Enemy4/o7.png')


  


    //골드 이미지 생성
    this.load.image('gold','./assets/gold/gold1.png')

    //파이어볼트 이미지 생성
    this.load.image('vault0', './assets/fire/fire0.png')
    this.load.image('vault1', './assets/fire/fire1.png')
    this.load.image('vault2', './assets/fire/fire2.png')
    this.load.image('vault3', './assets/fire/fire3.png')
    this.load.image('vault4', './assets/fire/fire4.png')


    //썬더 이미지 생성
    this.load.image('thunder0', './assets/thunder/thunder0.png');
    this.load.image('thunder1', './assets/thunder/thunder1.png');
    this.load.image('thunder2', './assets/thunder/thunder2.png');

    //dis 이미지 생성
    this.load.image('dis0', './assets/dis/dis0.png');
    this.load.image('dis1', './assets/dis/dis1.png');
    this.load.image('dis2', './assets/dis/dis2.png');
    this.load.image('dis3', './assets/dis/dis3.png');
    this.load.image('dis4', './assets/dis/dis4.png');
    this.load.image('dis5', './assets/dis/dis5.png');
    this.load.image('dis6', './assets/dis/dis6.png');
    this.load.image('dis7', './assets/dis/dis7.png');

    //단검 이미지 생성
    this.load.image('dagger', './assets/dagger/dagger.png');

    //파티클 이미지 생성
    this.load.image('spark' , './assets/fire.png')


}

create(){
    //여기서 게임에 필요한 초기화 작업을 합니다.
    console.log("게임 초기화 시작")


    // UIScene을 실행합니다.
    this.scene.launch('UIScene');

    //UIScene과의 통신을 위해 이벤트를 설정합니다.
    this.events.on('toggleMenu', this.toggleMenu, this);

     // UIScene에서 발송하는 이벤트 수신
    this.scene.get('UIScene').events.on('skillLevelChanged', this.handleSkillLevelChange, this);
    


    //경험치 바의 생성
    this.expBar = this.add.graphics();
    this.updateExpBar(0);
    //경험치 바의 depth 설정
    this.expBar.setDepth(3);
    
    this.energyBolts = this.physics.add.group();

    //레벨 텍스트
    this.playerLevelText = this.add.text(400, 0, 'Level: 1',{
        fontSize: '20px',
        fill: '#ffffff',
        fontStyle:'bold'
    }).setOrigin(0.5,0).setDepth(3);

    //스코어 생성
    this.scoreText = this.add.text(700, 0, 'Score: 0',{
        fontSize: '20px',
        fill: '#ffffff',
        fontStyle: 'bold' // 폰트 두께를 bold로 설정
    }).setOrigin(0.5,0).setDepth(3);

    let gold = this.game.registry.get('gold') || 0; // 레지스트리에서 골드 값 가져오기, 없으면 0

    // 골드 텍스트 생성 및 스타일 설정
    this.goldText = this.add.text(700, 20, `Gold: ${gold}`, {
        fontSize: '20px',
        fill: '#ffd700', // 골드 색상
        fontStyle: 'bold' // 폰트 두께를 bold로 설정
    }).setOrigin(0.5, 0).setDepth(3);

    // 경험치 + 골드를 담을 그룹을 생성합니다.
    this.goldGroup = this.physics.add.group();


    // 적들을 담을 그룹을 생성합니다.
    this.enemies = this.physics.add.group();

    //배경 생성
    this.background = this.add.tileSprite(400,300,800,600, 'background');

     // 보이지 않는 스프라이트를 생성합니다. 이 스프라이트는 게임의 물리적 상호작용을 관리합니다.
    this.playerHitBox = this.physics.add.sprite(400, 300, null);
    this.playerHitBox.setVisible(false); // 스프라이트를 화면에 보이지 않도록 설정합니다.
    this.playerHitBox.body.setSize(15, 30); // 히트박스의 크기를 설정합니다.
    this.playerHitBox.body.setOffset(10, 5); // 히트박스의 크기를 설정합니다.

    //플레이어 케릭터 생성 (화면 중앙에 고정)
    this.player = this.add.sprite(400,300, 'player');
    //플레이어의 depth 값을 배경보다 높게 설정
    this.player.setDepth(1);
    this.player.displayWidth=96;
    this.player.displayHeight=114;
   


    // 디버그 그래픽 활성화
    const debugGraphics = this.add.graphics().setAlpha(0.75);
    this.physics.world.createDebugGraphic().setVisible(false); // 물리 디버그 그래픽 활성화

    //HP 바 그래픽 생성
    this.hpBar = this.add.graphics();
    this.updateHpBar();


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
        repeat: 0
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
        repeat: 0
    })

    //적 유닛의 이동 애니메이션 생성
    this.anims.create({
        key:'enemyMove',
        frames:[
            {key: 'enemy0'},
            {key: 'enemy1'},
            {key: 'enemy2'},
            {key: 'enemy3'},
        ],
        frameRate:10,
        repeat:-1
    });

    // 적 유닛의 피격 애니메이션
this.anims.create({
    key: 'enemyHit',
    frames: [{ key: 'enemy4' }],
    frameRate: 10,
    repeat:0
});

// 적 유닛의 죽음 애니메이션
this.anims.create({
    key: 'enemyDie',
    frames: [{ key: 'enemy5' }],
    frameRate: 10,
    repeat: 0
});

this.anims.create({
    key:'enemyWMove',
    frames: [
        {key: 'enemyW0'},
        {key: 'enemyW1'},
        {key: 'enemyW2'},
        {key: 'enemyW3'},
        {key: 'enemyW4'},
        {key: 'enemyW5'}
    ],
    frameRate:10,
    repeat: -1
});

this.anims.create({
    key:'enemyWHit',
    frames: [{ key: 'enemyW6'}],
    frameRate:10
});

this.anims.create({
    key: 'enemyWDie',
    frames: [{key: 'enemyW7'}],
    frameRate:10
});


this.anims.create({
    key:'enemyZMove',
    frames: [
        {key: 'enemyZ0'},
        {key: 'enemyZ1'},
        {key: 'enemyZ2'},
        {key: 'enemyZ3'},
        {key: 'enemyZ4'},
        {key: 'enemyZ5'}
    ],
    frameRate:10,
    repeat: -1
});

this.anims.create({
    key:'enemyZHit',
    frames: [{ key: 'enemyZ6'}],
    frameRate:10
});

this.anims.create({
    key: 'enemyZDie',
    frames: [{key: 'enemyZ7'}],
    frameRate:10
});

this.anims.create({
    key:'enemyOMove',
    frames: [
        {key: 'enemyO0'},
        {key: 'enemyO1'},
        {key: 'enemyO2'},
        {key: 'enemyO3'},
        {key: 'enemyO4'},
        {key: 'enemyO5'}
    ],
    frameRate:10,
    repeat: -1
});

this.anims.create({
    key:'enemyOHit',
    frames: [{ key: 'enemyO6'}],
    frameRate:10
});

this.anims.create({
    key: 'enemyODie',
    frames: [{key: 'enemyO7'}],
    frameRate:10
});

this.anims.create({
    key:'enemyTMove',
    frames: [
        {key: 'enemyT0'},
        {key: 'enemyT1'}
        ],
    frameRate:10,
    repeat: 0
});

this.anims.create({
    key:'enemyTHit',
    frames: [{ key: 'enemyT2'}],
    frameRate:10
});

this.anims.create({
    key: 'enemyTDie',
    frames: [{key: 'enemyT3'}],
    frameRate:10
});

 //적을 주기적으로 생성
this.time.addEvent({
    delay:2000, // 2000ms 마다 실행
    callback: this.createEnemy,
    callbackScope: this,
    loop: true
});

// 30초마다 적의 수를 증가시키는 웨이브 생성
this.waveCount = 10; // 초기 웨이브에서 생성될 적의 수
this.createWave();



    //자동 공격 타이머 이벤트 설정
    this.time.addEvent({
        delay:3000, //3초마다
        callback: this.autoAttack, // 자동공격!
        callbackScope: this, // this 컨텍스트를 현재 Scene으로 설정
        loop: true // 무한 반복
                
    });

    //에너지볼트 애니메이션 생성
    this.anims.create({
        key: 'vault',
        frames: [
            {key: 'vault0'},
            {key: 'vault1'},
            {key: 'vault2'},
            {key: 'vault3'},
            {key: 'vault4'}
            ],
            frameRate:10,
            repeat: 0
    })
    
    //썬더 애미메이션 생성
    this.anims.create({
        key: 'thunder',
        frames: [
            {key: 'thunder0'},
            {key: 'thunder1'},
            {key: 'thunder2'}
            ],
            frameRate:10,
            repeat: 0
    })


    //디스 애니메이션
    this.anims.create({
        key: 'dis',
        frames: [
            {key: 'dis0'},
            {key: 'dis1'},
            {key: 'dis2'},
            {key: 'dis3'},
            {key: 'dis4'},
            {key: 'dis5'},
            {key: 'dis6'},
            {key: 'dis7'},
        ],
            frameRate:10,
            repeat: 0

        
    })


    //키보드 입력 활성화
    this.cursors = this.input.keyboard.createCursorKeys();
    console.log(this.scoreText); // 스코어 텍스트 객체 정보 출력
    console.log(this.goldText); // 골드 텍스트 객체 정보 출력

    

}
createWave() {
    this.waveCount = 10; // 첫 웨이브에서 생성될 적의 수
    this.waveTimerEvent = this.time.addEvent({
        delay: 30000, // 30초마다 실행
        callback: () => {
            // 지정된 수의 적을 일괄적으로 생성
            for (let i = 0; i < this.waveCount; i++) {
                this.createEnemy();
            }
            console.log(`${this.waveCount}마리의 적이 웨이브로 생성되었습니다.`);

            // 다음 웨이브에서 생성될 적의 수 증가
            if ((this.waveTimerEvent.getOverallProgress() * 30) % 210 === 0) {
                this.waveCount = 10; // 210초마다 적 수 리셋
            } else {
                this.waveCount += 10;
            }
        },
        callbackScope: this,
        loop: true
    });
}


handleSkillLevelChange(data) {
    const { skillKey, level } = data;
    console.log(`UIScene에서 스킬 레벨 변경 수신: ${skillKey}, Level: ${level}`);

    // 스킬 객체 업데이트
    this.skills[skillKey] = level


// 스킬 타이머를 재설정하는 로직을 각 스킬별로 확장
switch (skillKey) {
    case 'fireEnergyBolt':
        this.adjustFireBoltTimer(level);
        break;
    case 'castThunder':
        this.adjustThunderTimer(level);
        break;
    case 'castDis':
        this.adjustDisTimer(level);
        break;
    case 'castDagger':
        this.adjustDaggerTimer(level);
        break;
    default:
        break;
}
}
    
// 예시: fireEnergyBolt 스킬에 대한 타이머 조정
adjustFireBoltTimer(level) {
    console.log(`타이머 조정 메서드 호출됨, 스킬 레벨: ${level}, 기존 타이머 존재 여부: ${this.fireBoltTimerEvent ? '존재함' : '존재하지 않음'}`);
    
    if (level > 0 ){
        if(!this.fireBoltTimerEvent) {
        console.log("새로운 파이어볼트 타이머 이벤트를 생성합니다.");
        this.fireBoltTimerEvent = this.time.addEvent({
            delay: 4000,
            callback: this.fireEnergyBolt,
            callbackScope: this,
            loop: true
        });
    } else if (level === 0 && this.fireBoltTimerEvent) {
        console.log("기존의 파이어볼트 타이머 이벤트를 제거합니다.");
        this.fireBoltTimerEvent.remove();
        this.fireBoltTimerEvent = null;
    }
    }
}

// castThunder 스킬에 대한 타이머 조정
adjustThunderTimer(level) {
    console.log(`썬더 타이머 조정: 스킬 레벨 ${level}, 타이머 존재 여부: ${this.thunderTimerEvent ? '있음' : '없음'}`);
    if (level > 0 && !this.thunderTimerEvent) {
        console.log("새로운 썬더 타이머 이벤트 생성합니다.");
        this.thunderTimerEvent = this.time.addEvent({
            delay: 6000,
            callback: this.castThunder,
            callbackScope: this,
            loop: true
        });
    } else if (level === 0 && this.thunderTimerEvent) {
        console.log("썬더 타이머 이벤트를 제거합니다.");
        this.thunderTimerEvent.remove();
        this.thunderTimerEvent = null;
    }
}

// castDis 스킬에 대한 타이머 조정
adjustDisTimer(level) {
    console.log(`디스 타이머 조정: 스킬 레벨 ${level}, 타이머 존재 여부: ${this.disTimerEvent ? '있음' : '없음'}`);
    if (level > 0 && !this.disTimerEvent) {
        console.log("새로운 디스 타이머 이벤트 생성합니다.");
        this.disTimerEvent = this.time.addEvent({
            delay: 10000,
            callback: this.castDis,
            callbackScope: this,
            loop: true
        });
    } else if (level === 0 && this.disTimerEvent) {
        console.log("디스 타이머 이벤트를 제거합니다.");
        this.disTimerEvent.remove();
        this.disTimerEvent = null;
    }
}

// 단검 투척 스킬에 대한 타이머 조정
adjustDaggerTimer(level) {
    console.log(`단검 타이머 조정: 스킬 레벨 ${level}, 타이머 존재 여부: ${this.daggerTimerEvent ? '있음' : '없음'}`);
    if (level > 0 && !this.daggerTimerEvent) {
        console.log("새로운 단검 타이머 이벤트를 생성합니다.");
        this.daggerTimerEvent = this.time.addEvent({
            delay: 1000,  // 단검 스킬의 타이머 간격 설정
            callback: this.castDagger,
            callbackScope: this,
            loop: true
        });
    } else if (level === 0 && this.daggerTimerEvent) {
        console.log("단검 타이머 이벤트를 제거합니다.");
        this.daggerTimerEvent.remove();
        this.daggerTimerEvent = null;
    }
}



toggleMenu(){
    console.log("메뉴를 토글합니다.");

    //UIScene에 메뉴 토글 이벤트를 보냅니다.
    this.scene.get('UIScene').events.emit('toggleMenu');
}

//스탯 업그레이드 함수 정의
upgradeStats(){
    const upgrades =[
        { name: 'playerDamage' , method: () => this.playerDamage += this.playerDamage*0.5},
        { name: 'playerCasting', method: () => this.playerCasting -= this.playerCasting * 0.05 },
        { name: 'playerSpeed', method: () => this.playerSpeed += this.playerSpeed * 0.5 },
        { name: 'playerDefense', method: () => this.playerDefense += this.playerDefense * 0.5 },
        { name: 'playerHp', method: () => this.playerHp += this.playerHp * 0.5 }
        

    ];
    // 무작위 업그레이드 선택
    const chosenStat = Phaser.Math.RND.pick(upgrades);
    chosenStat.method();
    console.log(`${chosenStat.name} 업그레이드됨: 현재 값 = ${this[chosenStat.name]}`);

    // 업그레이드된 값 저장
    this.game.registry.set(chosenStat.name, this[chosenStat.name]);
}


// 스킬 포인트를 추가하고, 스킬 학습 가능 여부 확인
updateSkillPoints(points) {
    // 레지스트리에서 기존 스킬 포인트 가져오기
    const existingPoints = this.game.registry.get('playerSkillPoints') || 0;
    this.playerSkillPoints = existingPoints + points;
    this.game.registry.set('playerSkillPoints', this.playerSkillPoints);
    // UIScene에 스킬 포인트 업데이트를 알립니다.
    this.events.emit('updateSkillPoints', this.playerSkillPoints);
}


//경험치 갱신 및 레벨업 메서드
updateExpBar(currentExp){
    console.log("Player Level:", this.playerLevel, "Current Exp:", currentExp);

    this.currentExp = currentExp; // 현재 경험치를 업데이트
    let expNeeded = this.expNeededPerLevel[this.playerLevel -1]; //현재 레벨에 필요한 총경험치
    console.log("Exp Needed:", expNeeded);
    //레벨업 경험치가 충분하지 반복확인
    while(this.currentExp >= expNeeded){
        this.currentExp -= expNeeded; //초가분을 계산
        this.playerLevel++; //레벨업
        this.upgradeStats(); // 스탯 업그레이드 실행
        this.updateSkillPoints(1); // 레벨업 할 때마다 스킬 포인트 1 증가
        
        this.scene.get('UIScene').toggleMenu();
        console.log(`레벨업! 현재 레벨: ${this.playerLevel}, 스킬 포인트: ${this.playerSkillPoints}`);

        

        //새 레벨에 필요한 경험치 업데이트
        
        if(this.playerLevel -1 < this.expNeededPerLevel.length){
            expNeeded = this.expNeededPerLevel[this.playerLevel-1];
        }
    
        // 레벨 텍스트 업데이트
        this.playerLevelText.setText(`Level: ${this.playerLevel}`);


    }
    let expPercent = this.currentExp / expNeeded; //현재 경험치의 비율 계산
    console.log('currentExp:', currentExp, 'expNeeded:', expNeeded, 'expPercent:', expPercent);
    

    console.log('Exp Percent', expPercent);

    this.expBar.clear();
    //경험치 바의 배경 그리기
    this.expBar.fillStyle(0x444444,1); //경험치바 배경
    this.expBar.fillRect(0,0,800, 20);  //위치와 크기설정

    //현재 경험치에 따른 바 그리기
    this.expBar.fillStyle(0xC0C0C0,1); // 경험치 색상
    this.expBar.fillRect(0, 0, 800 * expPercent, 20);

    
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
    console.log("fireEnergyBolt 함수 호출됨, 스킬 레벨: " + this.skills.fireEnergyBolt);
     // 스킬 레벨에 따라 미사일 개수를 결정
    let fireSkillLevel = this.skills.fireEnergyBolt;
    if(fireSkillLevel === 0 || this.enemies.getChildren().length === 0){
        console.log("발동할 스킬 레벨이 없거나 적이 존재하지 않습니다.");
        return;
    }

    // 가장 가까운 적을 찾음
    let closestEnemies = this.enemies.getChildren()
    .sort((a, b) => Phaser.Math.Distance.Between(this.player.x, this.player.y, a.x, a.y) - Phaser.Math.Distance.Between(this.player.x, this.player.y, b.x, b.y))
    .slice(0, fireSkillLevel); // 스킬 레벨에 따라 공격할 적의 수를 결정
    
    closestEnemies.forEach(enemy => {
    
    
    //에너지 볼트 속도 및 방향 설정
    let energyBolt = this.physics.add.sprite(this.player.x, this.player.y, 'vault').play('vault');
    energyBolt.setScale(0.2, -0.2); //에너지 볼트 크기 조절
    energyBolt.damage = this.playerDamage;// 에너지 볼트 데미지 
    energyBolt.body.setSize(energyBolt.width*0.2, energyBolt.height*0.2);
    energyBolt.body.setOffset(50, 250);
    
    this.physics.moveToObject(energyBolt, enemy, 600); //에너지볼트 속도 600
    console.log("에너지 볼트 생성 및 이동 설정");

    //에너지볼트가 적에게 닿았을 때의 처리를 위한 충돌 설정
    this.physics.add.collider(energyBolt, enemy,(bolt,hitEnemy)=>{
        
        console.log("에너지 볼트와 적 충돌 발생");        
        bolt.destroy(); //에너지 볼트 제거
        this.playerHitEnemy(bolt , hitEnemy)
    });

    //에너지 볼트의 회전 각도 설정
    let angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, enemy.x, enemy.y);
    energyBolt.rotation = angle- (5 * Math.PI / 4);
    });
}

//썬더로직
castThunder(){
    console.log("콜 라이트닝 함수 호출됨, 스킬 레벨: " + this.skills.castThunder);

    let thunderSkillLevel = this.skills.castThunder;

    // 화면에 보이는 적 중에서 스킬 레벨만큼 랜덤하게 여러 명 선택
    let visibleEnemies = this.enemies.getChildren().filter(enemy => enemy.visible);
    if (thunderSkillLevel === 0 || visibleEnemies.length === 0) {
        console.log("스킬 레벨이 0이거나, 화면에 보이는 적이 없습니다.");
        return; // 화면에 보이는 적이 없으면 함수 종료
    }

    // 선택된 적들에게 썬더 스킬 적용
    Phaser.Utils.Array.Shuffle(visibleEnemies).slice(0, thunderSkillLevel).forEach(targetEnemy => {
        let randomX = targetEnemy.x;
        let randomY = targetEnemy.y;

        let thunder = this.add.sprite(randomX, randomY, 'thunder').play('thunder');
        thunder.setScale(0.5);
        thunder.damage = this.playerDamage*1.5;


    //데미지 로직
    thunder.on('animationcomplete', ()=> {
        thunder.destroy();

     // 스킬 레벨에 따른 범위 설정
     let damageRadius = thunderSkillLevel * 10;  // 1레벨: 10, 2레벨: 20, 3레벨: 30

     // 선택된 적 주변의 모든 적들에게 데미지 적용
    this.enemies.getChildren().forEach(enemy => {
        if (Phaser.Math.Distance.Between(thunder.x, thunder.y, enemy.x, enemy.y) <= damageRadius) {
            this.playerHitEnemy(thunder, enemy);
            console.log(`썬더가 ${enemy.name}에게 피해를 입혔습니다.`);
        }
    });
    });
});
}

castDis(){
    console.log("소드스톰 함수 호출됨, 스킬 레벨: " + this.skills.castDis);

    let disSkillLevel = this.skills.castDis;

    if (disSkillLevel===0) {
        console.log("디스 스킬을 배우지 않았거나 스킬 레벨이 0입니다.");
        return; // 스킬을 배우지 않았다면 함수 종료
    }
    //사용자 위치에서 생성
    let disX =this.player.x
    let disY =this.player.y

    // 스킬 레벨에 따른 스케일과 범위 설정
    let scale = 0.5 + 0.5 * (disSkillLevel - 1); // 스케일: 0.5, 1.0, 1.5
    let damageRadius = 100 * disSkillLevel; // 범위: 100, 200, 300

    let dis = this.add.sprite(disX, disY, 'dis').play('dis');
    dis.setScale(scale);
    dis.damage = this.playerDamage*3;

    //데미지 로직
    dis.on('animationcomplete', ()=> {
        dis.destroy();

        //범위 추적 및 데미지 적용
        this.enemies.getChildren().forEach(enemy => {
            if(Phaser.Math.Distance.Between(dis.x, dis.y, enemy.x , enemy.y) <= damageRadius) {
                //적에게 데미지 적용
                this.playerHitEnemy(dis, enemy); // 수정: 플레이어가 적에게 데미지 적용
            }
        })
    })

}

//단검투척
castDagger(){

    console.log("단검투척 함수 호출됨, 스킬 레벨: " + this.skills.castDagger);
    let daggerSkillLevel = this.skills.castDagger;

    if(daggerSkillLevel === 0){
        console.log("스킬 레벨이 0입니다.");
        return; // 스킬을 배우지 않았다면 함수 종료
    }

    // 랜덤 방향을 위한 각도 설정
    let randomAngle = Phaser.Math.Between(0, 360);

    //플레이어의 위치와 방향을 기준으로 단검 생성
    let dagger = this.physics.add.sprite(this.player.x, this.player.y, 'dagger').setScale(0.1, 0.2); // 단검 크기 조절;
    dagger.setAngle(randomAngle); // 랜덤 방향 설정
    dagger.damage = this.playerDamage/3; //피해량 설정
    // 단검의 depth 설정
    dagger.setDepth(3); // depth 값을 높게 설정하여 다른 오브젝트 위에 렌더링

    // 단검 속도를 스킬 레벨에 따라 조정
    let daggerSpeed = 500 + 50 * (daggerSkillLevel - 1);
    //단검이 전진하는 로직
    this.physics.velocityFromAngle(randomAngle,daggerSpeed,dagger.body.velocity); //초기 속도 500

    // 단검의 물리 바디 크기와 위치 설정
    dagger.body.setSize(48.5, 76.8); // 단검의 크기
    dagger.body.setOffset(24.25, 100); // 단검 중앙 기준으로 오프셋 설정


    // 단검이 화면 끝에 도달하거나 적에게 닿을 때의 처리
    dagger.setCollideWorldBounds(true);
    dagger.body.onWorldBounds = true; // 화면 경계에 닿으면 이벤트 발생

    // 적과의 충돌 처리
    this.physics.add.overlap(dagger, this.enemies, (dagger, enemy) => {
        this.playerHitEnemy(dagger, enemy); // 적에게 피해를 입힘
        // 충돌 후에도 속도를 유지하여 계속 전진
        this.physics.velocityFromAngle(dagger.angle, daggerSpeed, dagger.body.velocity);
        
    });

     // 화면 경계와의 충돌 처리
    this.physics.world.on('worldbounds', (body) => {
        if (body.gameObject === dagger && body.blocked.none === false) {
            if (daggerSkillLevel === 1) {
                // 1레벨 단검은 화면 경계에 닿으면 바로 파괴
                dagger.destroy();
            } else if (daggerSkillLevel > 1 && (!dagger.bounceCount || dagger.bounceCount < daggerSkillLevel - 1)) {
                // 2레벨 이상 단검은 화면 경계에 닿을 때 방향을 반대로 하고 계속 이동
                if (!dagger.bounceCount) dagger.bounceCount = 0;
                dagger.bounceCount++;
                dagger.setAngle(dagger.angle + 180);
                this.physics.velocityFromAngle(dagger.angle, daggerSpeed, dagger.body.velocity);
            } else {
                // 지정된 횟수를 초과하면 단검 파괴
                dagger.destroy();
            
            }
        }
    });

    
    }


//hp바 그리기
updateHpBar() {
    this.hpBar.clear();
    this.hpBar.fillStyle(0xff0000,1) //빨간색으로 바탕 그리기
    this.hpBar.fillRect(360,345,80,10)  //바탕 위치와 크기 설정
    
    this.hpBar.fillStyle(0x00ff00,1) //초록색으로 현재 hp그리기
    let hpWidth =Math.max(0, (this.playerHp / this.maxHp) * 80);  //hp비율에 따라 너비계산
    this.hpBar.fillRect(360,345,hpWidth,10); //현재 hp 위치와 크기 설정

     // HP가 0이하로 내려가면 게임 오버 처리
    if (this.playerHp <= 0) {
        this.playerHp = 0; // HP를 0으로 설정
        this.gameOver(); // 게임 오버 함수 호출
    }
}

// 게임 오버 화면 표시
gameOver() {

    

    // 검은색 배경 추가
    let background = this.add.rectangle(this.sys.game.config.width / 2, this.sys.game.config.height / 2, this.sys.game.config.width, this.sys.game.config.height, 0x000000)
    .setOrigin(0.5).setDepth(5);
    let gameOverText = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, '게임 오버', {
        fontSize: '40px',
        fill: '#ff0000'
    }).setOrigin(0.5).setDepth(5);

    // 확인 버튼 텍스트
    let restartBtn = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2 + 40, '확인', {
        fontSize: '32px',
        fill: '#ffffff',
        backgroundColor: '#000000'
    }).setOrigin(0.5).setPadding(10).setInteractive({ useHandCursor: true }).setDepth(5);

    // this.physics.pause(); // 게임 물리 엔진 일시 정지
    // this.input.keyboard.destroy(); // 키보드 입력 비활성화

    // 버튼 이벤트 리스너
    restartBtn.on('pointerdown', () => {
        console.log("재시작 버튼 클릭됨."); // 버튼이 클릭될 때 이 로그가 출력되는지 확인
        // GameScene에서 골드 정보를 registry에 저장하는 함수 호출
        this.scene.get('GameScene').saveGoldToRegistry();                
        this.scene.start('StartScene'); // StartScene으로 이동
        this.destroyModal();
        this.destroy()
    });

    this.modal = this.add.group([restartBtn, background, gameOverText]);

    
}
destroyModal() {
    if (!this.modal) return;
    this.modal.destroy(true);
    this.modal = null;
}

destroy() {
    this.scene.remove('GameScene');
}    

//자동 공격 실행 로직
autoAttack(){
    if(this.player && !this.isAttacking){  //플레이어가 존재하고 현재 공격중이 아닐때만 실행
    console.log("기본공격 무한반복");
    this.isAttacking = true;
    // 플레이어의 방향을 고려하여 애니메이션 위치 조정
    const direction = this.lastDirection === 'left' ? -1 : 1;
     // 플레이어가 왼쪽을 보고 있다면 -1, 오른쪽을 보고 있다면 1
    
    //공격 애니메이션 스프라이트 생성 및 위치 조정
    console.log(direction, this.lastDirection);
    let attackX = this.player.x + (50 * direction); // 공격 시작 위치 동적 조정
    let attackAnim = this.physics.add.sprite(attackX, this.player.y+20, 'playerAttack').setScale(1);
    attackAnim.setFlipX(this.lastDirection !=='left'); // 플레이어의 방향에 따라 애니메이션 반전
    attackAnim.play('playerAttack'); // 공격 애니메이션 재생
    attackAnim.setAlpha(0.5); // 애니메이션을 투명화하여 잔상 효과
    attackAnim.damage = this.playerDamage; // 여기에 damage 속성을 추가

    // 히트박스 크기와 위치 조정
    attackAnim.body.setSize(60, 60); // 히트박스의 너비와 높이를 설정
    attackAnim.body.setOffset(50, 25); // 히트박스의 위치를 조정
    
    //충돌 감시 설정
    this.physics.add.overlap(attackAnim, this.enemies, (attackAnim, enemy)=>{
        if(enemy && !enemy.isHit && enemy.active){
            this.playerHitEnemy(attackAnim,enemy);
        }
    });
    
    // 공격 돌진 애니메이션: 플레이어 위치에서 앞으로 살짝 전진
    this.tweens.add({
        targets: attackAnim,
        x: this.player.x + (100 * direction), // 돌진 방향과 거리 동적 조정
        y: this.player.y + 20, 
        ease: 'Power1', // 이동 애니메이션 효과
        duration: 500, // 500 밀리초 동안 이동
        onComplete: () => {
            console.log("공격 애니메이션 완료");
            attackAnim.destroy(); // 애니메이션 재생 후 스프라이트 제거
            this.isAttacking = false;
        }
    });
    
}
}





createEnemy(initialType) {
    //화면의 가장자리에서 랜덤 위치 선택
    let x = Phaser.Math.Between(0,800);
    let y = Phaser.Math.Between(0,600);
    //적의 기본 속성 및 스프라이트 크기 설정
    let spriteKey, health, speed, scale,animMove, animHit, animDie;
    

     // 시간에 따라 강한 적이 더 자주 나타나도록 확률 조정
    let elapsed = this.scene.get('UIScene').elapsed;
    let type = initialType; // 초기 타입 사용, 필요에 따라 수정 가능
     if (elapsed < 30) { // 30초 이내
        type = Phaser.Math.RND.weightedPick(['default']);
     } else if (elapsed < 60) { // 1분 이내
        type = Phaser.Math.RND.weightedPick(['default','default','W']);
     } else if (elapsed < 90) { // 1분 30초 이내
        type = Phaser.Math.RND.weightedPick(['default','default','W','w','Z']);
     } else if (elapsed < 120) { // 2분 이내
        type = Phaser.Math.RND.weightedPick(['default','default','W','w','Z','Z']);
     } else if (elapsed < 150) { // 2분 20초 이내
        type = Phaser.Math.RND.weightedPick(['default','default','W','w','Z','Z','O']);  
     } else if (elapsed < 180) { // 3분 이내
        type = Phaser.Math.RND.weightedPick(['default','default','W','w','Z','Z','O','O']);             
     } else { // 3분 이후
        type = Phaser.Math.RND.weightedPick(['default','W', 'Z', 'O', 'T']);
    }

    
    switch(type) {
        case 'W':
            spriteKey = 'enemyW0';
            health = 10;
            speed = 50;
            scale = 3;
            animMove = 'enemyWMove';
            animHit = 'enemyWHit';
            animDie = 'enemyWDie';
            break;
        
        case 'Z':
            spriteKey = 'enemyZ0';
            health = 15;
            speed = 60;
            scale = 3;
            animMove = 'enemyZMove';
            animHit = 'enemyZHit';
            animDie = 'enemyZDie';
            break;
        case 'O':
            spriteKey = 'enemyT0';
            health = 20;
            speed = 70;
            scale = 3.5;
            animMove = 'enemyTMove';
            animHit = 'enemyTHit';
            animDie = 'enemyTDie';
            break;    
        default:
            spriteKey = 'enemy0';
            health = 5;
            speed =40; 
            scale = 3; 
            animMove = 'enemyMove'; 
            animHit = 'enemyHit';
            animDie = 'enemyDie'; 

    }

    // 시간에 따른 강화 계수 적용
    let timeFactor = Math.floor(elapsed/ 180); // 게임 시작 후 지난 시간(분) 계산
    health += 10 * timeFactor; // 매 3분 마다 체력 10 증가
    speed += 10 * timeFactor; // 매 3분 마다 속도 10 증가
    

    //적 객체 생성 및 설정
    let enemy = this.physics.add.sprite(x, y, spriteKey);
    enemy.setScale(scale);
    enemy.setDepth(1);
    enemy.health = health;
    enemy.speed =speed;
    enemy.animMove = animMove;
    enemy.animHit = animHit;
    enemy.animDie = animDie;
    enemy.play(animMove);
    
    //적의 이동 방향을 플레이어(중앙) 쪽으로 설정
    let angle = Phaser.Math.Angle.Between(x,y,this.player.x, this.player.y);
    enemy.rotation = angle;

    //적의 속도와 방향 설정
    this.physics.moveToObject(enemy, this.player , enemy.speed);

    //플레이어의 공격에 피격당할 수 있도록 충돌 처리
    this.physics.add.overlap(this.player, enemy, this.playerHitEnemy, null, this);

    
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
    this.physics.add.overlap(this.playerHitBox, gold, this.collectGold, null, this);
}

// 골드와 플레이어의 충돌을 감지하고, 골드를 주운 경우의 처리를 수행합니다.
checkGoldCollision() {
    this.physics.overlap(this.playerHitBox, this.goldGroup, (playerHitBox, gold) => {
        gold.destroy(); // 골드를 제거합니다.
        this.collectGold(); // 골드를 주운 후 처리를 합니다.
    }, null, this);
}


// 플레이어가 골드를 획득했을 때 호출되는 함수
collectGold(playerHitBox, gold) {
   // 골드 수를 증가시키고, 골드 텍스트를 업데이트합니다.
    this.updateGold(1); // 골드를 획득할 때마다 1을 증가시킴
    this.currentExp += 10;
    gold.destroy();
    this.updateExpBar(this.currentExp); // 업데이트된 경험치로 경험치 바 업데이트
}


//플레이어가 적을 공격했을 때 실행되는 함수
playerHitEnemy(attacker, enemy){

    if(!enemy.isHit){//적이 피격되지 않았다면
        enemy.isHit = true; //피격 상태로 변경
        //적의 에너지 감소
        enemy.health -= attacker.damage; //체력 감소 

        // 데미지 텍스트 생성 및 표시
        this.showDamageText(enemy.x, enemy.y, attacker.damage);

        if(enemy.health <=0){
            // 체력이 0 이하이면 사망 애니메이션 재생 후 제거
            enemy.play(enemy.animDie);
            enemy.once('animationcomplete', () => {
                this.createGold(enemy.x,enemy.y);
                this.updateScore(1); //적하나 죽을때마다 1점 증가
                enemy.destroy();
                
            });
    }else{
         // 피격 애니메이션 재생
        enemy.play(enemy.animHit);
        enemy.once('animationcomplete', () => {
             // 피격 애니메이션 완료 후 이동 애니메이션으로 복귀
            enemy.isHit = false; //피격 상태 해제
            enemy.play(enemy.animMove); // 기본 이동 애니메이션으로 복귀
    
    });
    }

    //피격 상태 해제 타이머 설정
    this.time.delayedCall(500, ()=> {
        if(enemy.active){//적이 아직 게임에 존재하는지 확인
            enemy.isHit = false;
        }
    }, [], this);
}
}

// 데미지 텍스트 표시 함수
showDamageText(x, y, damage) {
    // 데미지 값을 정수로 반올림
    let roundedDamage = Math.round(damage);

    let damageText = this.add.text(x, y, roundedDamage.toString(), {
        fontSize: '18px',
        fill: '#ffffff',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // 텍스트를 잠시 동안 보여준 다음 사라지게 함
    this.tweens.add({
        targets: damageText,
        y: y - 30,
        alpha: 0,
        duration: 800,
        ease: 'Cubic.easeOut',
        onComplete: () => {
            damageText.destroy();
        }
    });
}







update() {
    // 움직임 상태와 마지막 방향 초기화
    let isMoving = false;
    // let lastDirection = this.lastDirection || 'left';
    
    // 방향키 입력에 따른 플레이어와 환경의 이동 처리
    if (this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown) {
        isMoving = true; // 움직임 상태 활성화
        this.handleDirectionalMovement(); // 방향키에 따른 움직임 처리 함수 호출
    }
    
    // 움직임이 없을 경우 플레이어의 애니메이션과 방향 처리
    if (!isMoving) {
        this.handlePlayerIdleState(); // 플레이어의 대기 상태 처리 함수 호출
    }

    // 적들이 플레이어를 향해 이동하도록 처리
    this.enemiesChasePlayer();

    // 플레이어와 적의 충돌 처리
    this.handlePlayerEnemyCollision();

    
}

// 방향키 입력에 따른 움직임 처리
handleDirectionalMovement() {
    let xAdjustment = 0;
    let yAdjustment = 0;
    let scale = 1;


    // 좌우 이동 처리
    if (this.cursors.left.isDown) {
        this.lastDirection = 'left';
        xAdjustment = 2; // 왼쪽 이동
        this.player.direction = 1; // 왼쪽 방향
        scale=1;
    } else if (this.cursors.right.isDown) {
        this.lastDirection = 'right';
        xAdjustment = -2; // 오른쪽 이동
        this.player.direction = -1; // 오른쪽 방향, 이미지 반전
        scale=-1;
    }

    // 위나 아래로 이동할 때는 마지막 좌우 이동 방향에 따라 이미지 반전 상태 결정
    if (this.cursors.up.isDown || this.cursors.down.isDown) {
        yAdjustment = this.cursors.up.isDown ? 2 : -2; // 위 또는 아래 이동
        

        // 마지막으로 기록된 좌우 방향에 따라 scale 값을 결정
        if (this.lastDirection === 'left') {
            scale = 1; // 왼쪽 이동이 마지막이었으면 이미지 반전 없음
        } else if (this.lastDirection === 'right') {
            scale = -1; // 오른쪽 이동이 마지막이었으면 이미지 반전
        }
    }

    this.moveObjects(xAdjustment, yAdjustment); // 객체들 이동 처리
    this.player.anims.play('walkLeft', true); // 플레이어 애니메이션 재생
    this.player.setScale(scale, 1); // 플레이어 스케일 조정
}

// 객체 이동 처리 함수
moveObjects(xAdjustment, yAdjustment) {
    // 적과 금화 객체 이동
    this.enemies.getChildren().forEach(function(enemy) {
        enemy.x += xAdjustment;
        enemy.y += yAdjustment;
    });

    this.goldGroup.getChildren().forEach(function(gold) {
        gold.x += xAdjustment;
        gold.y += yAdjustment;
    });

    // 배경 이동 처리
    this.background.tilePositionX -= xAdjustment;
    this.background.tilePositionY -= yAdjustment;
}

// 플레이어 대기 상태 처리 함수
handlePlayerIdleState() {
    this.player.anims.stop(); // 애니메이션 정지
    

     // 마지막 방향이 'right'일 때 기본 이미지를 반전시킴
    if (this.lastDirection === 'right') {
        this.player.setTexture('player', 0); // 오른쪽을 바라보는 기본 이미지로 설정
    } else { // 'left' 또는 기타 방향일 때
        this.player.setTexture('player', 0); // 왼쪽을 바라보는 기본 이미지로 설정
    }
}

// 적이 플레이어를 향해 이동하는 로직
enemiesChasePlayer() {
    this.enemies.getChildren().forEach((enemy) => {
        var angle = Phaser.Math.Angle.Between(enemy.x, enemy.y, this.player.x, this.player.y);
        
        // 적의 속도 벡터 설정하여 플레이어를 향해 이동
        enemy.body.velocity.x = Math.cos(angle) * enemy.speed; // X 방향 속도
        enemy.body.velocity.y = Math.sin(angle) * enemy.speed; // Y 방향 속도
    });
}

// 플레이어와 적의 충돌 처리 로직
handlePlayerEnemyCollision() {
    this.physics.overlap(this.playerHitBox, this.enemies, (playerHitBox, enemy) => {
        if (!playerHitBox.isHit) { // 플레이어가 피격 상태가 아닐때만 처리
            console.log("플레이어가 적에게 피격됨");
            this.playerHp -= 5; // 플레이어 HP 감소
            console.log(`플레이어 HP: ${this.playerHp}`);
            this.updateHpBar(); // HP 바 업데이트

            playerHitBox.isHit = true; // 플레이어 피격 상태로 변경

            this.player.setTint(0xff0000); // 플레이어를 빨간색으로 변경
            this.cameras.main.shake(300, 0.01); // 짧은 떨림 효과
            
            // 피격 후 무적 시간 설정
            this.time.addEvent({
                delay: 3000, // 3초
                callback: () => {
                    playerHitBox.isHit = false; // 플레이어 무적 시간 종료
                    this.player.clearTint(); // 플레이어 색상 초기화
                }
            });
        }
    }, null, this);
}



saveGoldToRegistry(){
    this.game.registry.set('gold', this.gold);
    console.log(this.gold);
}

}