var game2

window.addEventListener("load", () =>{ 
    var config = {
        type: Phaser.AUTO,
        width: 960, 
        height: 540,
        pixelArt: true,
        physics: {
            default: 'arcade',
            arcade: {
            debug: false
            }},
        
        //backgroundColor : 0x999999,
        scene: [EcranStart, VillageScene, GrotteScene, ForetScene, DonjonScene]
        
    }

    game2 = new Phaser.Game(config)
})



//-----------------------------------ECRAN START-------------------------------------------------------------------------------------------

class EcranStart extends Phaser.Scene { 
    constructor() { 
        super("ecranStart")
    }

    preload() { 
        this.load.image("start", "assets/start.png"); 
        this.load.image("fond1", "assets/fond1.png"); 

    }
    //fin du preload

//-----------------------------------CREATE-----------------------------------

    create() { 
        this.add.image(480, 270, "fond1"); //le fond est affiché en premier mais sera tout en dessous 
        this.add.image(480, 100, "start"); 

        
        this.input.on('pointerdown', function (pointer) {
            this.scene.start("villageScene"); 
            
    }, this); 

    }
    //fin de create 

//-----------------------------------UPDATE-----------------------------------
    update() { 

    }
    //fin du update
}



//-----------------------------------SCENE VILLAGE-------------------------------------------------------------------------------------------

class VillageScene extends Phaser.Scene { 
    constructor() { 
        super("villageScene")
    }

//-----------------------------------PRELOAD-----------------------------------

    preload() { 
        //---chargement de des tuiles de jeu--- 
        this.load.image("tuiles", "tileset_piskel3.png"); 

        //---chargement de la carte--- 
        this.load.tilemapTiledJSON("carte_village", "villageTiled/essai_tiled_zelda_5.json"); 

        //---ajout d'un personnage--- 
        this.load.spritesheet("perso", "assets/chat22_360-Sheet.png", { frameWidth: 32, frameHeight: 32}); 

        this.load.image("coffreNormalVillage1", "assets/coffreBasique.png"); 

        //---ui--
        this.load.image("barrePv1", "assets/barreHp1.png"); 
        this.load.image("chatPhoto", "assets/chatProfil.png"); 
        this.load.image("informationsFeuille", "assets/uiFeuille.png"); 

        //---grotte---
        this.load.image("grotte", "assets/grotte.png"); 

        //---portails 
        this.load.image("portailVillageForet", "assets/portailVillageForet.png"); 
        this.load.image("portailVillageDonjon", "assets/portailVillageDonjon.png"); 

        //---orbes---
        this.load.image("supportOrbeNoire", "assets/support.png"); 
        this.load.image("supportOrbeOrange", "assets/support.png"); 
        this.load.image("supportOrbeBleue", "assets/support.png"); 
        this.load.image("messageNoirPillier", "assets/messageNoirPillier.png"); 
        this.load.image("messageOrangePillier", "assets/messageOrangePillier.png");
        this.load.image("messageBleuPillier", "assets/messageBleuPillier.png");

        //---coffres---
        this.load.image("coffreVillage1", "assets/coffreBasique.png"); 
        this.load.image("coffreVillage2", "assets/coffreBasique.png"); 
        this.load.image("coffreVillage3", "assets/coffreBasique.png"); 
        this.load.image("pieceObtentionVillage1", "assets/pieceObtention.png");
        this.load.image("pieceObtentionVillage2", "assets/pieceObtention.png"); 
        this.load.image("pieceObtentionVillage3", "assets/pieceObtention.png");  

        //---fees---
        this.load.image("feeOrange1", "assets/fee3.png"); 
        this.load.image("feeRose1", "assets/fee1.png"); 
        this.load.image("feeVerte1", "assets/fee2.png"); 
        this.load.image("feeViolette1", "assets/fee4.png"); 
        this.load.image("feeViolette2", "assets/fee4.png"); 

        //---pharmacie---
        this.load.image("pharmacie1", "assets/pharmacie.png"); 
        this.load.image("pharmacie2", "assets/pharmacie.png"); 

        //---bulle---
        this.load.image("bulle", "assets/bulle.png"); 

        

        
    }

//-----------------------------------CREATE-----------------------------------

    create() { 
        //---importer Tiled dans Phaser---
        //chargement de la carte 
        const carteDuNiveauVillage = this.add.tilemap("carte_village"); 


        //---chargement du jeu de tuiles--- 
        const tilesetVillage = carteDuNiveauVillage.addTilesetImage ( 
            "tileset_piskel3",
            "tuiles"
        ); 

        //---les différents calques---
        //chargement du calque pour l'eau 
        const calque_eau_village = carteDuNiveauVillage.createLayer( 
            "calque_eau_village", 
            tilesetVillage
        ); 

        const calque_eau_navigable_village = carteDuNiveauVillage.createLayer(
            "calque_eau_navigable_village", 
            tilesetVillage
        ); 

        const calque_herbe_village = carteDuNiveauVillage.createLayer( 
            "calque_herbe_village", 
            tilesetVillage
        ); 

        const calque_chemins_relief_village = carteDuNiveauVillage.createLayer(
            "calque_chemins_relief_village", 
            tilesetVillage
        ); 

        const calque_maison_decorations_village = carteDuNiveauVillage.createLayer(
            "calque_maison_decorations_village", 
            tilesetVillage
        ); 

        const calque_arbres_fleurs_village = carteDuNiveauVillage.createLayer(
            "calque_arbres_fleurs_village", 
            tilesetVillage
        ); 

        const calque_ronces_village = carteDuNiveauVillage.createLayer(
            "calque_ronces_village", 
            tilesetVillage
        );

        //---player---
        this.player = this.physics.add.sprite(1190, 870, "perso"); 
        this.player.setCollideWorldBounds(true); 

        
        

        //---animations du chat--- 
        this.anims.create({
            key : "left", 
            frames : this.anims.generateFrameNumbers("perso", {start: 12, end: 15 }), 
            frameRate : 8,
            //repeat : -1
        }); 

        this.anims.create({
            key : "right", 
            frames : this.anims.generateFrameNumbers("perso", {start: 4, end: 7 }), 
            frameRate : 8,
            //repeat : -1
        }); 

        this.anims.create({
            key : "up", 
            frames : this.anims.generateFrameNumbers("perso", {start: 8, end: 11 }), 
            frameRate : 8,
            //repeat : -1
        }); 

        this.anims.create({
            key : "down", 
            frames : this.anims.generateFrameNumbers("perso", {start: 0, end: 3 }), 
            frameRate : 8,
            //repeat : -1
        }); 

        this.anims.create({
            key : "turn", 
            frames : this.anims.generateFrameNumbers("perso", {start: 16, end: 19 }), 
            frameRate : 4, 
        }); 

        //---utilisation des propriétés bool---
        calque_arbres_fleurs_village.setCollisionByProperty({ estSolideVillage : true});
        calque_eau_village.setCollisionByProperty({ estLiquideVillage : true});
        calque_eau_navigable_village.setCollisionByProperty({ estNavigableVillage : true}); 
        calque_chemins_relief_village.setCollisionByProperty({ estSolideVillage : true});  
        calque_maison_decorations_village.setCollisionByProperty({ estSolideVillage : true}); 
        calque_ronces_village.setCollisionByProperty({ estPiquantRonces : true}); 


        //---ajouter les images--- 
        //ui
        this.barrePv100 = this.physics.add.image(850, 260, "barrePv1").setScrollFactor(0); 
        this.chatPhoto = this.physics.add.image(150, 110, "chatPhoto").setScrollFactor(0); 
        this.informationsUI = this.physics.add.image(320, 100, "informationsFeuille").setScrollFactor(0); 
        this.valeurPiece = this.add.text(235, 95, "0", {fontSize: 16}).setScrollFactor(0); 
        this.obtentionOrbeNoire = this.add.text(275, 95, "X", {fontSize: 16}).setScrollFactor(0);
        this.obtentionOrbeBleue = this.add.text(320, 95, "X", {fontSize: 16}).setScrollFactor(0);
        this.obtentionOrbeOrange = this.add.text(365, 95, "X", {fontSize: 16}).setScrollFactor(0);

        //fees
        this.feeOrange1 = this.physics.add.image(1185, 810, "feeOrange1").setInteractive(); 
        this.feeRose1 = this.physics.add.image(865, 910, "feeRose1").setInteractive(); 
        this.feeVerte1 = this.physics.add.image(1057, 330, "feeVerte1").setInteractive(); 
        this.feeViolette1 = this.physics.add.image(833, 265, "feeViolette1").setInteractive(); 
        this.feeViolette2 = this.physics.add.image(290, 980, "feeViolette2").setInteractive(); 


        //coffres et orbes 
        this.coffreBasiqueVillage1 = this.physics.add.image(1000, 900, "coffreNormalVillage1").setInteractive();
        this.supportOrbeNoire = this.physics.add.image(110, 870, "supportOrbeNoire").setInteractive(); 
        this.messageOrbeNoire = this.physics.add.image(110, 950, "messageNoirPillier"); 
        this.supportOrbeOrange = this.physics.add.image(1200, 140, "supportOrbeNoire").setInteractive(); 
        this.messageOrbeOrange = this.physics.add.image(1200, 220, "messageOrangePillier"); 
        this.supportOrbeBleue = this.physics.add.image(2130, 870, "supportOrbeBleue").setInteractive(); 
        this.messageOrbeBleue = this.physics.add.image(2130, 950, "messageBleuPillier"); 
        this.coffreBasique1 = this.physics.add.image(2200, 1500, "coffreVillage1").setInteractive();
        this.pieceCoffreBasique1 = this.physics.add.image(2100, 1520, "pieceObtentionVillage1"); 
        this.coffreBasique2 = this.physics.add.image(550, 1550, "coffreVillage2").setInteractive();
        this.pieceCoffreBasique2 = this.physics.add.image(550, 1500, "pieceObtentionVillage2");
        this.coffreBasique3 = this.physics.add.image(950, 150, "coffreVillage3").setInteractive();
        this.pieceCoffreBasique3 = this.physics.add.image(950, 70, "pieceObtentionVillage3");

        //pharmacie
        this.pharmacieVillage1 = this.physics.add.image(125, 680, "pharmacie1").setInteractive(); 
        this.pharmacieVillage2 = this.physics.add.image(1500, 100, "pharmacie2").setInteractive(); 

        //bulle
        this.bulleEau = this.physics.add.image(1615, 1100, "bulle").setInteractive(); 
        

        //---visibles ou non---
        this.messageOrbeNoire.setVisible(false); 
        this.messageOrbeOrange.setVisible(false); 
        this.messageOrbeBleue.setVisible(false); 
        this.pieceCoffreBasique1.setVisible(false); 
        this.pieceCoffreBasique2.setVisible(false); 
        this.pieceCoffreBasique3.setVisible(false); 
        this.bulleEau.setVisible(false); 
        

        //---teleportation
        this.portailTeleportationVillageForet = this.physics.add.image(20, 510, "portailVillageForet").setInteractive(); 
        this.portailTeleportationVillageDonjon = this.physics.add.image(590, 90, "portailVillageDonjon").setInteractive(); 
        this.grotteVillage = this.physics.add.image(2150, 80, "grotte").setInteractive(); 

        //---collision--- entre le joueur et les éléments, peut lancer une fonction au contact 
        this.physics.add.collider(this.player, calque_eau_village);
        this.physics.add.overlap(this.player, calque_eau_navigable_village, this.traverser, null, this); 
        this.physics.add.collider(this.player, calque_arbres_fleurs_village); 
        this.physics.add.collider(this.player, calque_chemins_relief_village); 
        this.physics.add.collider(this.player, calque_maison_decorations_village);
        this.physics.add.collider(this.player, calque_ronces_village, this.ronces, null, this);  
        this.physics.add.collider(this.player, this.coffreBasiqueVillage1, this.test, null, this); 
        this.physics.add.collider(this.player, this.grotteVillage, this.teleportationGrotte, null, this); 
        //teleportation
        this.physics.add.collider(this.player, this.portailTeleportationVillageForet, this.teleportationForet, null, this); 
        this.physics.add.collider(this.player, this.portailTeleportationVillageDonjon, this.teleportationDonjon, null, this); 
        //pilliers
        this.physics.add.collider(this.player, this.supportOrbeNoire, this.pillierNoir, null, this); 
        this.physics.add.collider(this.player, this.supportOrbeOrange, this.pillierOrange, null, this); 
        this.physics.add.collider(this.player, this.supportOrbeBleue, this.pillierBleu, null, this); 
        this.physics.add.collider(this.player, this.coffreBasique1, this.trouveCoffreBasique1, null, this); 
        this.physics.add.collider(this.player, this.coffreBasique2, this.trouveCoffreBasique2, null, this); 
        this.physics.add.collider(this.player, this.coffreBasique3, this.trouveCoffreBasique3, null, this); 
        //fees
        this.physics.add.collider (this.player, this.feeOrange1); 
        this.physics.add.collider (this.player, this.feeRose1); 
        this.physics.add.collider (this.player, this.feeVerte1); 
        this.physics.add.collider (this.player, this.feeViolette1); 
        //pharmacie
        this.physics.add.collider(this.player, this.pharmacieVillage1);
        this.physics.add.collider(this.player, this.pharmacieVillage2);
       

        //---fixer--- rendre les objets fixes 
        this.coffreBasiqueVillage1.setImmovable(); 
        this.grotteVillage.setImmovable(); 
        this.portailTeleportationVillageForet.setImmovable(); 
        this.portailTeleportationVillageDonjon.setImmovable(); 
        this.supportOrbeNoire.setImmovable(); 
        this.supportOrbeOrange.setImmovable(); 
        this.supportOrbeBleue.setImmovable(); 
        this.coffreBasique1.setImmovable(); 
        this.coffreBasique2.setImmovable(); 
        this.coffreBasique3.setImmovable(); 
        this.feeOrange1.setImmovable(); 
        this.feeRose1.setImmovable(); 
        this.feeVerte1.setImmovable(); 
        this.feeViolette1.setImmovable(); 
        this.pharmacieVillage1.setImmovable(); 
        this.pharmacieVillage2.setImmovable(); 
       

        

        //---création d'une caméra---  
        this.physics.world.setBounds(0,0,2240,1600); 
        this.cameras.main.setBounds(0, 0, 2240, 1600);
        this.cameras.main.zoom = 1.2;

        //---suivi du joueur par la caméra--- 
        this.cameras.main.startFollow(this.player);

        //---keyboard---
        this.cursors = this.input.keyboard.createCursorKeys();//pour le clavier 

        //this.input.on('pointerdown', function (pointer) {
            //this.scene.start("grotteScene"); 
            
        //}, this); //va lancer la scène grotte quand on click sur l'écran 

        //---création d'un rectangle pour la téléportation vers la grotte---//

    }

//-----------------------------------UPDATE-----------------------------------

    update(){ 

        //---keyboard---
        this.player.setVelocity(0);

        if (this.cursors.left.isDown) //si la flèche gauche est appuyée 
        {
            this.player.setVelocityX(-150);
            this.player.anims.play("left", true);
        }

        else if (this.cursors.right.isDown) //si la flèche droite est appuyée 
        {
            this.player.setVelocityX(150);
            this.player.anims.play("right", true);
        }


        if (this.cursors.up.isDown) //si la flèche du haut est appuyée 
        {
            this.player.setVelocityY(-150);
            this.player.anims.play("up", true);
        }
    
        else if (this.cursors.down.isDown) //si la flèche du bas est appuyée 
        {
            this.player.setVelocityY(150);
            this.player.anims.play("down", true);
        }
    }
//---------------------------------------------FONCTIONS-------------------------------
    test(player, coffreBasiqueVillage1){ 
    
        coffreBasiqueVillage1.setTint(0xff0000); 
        setTimeout(() => { 
            coffreBasiqueVillage1.clearTint(); 
            coffreBasiqueVillage1.destroy();

        }, 2000); 
    
    }

    teleportationGrotte(player, grotteVillage){ 
        this.scene.start("grotteScene"); 
    }

    teleportationForet(player, portailVillageForet){ 
        this.scene.start("foretScene"); 
    }

    teleportationDonjon(player, portailVillageDonjon){ 
        this.scene.start("donjonScene"); 
    }

    pillierNoir(player, supportOrbeNoire){ 
        this.messageOrbeNoire.setVisible(true); 
       
        setTimeout(() => { 
            
            this.messageOrbeNoire.setVisible(false); 
        }, 2000); 
    }

    pillierOrange(player, supportOrbeOrange){ 
        this.messageOrbeOrange.setVisible(true); 
       
        setTimeout(() => { 
            
            this.messageOrbeOrange.setVisible(false); 
        }, 2000); 
    }

    pillierBleu(player, supportOrbeBleue){ 
        this.messageOrbeBleue.setVisible(true); 
       
        setTimeout(() => { 
            
            this.messageOrbeBleue.setVisible(false); 
        }, 2000); 
    }

    trouveCoffreBasique1(player, coffreBasique1){ 
        this.pieceCoffreBasique1.setVisible(true); 

        setTimeout(() => { 
            
            this.pieceCoffreBasique1.setVisible(false); 
        }, 2000); 

    }

    trouveCoffreBasique2(player, coffreBasique2){ 
        this.pieceCoffreBasique2.setVisible(true); 

        setTimeout(() => { 
            
            this.pieceCoffreBasique2.setVisible(false); 
        }, 2000); 

    }

    trouveCoffreBasique3(player, coffreBasique3){ 
        this.pieceCoffreBasique3.setVisible(true); 

        setTimeout(() => { 
            
            this.pieceCoffreBasique3.setVisible(false); 
        }, 2000); 

    }

    ronces(){ 
        this.cameras.main.shake(70, 0.005); 
        this.player.setTint(0xff0000); 
        setTimeout(() => {
            this.player.clearTint(); 
            this.player.anims.play("turn"); 
        }, 1000); 
        
            
    }

    traverser() {  //l'overlap ne marche pas donc n'affiche pas la bulle 
        this.bulleEau.setVisible(true); 
    }



}

//-----------------------------------SCENE GROTTE-------------------------------------------------------------------------------------------

class GrotteScene extends Phaser.Scene { 
    constructor() { 
        super("grotteScene")
    }

//-----------------------------------PRELOAD-----------------------------------

    preload() { 
        //chargement de des tuiles de jeu 
        this.load.image("tuiles", "tileset_piskel3.png"); 

        //chargement de la carte 
        this.load.tilemapTiledJSON("carte_grotte", "grotteTiled/essai_tiled_zelda_grotte.json"); 

        //ajout d'un personnage 
        this.load.spritesheet("perso", "chat22_360-Sheet.png", { frameWidth: 32, frameHeight: 32}); 

        //portail téléportation
        this.load.image("portailGrotteVillage", "assets/portailGrotteVillage.png"); 

        //monstre
        this.load.image("monstreGrotte1", "assets/monstre_grotte.gif"); 
        this.load.image("monstreGrotte2", "assets/monstre_grotte.gif"); 
        this.load.image("monstreGrotte3", "assets/monstre_grotte.gif"); 

        //---ui--
        this.load.image("barrePv1", "assets/barreHp1.png"); 
        this.load.image("chatPhoto", "assets/chatProfil.png"); 
        this.load.image("informationsFeuille", "assets/uiFeuille.png"); 

        

        

    }


//-----------------------------------CREATE-----------------------------------

    create() { 
        //---importer Tiled dans Phaser---
        //chargement de la carte 
        const carteDuNiveauGrotte = this.add.tilemap("carte_grotte"); 


        //chargement du jeu de tuiles 
        const tileset = carteDuNiveauGrotte.addTilesetImage ( 
            "tileset_piskel3",
            "tuiles"
        ); 

        //---les différents calques---
        //chargement du calque pour l'eau 
        const calque_eau_grotte = carteDuNiveauGrotte.createLayer( 
            "calque_eau_grotte", 
            tileset
        ); 

        //chargement du calque pour le sol
        const calque_sol_grotte = carteDuNiveauGrotte.createLayer( 
            "calque_sol_grotte", 
            tileset
        );

        //chargement du calque chemin
        const calque_chemin_grotte = carteDuNiveauGrotte.createLayer( 
            "calque_chemin_grotte", 
            tileset
        );

        //chargement du calque pics
        const calque_pics_grotte = carteDuNiveauGrotte.createLayer( 
            "calque_pics_grotte", 
            tileset
        );

        //chargement du calque rochers
        const calque_rochers_grotte = carteDuNiveauGrotte.createLayer( 
            "calque_rochers_grotte", 
            tileset
        );

        //---utilisation de la propriété estLiquide et estPiquant--- 
        calque_eau_grotte.setCollisionByProperty({ estLiquide: true});
        calque_pics_grotte.setCollisionByProperty({ estPiquant : true}); 

        //---ajouter les images--- 
        //ui
        this.barrePv100 = this.physics.add.image(850, 260, "barrePv1").setScrollFactor(0); 
        this.chatPhoto = this.physics.add.image(150, 110, "chatPhoto").setScrollFactor(0); 
        this.informationsUI = this.physics.add.image(320, 100, "informationsFeuille").setScrollFactor(0); 
        this.valeurPiece = this.add.text(235, 95, "0", {fontSize: 16}).setScrollFactor(0); 
        this.obtentionOrbeNoire = this.add.text(275, 95, "X", {fontSize: 16}).setScrollFactor(0);
        this.obtentionOrbeBleue = this.add.text(320, 95, "X", {fontSize: 16}).setScrollFactor(0);
        this.obtentionOrbeOrange = this.add.text(365, 95, "X", {fontSize: 16}).setScrollFactor(0);

        //---player---
        this.player = this.physics.add.sprite(100, 960, "perso"); 

        //---monster---
        this.monstreGrotte1 = this.physics.add.image(390, 560, "monstreGrotte1").setInteractive(); 
        this.monstreGrotte2 = this.physics.add.image(750, 250, "monstreGrotte2").setInteractive(); 
        this.monstreGrotte3 = this.physics.add.image(710, 220, "monstreGrotte3").setInteractive(); 

        //---elements---
        this.portailTeleportationGrotteVillage = this.physics.add.image(130,170, "portailGrotteVillage").setInteractive();
        

        
        //---collisions---
        this.player.setCollideWorldBounds(true); 
        this.physics.add.collider(this.player, calque_eau_grotte); 
        this.physics.add.collider(this.player, calque_pics_grotte, this.pics, null, this); 
        this.physics.add.collider(this.player, this.portailTeleportationGrotteVillage, this.teleportationGrotteVillage, null, this); 
        this.physics.add.collider(this.player, this.monstreGrotte1); 
        this.physics.add.collider(this.player, this.monstreGrotte2); 
        this.physics.add.collider(this.player, this.monstreGrotte3); 


        //---fixer---
        this.portailTeleportationGrotteVillage.setImmovable();
        this.monstreGrotte1.setImmovable();  
        this.monstreGrotte2.setImmovable();  
        this.monstreGrotte3.setImmovable();  
     
    
        //---animations du chat 
        this.anims.create({
            key : "left", 
            frames : this.anims.generateFrameNumbers("perso", {start: 12, end: 15 }), 
            frameRate : 8,
            //repeat : -1
        }); 

        this.anims.create({
            key : "right", 
            frames : this.anims.generateFrameNumbers("perso", {start: 4, end: 7 }), 
            frameRate : 8,
            //repeat : -1
        }); 

        this.anims.create({
            key : "up", 
            frames : this.anims.generateFrameNumbers("perso", {start: 8, end: 11 }), 
            frameRate : 8,
            //repeat : -1
        }); 

        this.anims.create({
            key : "down", 
            frames : this.anims.generateFrameNumbers("perso", {start: 0, end: 3 }), 
            frameRate : 8,
            //repeat : -1
        }); 

        this.anims.create({
            key : "turn", 
            frames : this.anims.generateFrameNumbers("perso", {start: 16, end: 19 }), 
            frameRate : 4, 
            //repeat : -1
        }); 


        
        this.cursors = this.input.keyboard.createCursorKeys();//pour le clavier 

        //---création d'une caméra---  
        this.physics.world.setBounds(0,0,960,960); 
        this.cameras.main.setBounds(0, 0, 960, 960);
        this.cameras.main.zoom = 1.2;
        //suivi du jouer par la caméra 
        this.cameras.main.startFollow(this.player);
    }

//-----------------------------------UPDATE-----------------------------------

    update() { 

        //---keyboard---
        this.player.setVelocity(0);

        if (this.cursors.left.isDown) //si la flèche gauche est appuyée 
        {
            this.player.setVelocityX(-150);
            this.player.anims.play("left", true);
        }

        else if (this.cursors.right.isDown) //si la flèche droite est appuyée 
        {
            this.player.setVelocityX(150);
            this.player.anims.play("right", true);
        }


        if (this.cursors.up.isDown) //si la flèche du haut est appuyée 
        {
            this.player.setVelocityY(-150);
            this.player.anims.play("up", true);
        }

        else if (this.cursors.down.isDown) //si la flèche du bas est appuyée 
        {
            this.player.setVelocityY(150);
            this.player.anims.play("down", true);
        }

    }

    teleportationGrotteVillage (player, portailGrotteVillage){ 
        this.scene.start("villageScene"); 
    }

    pics(){ 
        this.cameras.main.shake(70, 0.005); 
        this.player.setTint(0xff0000); 
        setTimeout(() => {
            this.player.clearTint(); 
            this.player.anims.play("turn"); 
        }, 1000); 
        
            
    }



} 
//-----------------------------------SCENE FORET-------------------------------------------------------------------------------------------
class ForetScene extends Phaser.Scene { 
    constructor() { 
        super("foretScene")
    }

//-----------------------------------PRELOAD-----------------------------------

    preload() {

        //chargement de des tuiles de jeu 
        this.load.image("tuiles", "tileset_piskel3.png"); 

        //chargement de la carte 
        this.load.tilemapTiledJSON("carte_foret", "foretTiled/essai_tiled_zelda_foret.json"); 

        //ajout d'un personnage 
        this.load.spritesheet("perso", "chat22_360-Sheet.png", { frameWidth: 32, frameHeight: 32}); 

        //---portail---
        this.load.image("portailForetVillage", "assets/portailForetVillage.png"); 

        //---ui--
        this.load.image("barrePv1", "assets/barreHp1.png"); 
        this.load.image("chatPhoto", "assets/chatProfil.png"); 
        this.load.image("informationsFeuille", "assets/uiFeuille.png"); 

    }

//-----------------------------------CREATE-----------------------------------

    create() { 

        //---importer Tiled dans Phaser---
        //chargement de la carte 
        const carteDuNiveauForet = this.add.tilemap("carte_foret"); 


        //chargement du jeu de tuiles 
        const tileset = carteDuNiveauForet.addTilesetImage ( 
            "tileset_piskel3",
            "tuiles"
        ); 

        //---les différents calques---
        //chargement du calque pour l'herbe
        const calque_herbe_foret = carteDuNiveauForet.createLayer( 
            "calque_herbe_foret", 
            tileset
        ); 

        //chargement du calque pour l'eau
        const calque_eau_foret = carteDuNiveauForet.createLayer( 
            "calque_eau_foret", 
            tileset
        );

        //chargement du calque chemin
        const calque_chemin_foret = carteDuNiveauForet.createLayer( 
            "calque_chemin_foret", 
            tileset
        );

        //chargement des reliefs
        const calque_relief_herbe_foret = carteDuNiveauForet.createLayer( 
            "calque_relief_herbe_foret", 
            tileset
        );

        //chargement des reliefs 
        const calque_herbe_relief_foret = carteDuNiveauForet.createLayer( 
            "calque_herbe_relief_foret", 
            tileset
        );

        //chargement des ronces 
        const calque_ronces_foret = carteDuNiveauForet.createLayer( 
            "calque_ronces_foret", 
            tileset
        );

        //chargement des arbres 1
        const calque_arbres1_foret = carteDuNiveauForet.createLayer( 
            "calque_arbres1_foret", 
            tileset
        );

        //chargement des arbres 2 
        const calque_arbres2_foret = carteDuNiveauForet.createLayer( 
            "calque_arbres2_foret", 
            tileset
        );

        //chargement des arbres 3 
        const calque_arbres3_foret = carteDuNiveauForet.createLayer( 
            "calque_arbres3_foret", 
            tileset
        );

        //---player---
        this.player = this.physics.add.sprite(900, 450, "perso"); 

        //---animations du chat 
        this.anims.create({
            key : "left", 
            frames : this.anims.generateFrameNumbers("perso", {start: 12, end: 15 }), 
            frameRate : 8,
            //repeat : -1
        }); 

        this.anims.create({
            key : "right", 
            frames : this.anims.generateFrameNumbers("perso", {start: 4, end: 7 }), 
            frameRate : 8,
            //repeat : -1
        }); 

        this.anims.create({
            key : "up", 
            frames : this.anims.generateFrameNumbers("perso", {start: 8, end: 11 }), 
            frameRate : 8,
            //repeat : -1
        }); 

        this.anims.create({
            key : "down", 
            frames : this.anims.generateFrameNumbers("perso", {start: 0, end: 3 }), 
            frameRate : 8,
            //repeat : -1
        }); 

        this.anims.create({
            key : "turn", 
            frames : this.anims.generateFrameNumbers("perso", {start: 16, end: 19 }), 
            frameRate : 4, 
            //repeat : -1
        }); 


        //---utilisation des propriétés 
        calque_eau_foret.setCollisionByProperty({ estLiquideForet: true});
        calque_ronces_foret.setCollisionByProperty({ estPiquantForet : true}); 
        calque_arbres1_foret.setCollisionByProperty({ estSolideForet : true});
        calque_arbres2_foret.setCollisionByProperty({ estSolideForet : true});  
        calque_arbres3_foret.setCollisionByProperty({ estSolideForet : true}); 
        calque_relief_herbe_foret.setCollisionByProperty({ estSolideForet : true}); 
        calque_herbe_relief_foret.setCollisionByProperty({ estSolideForet : true}); 
        

        //---images---
        this.portailTeleportationForetVillage = this.physics.add.image(900, 50, "portailForetVillage"); 

        //ui
        this.barrePv100 = this.physics.add.image(850, 260, "barrePv1").setScrollFactor(0); 
        this.chatPhoto = this.physics.add.image(150, 110, "chatPhoto").setScrollFactor(0); 
        this.informationsUI = this.physics.add.image(320, 100, "informationsFeuille").setScrollFactor(0); 
        this.valeurPiece = this.add.text(235, 95, "0", {fontSize: 16}).setScrollFactor(0); 
        this.obtentionOrbeNoire = this.add.text(275, 95, "X", {fontSize: 16}).setScrollFactor(0);
        this.obtentionOrbeBleue = this.add.text(320, 95, "X", {fontSize: 16}).setScrollFactor(0);
        this.obtentionOrbeOrange = this.add.text(365, 95, "X", {fontSize: 16}).setScrollFactor(0);

        //---fixer---
        this.portailTeleportationForetVillage.setImmovable(); 

        //---collisions---
        this.player.setCollideWorldBounds(true); 
        this.physics.add.collider(this.player, calque_eau_foret); 
        this.physics.add.collider(this.player, calque_ronces_foret, this.roncesForet, null, this); 
        this.physics.add.collider(this.player, calque_arbres1_foret); 
        this.physics.add.collider(this.player, calque_arbres2_foret); 
        this.physics.add.collider(this.player, calque_arbres3_foret); 
        this.physics.add.collider(this.player, calque_relief_herbe_foret); 
        this.physics.add.collider(this.player, calque_herbe_relief_foret);  
        this.physics.add.collider(this.player, this.portailTeleportationForetVillage, this.teleportationForetVillage, null, this); 


        this.cursors = this.input.keyboard.createCursorKeys();//pour le clavier 

        //---création d'une caméra---  
        this.physics.world.setBounds(0,0,960,960); 
        this.cameras.main.setBounds(0, 0, 960, 960);
        this.cameras.main.zoom = 1.2;
        //suivi du jouer par la caméra 
        this.cameras.main.startFollow(this.player);



    }
//-----------------------------------UPDATE-----------------------------------
    update() { 

        //---keyboard---
        this.player.setVelocity(0);

        if (this.cursors.left.isDown) //si la flèche gauche est appuyée 
        {
            this.player.setVelocityX(-150);
            this.player.anims.play("left", true);
        }

        else if (this.cursors.right.isDown) //si la flèche droite est appuyée 
        {
            this.player.setVelocityX(150);
            this.player.anims.play("right", true);
        }


        if (this.cursors.up.isDown) //si la flèche du haut est appuyée 
        {
            this.player.setVelocityY(-150);
            this.player.anims.play("up", true);
        }

        else if (this.cursors.down.isDown) //si la flèche du bas est appuyée 
        {
            this.player.setVelocityY(150);
            this.player.anims.play("down", true);
        }

    }

//--------------------------------------FONCTIONS------------------------------------

    teleportationForetVillage() { 
        this.scene.start("villageScene"); 
    }

    roncesForet(){ 
        this.cameras.main.shake(70, 0.005); 
        this.player.setTint(0xff0000); 
        setTimeout(() => {
            this.player.clearTint(); 
            this.player.anims.play("turn"); 
        }, 1000); 
        
            
    }
    


}

class DonjonScene extends Phaser.Scene {
    constructor() { 
        super ("donjonScene")
    }

//--------------------------------------------PRELOAD--------------------------------------
    preload() { 

        //chargement de des tuiles de jeu 
        this.load.image("tuiles", "tileset_piskel3.png"); 

        //chargement de la carte 
        this.load.tilemapTiledJSON("carte_donjon", "donjonTiled/essai_tiled_zelda_donjon.json"); 

        //ajout d'un personnage 
        this.load.spritesheet("perso", "chat22_360-Sheet.png", { frameWidth: 32, frameHeight: 32}); 

        //---portail---
        this.load.image("portailDonjonVillage", "assets/portailDonjonVillage.png"); 

        //---ui--
        this.load.image("barrePv1", "assets/barreHp1.png"); 
        this.load.image("chatPhoto", "assets/chatProfil.png"); 
        this.load.image("informationsFeuille", "assets/uiFeuille.png"); 

        //---boss---
        this.load.image("bossDonjon", "assets/boss.png"); 

    }

//--------------------------------------------CREATE--------------------------------------

    create() { 

        //---importer Tiled dans Phaser---
        //chargement de la carte 
        const carteDuNiveauDonjon = this.add.tilemap("carte_donjon"); 


        //chargement du jeu de tuiles 
        const tileset = carteDuNiveauDonjon.addTilesetImage ( 
            "tileset_piskel3",
            "tuiles"
        ); 

        //---les différents calques---
        //chargement du calque pour l'herbe
        const calque_herle_donjon = carteDuNiveauDonjon.createLayer( 
            "calque_herle_donjon", 
            tileset
        ); 

        //chargement du calque pour les arbres et le panneau 
        const calque_arbres_donjon = carteDuNiveauDonjon.createLayer( 
            "calque_arbres_donjon", 
            tileset
        );

        //chargement du calque pour les chemins
        const calque_chemin_donjon = carteDuNiveauDonjon.createLayer( 
            "calque_chemin_donjon", 
            tileset
        );

        //chargement du calque pour le sol
        const calque_sol_donjon = carteDuNiveauDonjon.createLayer( 
            "calque_sol_donjon", 
            tileset
        );

        //chargement du calque pour le mur1
        const calque_mur1_donjon = carteDuNiveauDonjon.createLayer( 
            "calque_mur1_donjon", 
            tileset
        );

        //chargement du calque pour le mur2
        const calque_mur2_donjon = carteDuNiveauDonjon.createLayer( 
            "calque_mur2_donjon", 
            tileset
        );

        //chargement du calque pour le mur3
        const calque_mur3_donjon = carteDuNiveauDonjon.createLayer( 
            "calque_mur3_donjon", 
            tileset
        );

        //chargement du calque pour les ronces 
        const calque_ronces_donjon = carteDuNiveauDonjon.createLayer( 
            "calque_ronces_donjon", 
            tileset
        );

        //---utilisation des propriétés 
        calque_ronces_donjon.setCollisionByProperty({ estPiquantDonjon: true});
        calque_arbres_donjon.setCollisionByProperty({ estSolideDonjon : true});
        calque_mur1_donjon.setCollisionByProperty({ estSolideDonjon : true}); 
        calque_mur2_donjon.setCollisionByProperty({ estSolideDonjon : true}); 
        calque_mur3_donjon.setCollisionByProperty({ estSolideDonjon : true}); 
        

        
        //---player---
        this.player = this.physics.add.sprite(1170, 930, "perso"); 

        //---boss---
        this.bossDonjon = this.physics.add.image(280, 200, "bossDonjon"); 

        //---portail---
        this.portailTeleportationDonjonVillage = this.physics.add.image(200, 200, "portailDonjonVillage").setInteractive(); 

        //---animations du chat 
        this.anims.create({
            key : "left", 
            frames : this.anims.generateFrameNumbers("perso", {start: 12, end: 15 }), 
            frameRate : 8,
            //repeat : -1
        }); 

        this.anims.create({
            key : "right", 
            frames : this.anims.generateFrameNumbers("perso", {start: 4, end: 7 }), 
            frameRate : 8,
            //repeat : -1
        }); 

        this.anims.create({
            key : "up", 
            frames : this.anims.generateFrameNumbers("perso", {start: 8, end: 11 }), 
            frameRate : 8,
            //repeat : -1
        }); 

        this.anims.create({
            key : "down", 
            frames : this.anims.generateFrameNumbers("perso", {start: 0, end: 3 }), 
            frameRate : 8,
            //repeat : -1
        }); 

        this.anims.create({
            key : "turn", 
            frames : this.anims.generateFrameNumbers("perso", {start: 16, end: 19 }), 
            frameRate : 4, 
            //repeat : -1
        }); 

        //---collisions
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, calque_arbres_donjon); 
        this.physics.add.collider(this.player, calque_ronces_donjon, this.roncesDonjon, null, this);
        this.physics.add.collider(this.player, calque_mur1_donjon);
        this.physics.add.collider(this.player, calque_mur2_donjon);
        this.physics.add.collider(this.player, calque_mur3_donjon);
        this.physics.add.collider(this.player, this.portailTeleportationDonjonVillage, this.teleportationVillageDonjon, null, this); 
        this.physics.add.collider(this.player, this.bossDonjon); 

        //---fixer un objet---
        this.portailTeleportationDonjonVillage.setImmovable(); 
        this.bossDonjon.setImmovable(); 

        //ui
        this.barrePv100 = this.physics.add.image(850, 260, "barrePv1").setScrollFactor(0); 
        this.chatPhoto = this.physics.add.image(150, 110, "chatPhoto").setScrollFactor(0); 
        this.informationsUI = this.physics.add.image(320, 100, "informationsFeuille").setScrollFactor(0); 
        this.valeurPiece = this.add.text(235, 95, "0", {fontSize: 16}).setScrollFactor(0); 
        this.obtentionOrbeNoire = this.add.text(275, 95, "X", {fontSize: 16}).setScrollFactor(0);
        this.obtentionOrbeBleue = this.add.text(320, 95, "X", {fontSize: 16}).setScrollFactor(0);
        this.obtentionOrbeOrange = this.add.text(365, 95, "X", {fontSize: 16}).setScrollFactor(0);

        this.cursors = this.input.keyboard.createCursorKeys();//pour le clavier 

        //---création d'une caméra---  
        this.physics.world.setBounds(0,0,1920,960); 
        this.cameras.main.setBounds(0, 0, 1920, 960);
        this.cameras.main.zoom = 1.2;
        //suivi du jouer par la caméra 
        this.cameras.main.startFollow(this.player);

        
    }

//--------------------------------------------UPDATE--------------------------------------

    update() { 

        //---keyboard---
        this.player.setVelocity(0);

        if (this.cursors.left.isDown) //si la flèche gauche est appuyée 
        {
            this.player.setVelocityX(-150);
            this.player.anims.play("left", true);
        }

        else if (this.cursors.right.isDown) //si la flèche droite est appuyée 
        {
            this.player.setVelocityX(150);
            this.player.anims.play("right", true);
        }


        if (this.cursors.up.isDown) //si la flèche du haut est appuyée 
        {
            this.player.setVelocityY(-150);
            this.player.anims.play("up", true);
        }

        else if (this.cursors.down.isDown) //si la flèche du bas est appuyée 
        {
            this.player.setVelocityY(150);
            this.player.anims.play("down", true);
        }

    
    }

//--------------------------------------------FONCTIONS--------------------------------------
    teleportationVillageDonjon() { 
        this.scene.start("villageScene"); 
    }

    roncesDonjon(){ 
        this.cameras.main.shake(70, 0.005); 
        this.player.setTint(0xff0000); 
        setTimeout(() => {
            this.player.clearTint(); 
            this.player.anims.play("turn"); 
        }, 1000); 
        
            
    }
}