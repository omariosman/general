import Phaser from "phaser";
import Shoot from "./shoot";
import Card from "./Card";
import Dragon from "./Dragon";
import Defense from "./Defense";
import User from "./User";
import Match from "./Match";
import CardSprite from "./CardSprite";
import DragonSprite from "./DragonSprite";
import HealthBar from "./HealthBar";
import Shooteffect from "./ShootEffect";
import Healeffect from "./HealEffect";
import { casperSigner } from "./game";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
import WeightedRandom from "./WeightedRandom";
import io from "socket.io-client";

// import { randomStart } from "./Scene1";
export let inGame = false;

export class Scene2 extends Phaser.Scene {
  constructor() {
    super("gamePlay");
  }

  init(check) {
    this.flag = check.flag;
    this.playerwin = check.playerwin;
    //this.flag = true;
    //this.playerwin = false;
    console.log("flag", this.flag);
    console.log("playerwinn: ", this.playerwin);
  }

  preload() {
    console.log("inside scene 2");
    //load temple (background)
    this.load.image("temple_background", "./assets/images/bg/environment.png");
    this.load.image("temple_background2", "./assets/images/bg/background.jpg");
    this.load.image("temple_background3", "./assets/images/bg/background2.jpg");

    //load current dragon spot
    this.load.image("current_dragon", "./assets/images/CurrentDragonSpot.png");

    //load deck
    this.load.image("deck", "./assets/images/CardsBG.png");

    //load end turn button
    this.load.image("end_turn_btn", "./assets/images/Turn.png");

    //load dragon level
    //load dragon level
    //this.load.image("dragon_level2", "./assets/images/Count.png");

    //NFT
    this.load.image("NFT1", "./assets/images/NFTs/1.png");
    this.load.image("NFT2", "./assets/images/NFTs/3.png");

    //create dragons and give it the src of the dragons
    this.dragon_user1 = new Dragon(
      "./assets/images/dragons/blue_dragon.png",
      4,
      100
    );
    this.dragon_user2 = new Dragon(
      "./assets/images/dragons/red_dragon.png",
      5,
      100
    );

    this.dragon_user1.assignDragonKey(this, this.dragon_user1.getDragonNFT());
    this.dragon_user2.assignDragonKey(this, this.dragon_user2.getDragonNFT());

    //set attack anims keys and paths
    this.dragon_user1.setAttackSpritesheetKey("dragon1_attack_spritesheet");
    this.dragon_user1.setAttackAnimKey("dragon1_attack_anim_key");
    this.dragon_user1.setAttackAnimPath(
      "./assets/spritesheets/blue_dragon_attack.png"
    );
    //this.dragon_user1.loadSpritesheets(this);

    this.dragon_user2.setAttackSpritesheetKey("dragon2_attack_spritesheet");
    this.dragon_user2.setAttackAnimKey("dragon2_attack_anim_key");
    this.dragon_user2.setAttackAnimPath(
      "./assets/spritesheets/red_dragon_attack.png"
    );
    //this.dragon_user2.loadSpritesheets(this);

    //set idle anims keys and paths
    this.dragon_user1.setIdleSpritesheetKey("dragon1_idle_spritesheet");
    this.dragon_user1.setIdleAnimKey("dragon1_idle_anim_key");
    this.dragon_user1.setIdleAnimPath(
      "./assets/spritesheets/blue_dragon_idle.png"
    );

    //set death anims keys and paths
    this.dragon_user1.setDeathSpritesheetKey("dragon1_death_spritesheet");
    this.dragon_user1.setDeathAnimKey("dragon1_death_anim_key");
    this.dragon_user1.setDeathAnimPath(
      "./assets/spritesheets/Blue_Death_Spritesheet.png"
    );

    this.dragon_user1.loadSpritesheets(this);

    this.dragon_user2.setIdleSpritesheetKey("dragon2_idle_spritesheet");
    this.dragon_user2.setIdleAnimKey("dragon2_idle_anim_key");
    this.dragon_user2.setIdleAnimPath(
      "./assets/spritesheets/red_dragon_idle.png"
    );

    this.dragon_user2.setDeathSpritesheetKey("dragon2_death_spritesheet");
    this.dragon_user2.setDeathAnimKey("dragon2_death_anim_key");
    this.dragon_user2.setDeathAnimPath(
      "./assets/spritesheets/Red_Death_Spritesheet.png"
    );

    this.dragon_user2.loadSpritesheets(this);

    //load CTO
    this.load.image("cto", "./assets/images/CTO.png");
    //load shoot asset
    Shoot.shoot_load_assets(this);
    Shooteffect.shoot_effect_load_assets(this);
    Healeffect.heal_effect_load_assets(this);

    //create users
    this.user1 = new User("Ahmed");
    this.user1.addDragon(this.dragon_user1);

    this.user2 = new User("Omar");
    this.user2.addDragon(this.dragon_user2);

    //create match
    this.match = new Match(this.user1, this.user2, this);

    //get dragons keys
    this.dragon_nft1 = this.match.getDragonKey1();
    this.dragon_nft2 = this.match.getDragonKey2();

    //laod dragons
    //this.load.image("dragon_key1", this.dragon_nft1);
    //this.load.image("dragon_key2", this.dragon_nft2);

    //instantiate cards
    //constructor(nft, type, level, points)
    /*
                  This is temporary
                  In the future, the cards will be created when the user buys them
                */
    //nft, type, level, points
    // this.card1 = new Card("./assets/images/cards/attack/A_2_0.png", "attack", 0, 5);
    this.card2 = new Card(
      "./assets/images/cards/attack/A_2_1.png",
      "attack",
      1,
      10
    );
    this.card3 = new Card(
      "./assets/images/cards/attack/A_2_2.png",
      "attack",
      2,
      20
    );
    this.card4 = new Card(
      "./assets/images/cards/attack/A_2_3.png",
      "attack",
      3,
      30
    );
    // this.card5 = new Card("./assets/images/cards/defend/D_2_0.png", "defense", 0, 5);
    this.card6 = new Card(
      "./assets/images/cards/defend/D_2_1.png",
      "defense",
      1,
      10
    );
    this.card7 = new Card(
      "./assets/images/cards/defend/D_2_2.png",
      "defense",
      2,
      20
    );
    this.card8 = new Card(
      "./assets/images/cards/defend/D_2_3.png",
      "defense",
      3,
      30
    );

    // this.card9 = new Card("./assets/images/cards/heal/H_2_0.png", "heal", 0, 5);
    this.card10 = new Card(
      "./assets/images/cards/heal/H_2_1.png",
      "heal",
      1,
      10
    );
    this.card11 = new Card(
      "./assets/images/cards/heal/H_2_2.png",
      "heal",
      2,
      20
    );
    this.card12 = new Card(
      "./assets/images/cards/heal/H_2_3.png",
      "heal",
      3,
      30
    );

    /*

    this.card2 = new Card("./assets/images/defend.png", "defense", 3, 30);
    this.card3 = new Card("./assets/images/heal.png", "heal", 3, 30);
    this.card4 = new Card("./assets/images/attack2.png", "attack", 1, 10);
    this.card5 = new Card("./assets/images/defend.png", "defense", 1, 10);
    this.card6 = new Card("./assets/images/heal.png", "heal", 1, 10);
    this.card7 = new Card("./assets/images/heal.png", "heal", 1, 10);
*/

    // this.card1.assignCardKey(this, this.card1.getCardNFT());
    this.card2.assignCardKey(this, this.card2.getCardNFT());
    this.card3.assignCardKey(this, this.card3.getCardNFT());
    this.card4.assignCardKey(this, this.card4.getCardNFT());
    // this.card5.assignCardKey(this, this.card5.getCardNFT());
    this.card6.assignCardKey(this, this.card6.getCardNFT());
    this.card7.assignCardKey(this, this.card7.getCardNFT());
    this.card8.assignCardKey(this, this.card8.getCardNFT());
    // this.card9.assignCardKey(this, this.card9.getCardNFT());
    this.card10.assignCardKey(this, this.card10.getCardNFT());
    this.card11.assignCardKey(this, this.card11.getCardNFT());
    this.card12.assignCardKey(this, this.card12.getCardNFT());
    /*
                  Assign the cards to th users
                */
    /*
    this.user1.addAttackCard(this.card1);
    this.user1.addDefenseCard(this.card2);
    this.user1.addHealCard(this.card3);
    this.user1.addAttackCard(this.card4);
    this.user1.addDefenseCard(this.card5);
    this.user1.addHealCard(this.card6);

    this.user2.addAttackCard(this.card1);
    this.user2.addDefenseCard(this.card2);
    this.user2.addHealCard(this.card3);
    this.user2.addAttackCard(this.card4);
    this.user2.addDefenseCard(this.card5);
    this.user2.addHealCard(this.card6);
*/

    //Assign the cards to the user
    // this.user1.addAttackCard(this.card1);
    this.user1.addAttackCard(this.card2);
    this.user1.addAttackCard(this.card3);
    this.user1.addAttackCard(this.card4);

    // this.user1.addDefenseCard(this.card5);
    this.user1.addDefenseCard(this.card6);
    this.user1.addDefenseCard(this.card7);
    this.user1.addDefenseCard(this.card8);

    // this.user1.addHealCard(this.card9);
    this.user1.addHealCard(this.card10);
    this.user1.addHealCard(this.card11);
    this.user1.addHealCard(this.card12);

    // this.user2.addAttackCard(this.card1);
    this.user2.addAttackCard(this.card2);
    this.user2.addAttackCard(this.card3);
    this.user2.addAttackCard(this.card4);

    // this.user2.addDefenseCard(this.card5);
    this.user2.addDefenseCard(this.card6);
    this.user2.addDefenseCard(this.card7);
    this.user2.addDefenseCard(this.card8);

    // this.user2.addHealCard(this.card9);
    this.user2.addHealCard(this.card10);
    this.user2.addHealCard(this.card11);
    this.user2.addHealCard(this.card12);

    this.cards_user1 = [
      ...Card.getRandomCards(this.user1.getAttackCards(), 2),
      ...Card.getRandomCards(this.user1.getDefenseCards(), 2),
      ...Card.getRandomCards(this.user1.getHealCards(), 2),
    ];
    this.cards_user2 = [
      ...Card.getRandomCards(this.user2.getAttackCards(), 2),
      ...Card.getRandomCards(this.user2.getDefenseCards(), 2),
      ...Card.getRandomCards(this.user2.getHealCards(), 2),
    ];

    // card back
    this.load.image("card_back", "./assets/images/cardsBack/Cards_Back_1.png");
    this.load.image("card_back2", "./assets/images/cardsBack/Cards_Back_2.png");
    this.load.image("card_back3", "./assets/images/cardsBack/Cards_Back_3.png");
    this.load.image("card_back4", "./assets/images/cardsBack/Cards_Back_4.png");
    this.load.image("card_back5", "./assets/images/cardsBack/Cards_Back_5.png");
    this.load.image("card_back6", "./assets/images/cardsBack/Cards_Back_6.png");

    //load health bar bg
    HealthBar.loader(this);

    //load deagon shadow
    this.load.image("dragon_shadow", "./assets/images/dragon_shadow.png");

    //load attack sound
    this.load.audio("attack_sound", "assets/mp3/FIRE_Fireball_Cast.wav");

    //load shield asset
    Defense.shield_load_assets(this);

    //load defense sound
    this.load.audio("defense_sound", "assets/mp3/defence_shield.wav");

    //load heal sound
    this.load.audio("heal_sound", "assets/mp3/heal_spell.wav");

    this.load.image(
      "victory_screen_player1",
      "./assets/images/winner_screen/Player_1.png"
    );

    //load victory screen image for player 2 into memory
    this.load.image(
      "victory_screen_player2",
      "./assets/images/winner_screen/Player_2.png"
    );

    this.load.audio(
      "you_win",
      "assets/mp3/Dragon_Dialogue_You_Are_Victorious.wav"
    );

    this.load.audio("you_lose", "assets/mp3/Dragon_Dialogue_You_Lose.wav");

    this.load.image("death_mark", "./assets/images/death_mark.png");
  }

  create() {


    var isPlayerA = false;

    this.socket = io('http://localhost:4200', {transports : ["websocket"] });

    this.socket.on('connect', function () {
        console.log('Connected!');
    });


    this.socket.on("isPlayerA", function() {
      isPlayerA = true;
    }) 

    setTimeout(() => {
      if(isPlayerA == true) {
        console.log("I am player A");
      } else {
        console.log("I am player B");
      }

    }, 2000);



    this.cameras.main.fadeIn(500, 0, 0, 0);

    //attack flag
    this.turn = true;

    // this.rand = Math.floor(Math.random() * 3);
    // if (this.rand == 0)
    //   this.temple = this.add.image(0, 0, "temple_background").setOrigin(0, 0);
    // else if (this.rand == 1)
    //   this.temple = this.add.image(0, 0, "temple_background2").setOrigin(0, 0);
    // else
    this.temple = this.add.image(0, 0, "temple_background3").setOrigin(0, 0);
    //add CTO
    this.cto = this.add.image(525, 265, "cto");

    //add dragons to the scene
    //this.dragon1 = this.add.image(200, 400, "dragon_key1");
    //this.dragon1.flipX = true;

    //this.dragon2 = this.add.image(800, 400, "dragon_key2");

    this.match_dragons = this.physics.add.group();
    this.dragon_sprite_list = [];
    //iterate over the match dragons and instantiate card sprite for each card
    this.users_dragons = [
      ...this.user1.getDragons(),
      ...this.user2.getDragons(),
    ];
    for (var i = 0; i < this.users_dragons.length; i++) {
      this.dragon_key = this.users_dragons[i].getDragonKey();
      if (i == 0) {
        this.dragon_sprite = new DragonSprite(
          this,
          200,
          280,
          this.dragon_key,
          this.users_dragons[i],
          "left"
        );
        this.dragon_sprite.setDepth(99);
        this.dragon_sprite.flipX = true;
      } else if (i == 1) {
        this.dragon_sprite = new DragonSprite(
          this,
          850,
          280,
          this.dragon_key,
          this.users_dragons[i],
          "right"
        );
        this.dragon_sprite.setDepth(99);
      }
      this.dragon_sprite_list.push(this.dragon_sprite);
      this.match_dragons.add(this.dragon_sprite);
    }

    // dragon shadow
    this.dragon_shadow1 = this.add.image(200, 280, "dragon_shadow");
    this.dragon_shadow1.flipX = true;
    this.dragon_shadow2 = this.add.image(850, 280, "dragon_shadow");

    //add deck
    this.deck = this.add.image(176, 470, "deck").setOrigin(0, 0);
    this.deck.setScale(0.95);

    //add end turn button
    this.end_turn_btn = this.add
      .sprite(480, 30, "end_turn_btn")
      .setOrigin(0, 0);

    this.end_turn_btn.setScale(0.8);

    this.end_turn_btn.setInteractive();

    this.end_turn_btn.on("clicked", this.endTurnHandler, this);
/*
    this.end_turn_btn.on(
      "clicked",
      () => {
        this.levelCounter = 0;
      },
      this
    );
*/
    // craete dragon spot
    this.dragonSpot = this.add.image(530, 250, "current_dragon");

    //this.match_cards = this.physics.add.group();
    this.match_cards = [];
    this.card_sprite_list = [];

    //iterate over the match cards and instantiate card sprite for each card
    for (var i = 0; i < this.cards_user1.length; i++) {
      this.card_key = this.cards_user1[i].getCardKey();
      this.card_sprite = new CardSprite(
        this,
        270 + i * 100,
        590,
        this.card_key,
        this.cards_user1[i]
      );
      this.card_sprite.setInteractive();
      this.card_sprite.on("clicked", this.cardHandler, this);
      this.card_sprite_list.push(this.card_sprite);
      this.match_cards.push(this.card_sprite);
    }

    this.input.on(
      "gameobjectup",
      function (pointer, card) {
        card.emit("clicked", card);
      },
      this
    );

    //crate emtpy group for shoots
    this.shoots = this.physics.add.group();

    this.match.setCurrentDragon(this.dragon_sprite_list[0]);
    this.match.setEnemyDragon(this.dragon_sprite_list[1]);

    //instantiate shoot object
    //this.shoot = new Shoot(this);

    //Card NFT
    this.leftNFTCard = this.nftDraw("NFT1", true);
    this.rightNFTCard = this.nftDraw("NFT2", false);

    this.levelCounter = this.match.getCurrentDragon().getDragon().getLevel();
    //this.levelCounter2 = this.match.getEnemyDragon().getDragon().getLevel();

    this.levelText = this.add.text(
      493,
      455,
      this.levelCounter +
        "/" +
        this.match.getCurrentDragon().getDragon().getLevel(),
      {
        font: "35px",
        fill: "#000",
        fontFamily: "Goudy Bookletter 1911",
      }
    );
    /*
    this.levelText2 = this.add.text(930, 500, this.levelCounter2, {
      font: "35px",
      fill: "#000",
    });
*/
    //add dragon shield points
    this.shield = null;

    //create idle anims
    this.dragon_sprite_list[0].createIdleAnim(this);
    this.dragon_sprite_list[1].createIdleAnim(this);

    this.playIdleAnimation(this.dragon_sprite_list[0]);
    this.playIdleAnimation(this.dragon_sprite_list[1]);

    this.stopIdle = false;
    if (this.victoryFlag) this.victoryScreen();

    //delta timer
    this.delta = 0;

    //Random Start
    // this.randomStart(randomStart);
  }

  // randomStart(randomStart) {
  //   //Random Start
  //   if (randomStart == 1) this.autoTurn(true);
  //   console.log(randomStart);
  // }

  nftDraw(nft, left) {
    if (left) {
      this.nft = this.add.image(-109, 485, nft).setOrigin(0, 0);
      this.nft.flipX = true;
      this.dragon1Level = this.add.text(
        144,
        545,
        this.dragon_sprite_list[0].getDragon().getLevel(),
        {
          font: "18px",
          fill: "#000",
          fontFamily: "Goudy Bookletter 1911",
        }
      );
      this.dragon1Health = this.add.text(
        137,
        583,
        this.dragon_sprite_list[0].getDragon().getHealth(),
        {
          font: "16px",
          fill: "#000",
          fontFamily: "Goudy Bookletter 1911",
          fontStyle: "bold",
        }
      );
      this.dragon1Lifes = this.add.text(
        137,
        615,
        this.dragon_sprite_list[0].getDragon().getLife(),
        {
          font: "16px",
          fill: "#000",
          fontFamily: "Goudy Bookletter 1911",
        }
      );
      this.dragon1Stamina = this.add.text(
        144,
        648,
        this.dragon_sprite_list[0].getDragon().getStamina(),
        {
          font: "18px",
          fill: "#000",
          fontFamily: "Goudy Bookletter 1911",
        }
      );
    } else {
      this.nft = this.add.image(857, 485, nft).setOrigin(0, 0);
      this.dragon2Level = this.add.text(
        890,
        545,
        this.dragon_sprite_list[1].getDragon().getLevel(),
        {
          font: "18px",
          fill: "#000",
          fontFamily: "Goudy Bookletter 1911",
        }
      );
      this.dragon2Health = this.add.text(
        880,
        583,
        this.dragon_sprite_list[1].getDragon().getHealth(),
        {
          font: "16px",
          fill: "#000",
          fontFamily: "Goudy Bookletter 1911",
          fontStyle: "bold",
        }
      );
      this.dragon2Lifes = this.add.text(
        885,
        615,
        this.dragon_sprite_list[1].getDragon().getLife(),
        {
          font: "16px",
          fill: "#000",
          fontFamily: "Goudy Bookletter 1911",
        }
      );
      this.dragon2Stamina = this.add.text(
        890,
        648,
        this.dragon_sprite_list[1].getDragon().getStamina(),
        {
          font: "18px",
          fill: "#000",
          fontFamily: "Goudy Bookletter 1911",
        }
      );
    }
    this.nft.setScale(0.09);
    this.nft.frame.height = 2080;
    this.nft.frame.width = 1800;
    this.nft.frame.cutHeight = 2080;
    this.nft.frame.cutWidth = 1800;
    this.nft.frame.updateUVs();
    return this.nft;
  }

  async victoryScreen() {
    this.victoryFlag = false;
    //if playerwin = true, then computer is the winner
    this.stopIdle = true;
    console.log(this.loserDragon.nft);
    if (this.dragon_sprite_list[0].dragon.nft == this.loserDragon.nft) {
      console.log("player 2 winner screen added");
      this.add.image(0, 0, "victory_screen_player2").setOrigin(0, 0);
      this.dragon_sprite_list[0].createDeathAnim(this);
      this.playDeathAnimation(this.dragon_sprite_list[0]);
      setTimeout(() => {
        this.sound.add("you_lose").play();
      }, 1500);
      setTimeout(() => {
        this.add.image(120, 380, "death_mark").setOrigin(0, 0).setScale(0.18);
      }, 1200);
    } else if (this.dragon_sprite_list[1].dragon.nft == this.loserDragon.nft) {
      console.log("player 1 winner screen added");
      this.add.image(0, 0, "victory_screen_player1").setOrigin(0, 0);
      this.dragon_sprite_list[1].createDeathAnim(this);
      this.playDeathAnimation(this.dragon_sprite_list[1]);
      setTimeout(() => {
        this.sound.add("you_win").play();
      }, 1500);
      setTimeout(() => {
        this.add.image(760, 380, "death_mark").setOrigin(0, 0).setScale(0.18);
      }, 1200);
    }

    this.replay_btn = this.add.text(450, 330, "Replay", {
      font: "40px",
      fill: "#FFFFFF",
    });

    this.replay_btn.setInteractive();

    this.replay_btn.on("pointerdown", () => {
      this.scene.start("payTicket");
    });
    this.replay_btn.on("pointerover", () => {
      this.ReplayButtonHoverState();
    });

    this.deck.destroy();
    this.levelText.destroy();
    for (var i = 0; i < this.card_sprite_list.length; i++) {
      this.card_sprite_list[i].destroy();
    }
  }

  endTurnHandler() {

    this.levelCounter = this.match.getEnemyDragon().getDragon().getLevel();
    this.turn = !this.turn;
    this.shuffle();
    if (this.turn == true) {
      this.dragonSpot.x = 530;
      this.dragonSpot.y = 250;
    } else {
      this.dragonSpot.x = 1120;
      this.dragonSpot.y = 250;
    }
    // setTimeout(() => {
    //   //btn.x = 870;
    //   btn.y = 560;
    // }, 200);
  }

  /*
        This method gets called when a card gets clicked (either manually or by the computer)
        The method does the following:
          1- Check if the card level is less than the level counter, if the condition is true:
          2- It checks the type of the card
            2-1 If the type is attack:
              2-1-1 instantiate a new shoot
              2-1-2 Set damage points to the shoot object
              2-1-3 Add the shoot object to the scene
              2-1-4 Play the attack animation on the current dragon  
              2-1-5 Play the idle animation if we are NOT in the winner screen
              2-1-6 Activate the sound of the attack
            2-2 If the type is defense:
              2-2-1 It checks if there is no shield already on the dragon, instantiate a new shiled object
              2-2-2 Set the shield object to the current dragon
              2-2-3 Toggle the shield flag [This flag is not used in the code anymore, will remove it soon]
              2-2-4 Increase the shield points of the dragon sprite
              2-2-5 Activate the sound of the defense
            2-3- If the type is heal:
              2-3-1 Instantiates a heal object
              2-3-2 Activate the sound of the heal
          3- It decrements the level counter by the level of the clicked card
      */
  async cardHandler(card) {
    if (this.levelCounter >= card.getCard().getCardLevel()) {
      if (card.getCard().getCardType() == "attack") {
        let shoot = new Shoot(this, card.card.getCardLevel());
        shoot.setDamagePoints(card.getCard().getCardPoints());
        shoot.setDepth(99); //z-index
        shoot.addToScene();
        //card.activateSound();
        //play the attack animation on the dragon sprite
        this.match.getCurrentDragon().createAttackAnim(this);
        this.match.getCurrentDragon().playAttackAnim(this);

        if (this.stopIdle == false)
          setTimeout(() => {
            if (this.stopIdle == false) {
              this.playIdleAnimation(this.dragon_sprite_list[0]);
              this.playIdleAnimation(this.dragon_sprite_list[1]);
            }
          }, 1200);
      } else if (card.getCard().getCardType() == "defense") {
        if (this.match.getCurrentDragon().getShield() == null) {
          this.shield = new Defense(this);
          this.match.getCurrentDragon().setShield(this.shield);
          this.match.getCurrentDragon().toggleShieldFlag();
        }
        //card.activateSound();
        this.match
          .getCurrentDragon()
          .incShieldPoints(card.getCard().getCardPoints());
        console.log(
          "shiled points: ",
          this.match.getCurrentDragon().getShieldPoints()
        );

        console.log("defend");
      } else if (card.getCard().getCardType() == "heal") {
        console.log("heal");
        //card.activateSound();
        DragonSprite.heal(
          this.match.getCurrentDragon(),
          card.getCard().getCardPoints(),
          this,
          card.getCard().getCardLevel()
        );
      }
      this.levelCounter -= card.getCard().getCardLevel();
    }
  }

  /*
        Objective: Flip the cards with levels that are higher than the level counter
        
      */
  async coveringCards() {
    this.foundCard = false;
    if (this.turn) {
      for (var i = 0; i < this.match_cards.length; i++) {
        if (this.match_cards[i].getCard().getCardLevel() <= this.levelCounter) {
          this.foundCard = true;
        } else {
          this.match_cards[i].setTexture("card_back");
          /*
                              if (this.match_cards[i].getCard().getCardType() == "attack") {
                                this.match_cards[i].setTexture("card_back6");  
                              } else if (this.match_cards[i].getCard().getCardType() == "defense") {
                                this.match_cards[i].setTexture("card_back5");
                              } else if (this.match_cards[i].getCard().getCardType() == "heal") {
                                this.match_cards[i].setTexture("card_back");
                              }
                              */
        }
      }
    } else {
      for (var i = 0; i < this.match_cards.length; i++) {
        if (this.match_cards[i].getCard().getCardLevel() <= this.levelCounter) {
          this.foundCard = true;
        } else {
          this.match_cards[i].setTexture("card_back");
          /*
                              if (this.match_cards[i].getCard().getCardType() == "attack") {
                                this.match_cards[i].setTexture("card_back6");  
                              } else if (this.match_cards[i].getCard().getCardType() == "defense") {
                                this.match_cards[i].setTexture("card_back5");
                              } else if (this.match_cards[i].getCard().getCardType() == "heal") {
                              }
                              */
        }
      }

      // while (this.levelCounter > 0) {
      //   await setTimeout(() => {
      //     console.log("Wait");
      //   }, 1000);
      //   let random = Math.floor(Math.random() * (this.match_cards.length - 1));
      //   if (
      //     this.match_cards[random].getCard().getCardLevel() <= this.levelCounter
      //   ) {
      //     this.cardHandler(this.match_cards[random]);
      //   }
      // }
    }
  }

  ReplayButtonHoverState() {
    this.replay_btn.setStyle({ fill: "#ff0" });
  }

  playIdleAnimation(dragonSprite) {
    dragonSprite.play(dragonSprite.dragon.getIdleAnimKey());
  }

  stopIdleAnimation(dragonSprite) {
    dragonSprite.stop(dragonSprite.dragon.getIdleAnimKey());
  }

  playDeathAnimation(dragonSprite) {
    dragonSprite.play(dragonSprite.dragon.getDeathAnimKey());
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async enemyTurn() {
    if (this.turn == false) {
      while (this.levelCounter > 0) {
        let currentHealth = this.dragon_sprite_list[1].getDragon().getHealth();
        let enemyHealth = this.dragon_sprite_list[0].getDragon().getHealth();
        console.log("health: ", currentHealth);
        await new Promise((r) => setTimeout(r, 1000));
        if (this.turn == false) {
          var validHandCards = [];
          for (var i = 0; i < this.match_cards.length; i++)
            if (
              this.match_cards[i].getCard().getCardLevel() <= this.levelCounter
            )
              validHandCards.push(this.match_cards[i]);

          if (currentHealth >= 80) {
            let card = WeightedRandom(
              this.match_cards,
              [0.3, 0.3, 0.1, 0.1, 0.1, 0.1]
            );
            if (card.getCard().getCardLevel() <= this.levelCounter) {
              this.cardHandler(card);
            }
          } else if (currentHealth >= 60) {
            let card = WeightedRandom(
              this.match_cards,
              [0.3, 0.3, 0.1, 0.1, 0.1, 0.1]
            );
            if (card.getCard().getCardLevel() <= this.levelCounter) {
              this.cardHandler(card);
            }
          } else if (enemyHealth <= 30) {
            let card = WeightedRandom(
              this.match_cards,
              [0.3, 0.3, 0.1, 0.1, 0.1, 0.1]
            );
            if (card.getCard().getCardLevel() <= this.levelCounter) {
              this.cardHandler(card);
            }
          } else if (currentHealth >= 40) {
            let card = WeightedRandom(
              this.match_cards,
              [0.1, 0.2, 0.2, 0.1, 0.3, 0.1]
            );
            if (card.getCard().getCardLevel() <= this.levelCounter) {
              this.cardHandler(card);
            }
          } else if (currentHealth >= 40) {
            let card = WeightedRandom(
              this.match_cards,
              [0.1, 0.1, 0.2, 0.1, 0.2, 0.3]
            );
            if (card.getCard().getCardLevel() <= this.levelCounter) {
              this.cardHandler(card);
            }
          } else if (currentHealth >= 30) {
            let card = WeightedRandom(
              this.match_cards,
              [0.1, 0.1, 0.1, 0.1, 0.3, 0.3]
            );
            if (card.getCard().getCardLevel() <= this.levelCounter) {
              this.cardHandler(card);
            }
          } else if (currentHealth >= 0) {
            let card = WeightedRandom(
              this.match_cards,
              [0.1, 0.1, 0.1, 0.1, 0.3, 0.3]
            );
            if (card.getCard().getCardLevel() <= this.levelCounter) {
              this.cardHandler(card);
            }
          }
          if (
            this.levelCounter > 0 &&
            validHandCards.length < 3 &&
            validHandCards.length > 0
          ) {
            let randomIndex = Math.floor(
              Math.random() * (validHandCards.length - 1)
            );
            let card = validHandCards[randomIndex];
            if (card.getCard().getCardLevel() <= this.levelCounter) {
              this.cardHandler(card);
            }
          }
          validHandCards = [];
        }
      }
    }
  }

  /*
        Objective: Get random cards every turn

        1- Get random cards from every cards category (attack, defense, heal)
        2- Draw the card sprite on the screen
        3- Destroy the cards in the match_cards array to act as a garbage collector
        4- Set the cards of user1 to be interactive so that it can get input [the computer cards are not interactive]
        5- Push the card sprite in the card_sprite_list and in the match_cards array
      */
  shuffle() {
    if (this.turn) {
      this.cards_user1 = [
        ...Card.getRandomCards(this.user1.getAttackCards(), 2),
        ...Card.getRandomCards(this.user1.getDefenseCards(), 2),
        ...Card.getRandomCards(this.user1.getHealCards(), 2),
      ];
      for (var i = 0; i < this.cards_user1.length; i++) {
        this.card_key = this.cards_user1[i].getCardKey();
        this.match_cards[i].destroy();
        this.card_sprite = new CardSprite(
          this,
          270 + i * 100,
          590,
          this.card_key,
          this.cards_user1[i]
        );
        this.card_sprite.setInteractive();
        this.card_sprite.on("clicked", this.cardHandler, this);
        this.card_sprite_list.push(this.card_sprite);
        this.match_cards[i] = this.card_sprite;
      }
    } else {
      this.cards_user2 = [
        ...Card.getRandomCards(this.user1.getAttackCards(), 2),
        ...Card.getRandomCards(this.user1.getDefenseCards(), 2),
        ...Card.getRandomCards(this.user1.getHealCards(), 2),
      ];

      for (var i = 0; i < this.cards_user2.length; i++) {
        this.card_key = this.cards_user2[i].getCardKey();
        this.match_cards[i].destroy();
        this.card_sprite = new CardSprite(
          this,
          270 + i * 100,
          590,
          this.card_key,
          this.cards_user2[i]
        );
        this.card_sprite.setInteractive();
        this.card_sprite.on("clicked", this.cardHandler, this);
        this.card_sprite_list.push(this.card_sprite);
        this.match_cards[i] = this.card_sprite;
      }
    }
  }

  /*
        Objective: Automatic Turn
          1- Do the turn automatically in one of these two cases:
            First: The level counter becomes equal zero
            Second: No cards on the deck have level that is less then the level counter
          2- Call the shuffle method to get random cards every turn
          3- Update the text on the counter
      */
  autoTurn(forceTurn = false) {
    if (this.levelCounter == 0 || this.foundCard == false || forceTurn) {
      this.endTurnHandler();
      this.shuffle();
      this.levelText.setText(
        this.levelCounter +
          "/" +
          this.match.getCurrentDragon().getDragon().getLevel()
      );
    }
  }
  timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async update(time, delta) {
    //casper singer checker
    // if (this.delta > 1000) {
    //   console.log("Login Checker: " + casperSigner.loginStatus);
    //   this.delta = 0;
    //   casperSigner.login();
    // }
    //iterate over the match cards and call the update method against them
    /*
    for (var i = 0; i < this.card_sprite_list.length; i++) {
      //console.log("update scene");
      this.card_sprite_list[i].update();
    }
*/

    //if (this.turn == false && this.delta == 1)
      //setTimeout(async () => await this.enemyTurn(), 2500);
    // when the turn is false then it is the enemy turn

    this.coveringCards();

    //this.autoTurn();

    if (this.turn) {
      //console.log("up");
      this.match.setCurrentDragon(this.dragon_sprite_list[0]);
      this.match.setEnemyDragon(this.dragon_sprite_list[1]);
      this.delta = -1;
    } else {
      //console.log("down");
      this.delta++;
      this.match.setCurrentDragon(this.dragon_sprite_list[1]);
      this.match.setEnemyDragon(this.dragon_sprite_list[0]);
    }

    // set counter text
    this.levelText.setText(
      this.levelCounter +
        "/" +
        this.match.getCurrentDragon().getDragon().getLevel()
    );
    //this.levelText2.setText(this.levelCounter2);

    //toggle the current dragon based on the value of the end_turn_flag
    // console.log("flag: ", this.current_dragon_flag);

    this.physics.add.overlap(
      this.match.getEnemyDragon(),
      this.shoots,
      (dragon, shoot) => {
        this.shootlevel = shoot.getShootLevel();
        shoot.setIsDestroy(true);
        shoot.destroy();
        let shoot_effect = new Shooteffect(
          this,
          dragon.x,
          dragon.y,
          this.shootlevel
        );
        shoot_effect.create(this);
        shoot_effect.destroy();

        let realDamage = shoot.getDamagePoints() - dragon.getShieldPoints();
        dragon.setShieldPoints(
          Math.max(0, dragon.getShieldPoints() - shoot.getDamagePoints())
        );
        if (dragon.getShieldPoints() == 0 && dragon.getShield() != null) {
          dragon.destroyShield();
          dragon.toggleShieldFlag();
          dragon.setShield(null);
        }
        //shoot.body.enable = false;
        this.is_attack_enabled = true;
        DragonSprite.damage(
          dragon,
          realDamage <= 0 ? 0 : realDamage,
          this,
          this.turn
        );
      }
    );
  }
}
