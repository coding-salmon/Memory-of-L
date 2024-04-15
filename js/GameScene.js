
class GameScene extends Phaser.Scene{
    constructor(){
        super({ key: 'GameScene'});
        this.playerSkillPoints = 0; // 플레이어의 스킬 포인트
        this.skillsLearned  = { // 배운 스킬 여부
            fireEnergyBolt: false,
            castThunder: false,
            castDis: false
            };
        this.enemies = null; // 전역 변수로 선언합니다.
        this.player = null; // player 전역 변수로 선언
        this.playerHp = 100; // 플레이어의 초기 HP
        this.maxHp = 100; // 플레이어의 최대 HP
        this.playerDamage = 5; //플레이어가 적에게 입히는 데미지의 기본값입니다.
        this.score = 0; //점수
        this.gold  = 0; // 골드
        this.goldGroup = null; // 골드 그룹
        this.menuGroup = null; //메뉴 그룹
        this.menuOpen = false; // 메뉴 창이 열려 있는지 여부를 나타내는 변수 추가
        this.playerLevel = 1; //초기 레벨은 1로 설정
        this.playerMaxLevel = 52; //최대 레벨
        this.exp = 0;
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

    //적w 유닛 생성
    this.load.image('enemyW0', '/node_modules/phaser/assets/Enemy1/w0.png')
    this.load.image('enemyW1', '/node_modules/phaser/assets/Enemy1/w1.png')
    this.load.image('enemyW2', '/node_modules/phaser/assets/Enemy1/w2.png')
    this.load.image('enemyW3', '/node_modules/phaser/assets/Enemy1/w3.png')
    this.load.image('enemyW4', '/node_modules/phaser/assets/Enemy1/w4.png')
    this.load.image('enemyW5', '/node_modules/phaser/assets/Enemy1/w5.png')
    //적w 피격 이미지
    this.load.image('enemyW6', '/node_modules/phaser/assets/Enemy1/w6.png')
    // 적w 유닛 죽을 때
    this.load.image('enemyW7', '/node_modules/phaser/assets/Enemy1/w7.png')


    //적t 유닛생성
    this.load.image('enemyT0', '/node_modules/phaser/assets/Enemy2/t0.png')
    this.load.image('enemyT1', '/node_modules/phaser/assets/Enemy2/t1.png')

    //적 t 피격이미지
    this.load.image('enemyT2', '/node_modules/phaser/assets/Enemy2/t2.png')
    //적 t 죽었을때 
    this.load.image('enemyT3', '/node_modules/phaser/assets/Enemy2/t3.png')

 


    //적 z 생성
    this.load.image('enemyZ0', '/node_modules/phaser/assets/Enemy3/z0.png')
    this.load.image('enemyZ1', '/node_modules/phaser/assets/Enemy3/z1.png')
    this.load.image('enemyZ2', '/node_modules/phaser/assets/Enemy3/z2.png')
    this.load.image('enemyZ3', '/node_modules/phaser/assets/Enemy3/z3.png')
    this.load.image('enemyZ4', '/node_modules/phaser/assets/Enemy3/z4.png')
    this.load.image('enemyZ5', '/node_modules/phaser/assets/Enemy3/z5.png')
    //적 z 피격
    this.load.image('enemyZ6', '/node_modules/phaser/assets/Enemy3/z6.png')

    //적 z 죽었을때
    this.load.image('enemyZ7', '/node_modules/phaser/assets/Enemy3/z7.png')






    //적 o 생성
    this.load.image('enemyO0','/node_modules/phaser/assets/Enemy4/o0.png')
    this.load.image('enemyO1','/node_modules/phaser/assets/Enemy4/o1.png')
    this.load.image('enemyO2','/node_modules/phaser/assets/Enemy4/o2.png')
    this.load.image('enemyO3','/node_modules/phaser/assets/Enemy4/o3.png')
    this.load.image('enemyO4','/node_modules/phaser/assets/Enemy4/o4.png')
    this.load.image('enemyO5','/node_modules/phaser/assets/Enemy4/o5.png')
    //적 o 피격
    this.load.image('enemyO6','/node_modules/phaser/assets/Enemy4/o6.png')
    //적 o 죽었을때
    this.load.image('enemyO7','/node_modules/phaser/assets/Enemy4/o7.png')


  


    //골드 이미지 생성
    this.load.image('gold','/node_modules/phaser/assets/gold/gold1.png')

    //파이어볼트 이미지 생성
    this.load.image('vault0', '/node_modules/phaser/assets/fire/fire0.png')
    this.load.image('vault1', '/node_modules/phaser/assets/fire/fire1.png')
    this.load.image('vault2', '/node_modules/phaser/assets/fire/fire2.png')
    this.load.image('vault3', '/node_modules/phaser/assets/fire/fire3.png')
    this.load.image('vault4', '/node_modules/phaser/assets/fire/fire4.png')


    //썬더 이미지 생성
    this.load.image('thunder0', '/node_modules/phaser/assets/thunder/thunder0.png');
    this.load.image('thunder1', '/node_modules/phaser/assets/thunder/thunder1.png');
    this.load.image('thunder2', '/node_modules/phaser/assets/thunder/thunder2.png');

    //dis 이미지 생성
    this.load.image('dis0', '/node_modules/phaser/assets/dis/dis0.png');
    this.load.image('dis1', '/node_modules/phaser/assets/dis/dis1.png');
    this.load.image('dis2', '/node_modules/phaser/assets/dis/dis2.png');
    this.load.image('dis3', '/node_modules/phaser/assets/dis/dis3.png');
    this.load.image('dis4', '/node_modules/phaser/assets/dis/dis4.png');
    this.load.image('dis5', '/node_modules/phaser/assets/dis/dis5.png');
    this.load.image('dis6', '/node_modules/phaser/assets/dis/dis6.png');
    this.load.image('dis7', '/node_modules/phaser/assets/dis/dis7.png');

    //단검 이미지 생성
    this.load.image('dagger', '/node_modules/phaser/assets/dagger/dagger.png');


}

create(){
    //여기서 게임에 필요한 초기화 작업을 합니다.
    console.log("게임 초기화 시작")


    // UIScene을 실행합니다.
    this.scene.launch('UIScene');

    //UIScene과의 통신을 위해 이벤트를 설정합니다.
    this.events.on('toggleMenu', this.toggleMenu, this);
    


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

    // 골드 텍스트 생성 및 스타일 설정
    this.goldText = this.add.text(700, 20, 'Gold: 0', {
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

    //플레이어 케릭터 생성 (화면 중앙에 고정)
    this.player = this.physics.add.sprite(400,300, 'player');
    //플레이어의 depth 값을 배경보다 높게 설정
    this.player.setDepth(1);
    this.player.displayWidth=96;
    this.player.displayHeight=114;

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
        repeat:0
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
    repeat: 0
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
    repeat: 0
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
    repeat: 0
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

    //자동 공격 타이머 이벤트 설정
    this.time.addEvent({
        delay:5000, //5초마다
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
    //에너지 볼트 자동 공격
    this.time.addEvent({
        delay: 5000, //5초마다
        callback: () => {
            if (this.skillsLearned.fireEnergyBolt) {
                this.fireEnergyBolt();
            }
        },
        callbackScope:this,
        loop: true // 무한반복
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
    //썬더 공격 로직
    this.time.addEvent({
        delay: 5000, // 5초마다
        callback: ()=>{
            if (this.skillsLearned.thunder) {
                this.castThunder();
            }
        },
        callbackScope: this,
        loop: true
    });

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
     //디스 공격 로직
    this.time.addEvent({
        delay: 7000, // 7초마다
        callback: ()=>{
            if(this.SkillsLeaned.dis){
                this.castDis();
            }
        },
        callbackScope: this,
        loop: true
    });

    //키보드 입력 활성화
    this.cursors = this.input.keyboard.createCursorKeys();
    console.log(this.scoreText); // 스코어 텍스트 객체 정보 출력
    console.log(this.goldText); // 골드 텍스트 객체 정보 출력

    

}

toggleMenu(){
    console.log("메뉴를 토글합니다.");

    //UIScene에 메뉴 토글 이벤트를 보냅니다.
    this.scene.get('UIScene').events.emit('toggleMenu');
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
        this.playerSkillPoints++; // 스킬 포인트 증가
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
    let energyBolt = this.physics.add.sprite(this.player.x, this.player.y, 'vault').play('vault');
    energyBolt.setScale(0.2, -0.2); //에너지 볼트 크기 조절
    energyBolt.damage = 5;// 에너지 볼트 데미지 
    
    this.physics.moveToObject(energyBolt, closestEnemy, 600); //에너지볼트 속도 300

    //에너지볼트가 적에게 닿았을 때의 처리를 위한 충돌 설정
    this.physics.add.collider(energyBolt, this.enemies,(bolt,enemy)=>{
        bolt.destroy(); //에너지 볼트 제거
        this.playerHitEnemy(closestEnemy , energyBolt.damage)
    })

    //에너지 볼트의 회전 각도 설정
    let angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, closestEnemy.x, closestEnemy.y);
    energyBolt.rotation = angle- (5 * Math.PI / 4);
}

//썬더로직
castThunder(){
     // 화면에 보이는 적 중에서 랜덤하게 하나 선택
    let visibleEnemies = this.enemies.getChildren().filter(enemy => enemy.visible);
    if (visibleEnemies.length === 0) {
         return; // 화면에 보이는 적이 없으면 함수 종료
    }

    let targetEnemy = Phaser.Math.RND.pick(visibleEnemies);
    let randomX = targetEnemy.x;
    let randomY = targetEnemy.y;

    let thunder = this.add.sprite(randomX, randomY, 'thunder').play('thunder');
    thunder.setScale(0.5);
    thunder.damage = 10;

    //데미지 로직
    thunder.on('animationcomplete', ()=> {
        thunder.destroy();

        //범위 추적 및 데미지 적용
        this.enemies.getChildren().forEach(enemy => {
            if(Phaser.Math.Distance.Between(thunder.x, thunder.y, enemy.x , enemy.y) <= 10) {
                this.playerHitEnemy(enemy, thunder.damage);
                
            }
        })
    })

}

castDis(){
    //사용자 주위에서 랜덤 위치 생성
    let disX =this.player.x
    let disY =this.player.y

    let dis = this.add.sprite(disX, disY, 'dis').play('dis');
    dis.setScale(0.5);
    dis.damage = 0;

    //데미지 로직
    dis.on('animationcomplete', ()=> {
        dis.destroy();

        //범위 추적 및 데미지 적용
        this.enemies.getChildren().forEach(enemy => {
            if(Phaser.Math.Distance.Between(dis.x, dis.y, enemy.x , enemy.y) <= 300) {
                //적에게 데미지 적용
                this.playerHitEnemy(enemy, dis.damage); // 수정: 플레이어가 적에게 데미지 적용
            }
        })
    })

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
    // 플레이어의 방향을 고려하여 애니메이션 위치 조정
    const direction = this.player.flipX ? -1 : 1; // 플레이어가 왼쪽을 보고 있다면 -1, 오른쪽을 보고 있다면 1
    let attackAnim = this.add.sprite(this.player.x, this.player.y, 'playerAttack').setScale(1);
    attackAnim.setFlipX(this.player.flipX); // 플레이어의 방향에 따라 애니메이션 반전
    attackAnim.play('playerAttack'); // 공격 애니메이션 재생

    // 공격 돌진 애니메이션: 플레이어 위치에서 앞으로 살짝 전진
    this.tweens.add({
        targets: attackAnim,
        x: this.player.x - 60 * direction, // 30픽셀 전방으로 이동
        y: this.player.y + 10 * direction,
        ease: 'Power1', // 이동 애니메이션 효과
        duration: 200, // 200 밀리초 동안 이동
    });

    // 공격 애니메이션 완료 후 공격 처리 및 스프라이트 제거
    attackAnim.on('animationcomplete', () => {
        this.isAttacking = false;
        console.log("공격 애니메이션 완료");
        this.checkAttackHit(); // 공격 범위 내 적을 검사하고 공격 처리
        attackAnim.destroy(); // 애니메이션 재생 후 스프라이트 제거
    });
}
}

// 공격 범위 내 적을 검사하고 공격 처리하는 함수
checkAttackHit(attackAnim){

    // 공격 애니메이션의 충돌 영역
    const attackRange = new Phaser.Geom.Rectangle(
        attackAnim.x - attackAnim.width / 2,
        attackAnim.y - attackAnim.height / 2,
        attackAnim.width,
        attackAnim.height
    );
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

        // 적의 충돌 영역
        const enemyBounds = enemy.getBounds();

        // 플레이어와 적 사이의 거리 계산
        const distance = Phaser.Math.Distance.Between(playerX, playerY, enemyX, enemyY);

        // 콘솔에 거리 정보 출력
        console.log(`플레이어와 적 간의 거리: ${distance}`);

        // 공격 범위 내에 있는 경우에만 데미지를 적용
        if (Phaser.Geom.Rectangle.Intersects(attackRange, enemyBounds)) {
            this.playerHitEnemy(enemy, this.playerDamage); // 공격 범위 내 적을 검사하고 공격 처리
        }
    });
}





createEnemy(initialType) {
    //화면의 가장자리에서 랜덤 위치 선택
    let x = Phaser.Math.Between(0,800);
    let y = Phaser.Math.Between(0,600);
    //적의 기본 속성 및 스프라이트 크기 설정
    let spriteKey, health, speed, scale,animMove, animHit, animDie;
    

     // 시간에 따라 강한 적이 더 자주 나타나도록 확률 조정
    let elapsed = this.time.now / 1000; // 초 단위로 경과 시간 계산
    let type = initialType; // 초기 타입 사용, 필요에 따라 수정 가능
     if (elapsed < 30) { // 30초 이내
        type = Phaser.Math.RND.weightedPick(['default']);
     } else if (elapsed < 60) { // 1분 이내
        type = Phaser.Math.RND.weightedPick(['default','default','W']);
     } else if (elapsed < 90) { // 1분 30초 이내
        type = Phaser.Math.RND.weightedPick(['default','default','W','w','Z']);
     } else if (elapsed < 120) { // 2분 이내
        type = Phaser.Math.RND.weightedPick(['default','default','W','w','Z','Z']);
     } else if (elapsed < 180) { // 3분 이내
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
            speed = 55;
            scale = 3;
            animMove = 'enemyZMove';
            animHit = 'enemyZHit';
            animDie = 'enemyZDie';
            break;
        case 'O':
            spriteKey = 'enemyT0';
            health = 10;
            speed = 60;
            scale = 3.5;
            animMove = 'enemyTMove';
            animHit = 'enemyTHit';
            animDie = 'enemyTDie';
            break;    
        default:
            spriteKey = 'enemy0';
            health = 5;
            speed =60; 
            scale = 3; 
            animMove = 'enemyMove'; 
            animHit = 'enemyHit';
            animDie = 'enemyDie'; 

    }

    // 시간에 따른 강화 계수 적용
    let timeFactor = Math.floor(this.time.now / 100000); // 게임 시작 후 지난 시간(분) 계산
    health += 5 * timeFactor; // 매 5분마다 체력 20 증가
    speed += 5 * timeFactor; // 매 분마다 속도 5 증가
    

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
    this.currentExp += 10;
    this.updateExpBar(this.currentExp); // 업데이트된 경험치로 경험치 바 업데이트
    
    
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
            enemy.isHit = false;
            enemy.play(enemy.animMove);
    
        
        
    });
    }
}
}



update() {
    // 움직임 상태와 마지막 방향 초기화
    let isMoving = false;
    let lastDirection = this.lastDirection || 'left';
    
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
        enemy.body.velocity.x = Math.cos(angle) * 60; // X 방향 속도
        enemy.body.velocity.y = Math.sin(angle) * 60; // Y 방향 속도
    });
}

// 플레이어와 적의 충돌 처리 로직
handlePlayerEnemyCollision() {
    this.physics.overlap(this.player, this.enemies, (player, enemy) => {
        if (!enemy.isHit) { // 적이 피격되지 않았다면
            console.log("플레이어가 적에게 피격됨");
            enemy.isHit = true; // 피격 상태로 변경
            this.playerHp -= 10; // 플레이어 HP 감소
            console.log(`플레이어 HP: ${this.playerHp}`);
            this.updateHpBar(); // HP 바 업데이트

            // 피격 후 무적 시간 설정
            this.time.addEvent({
                delay: 300, // 0.3초
                callback: () => {
                    enemy.isHit = false; // 무적 시간 종료
                }
            });
        }
    }, null, this);
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
    scene:[GameScene,UIScene],
    
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