function SoundManager() {

    this.suite = AudioFX("sounds/suite(reduced).mp3", { loop: true });
    // this.suite.play();

    this.hit = AudioFX("sounds/hit.mp3");
    this.attack = AudioFX("sounds/attack.wav");
    this.rupee = AudioFX("sounds/rupee.mp3");
    this.small_heal = AudioFX("sounds/small_heal.mp3");
    this.big_heal = AudioFX("sounds/big_heal.mp3");
    this.good = AudioFX("sounds/good.mp3");
    this.chest = AudioFX("sounds/chest.mp3");
    this.block = AudioFX("sounds/block.mp3");
    this.button = AudioFX("sounds/button.mp3");
    this.stones = AudioFX("sounds/stones.mp3");

    console.log("SoundManager initialized");
}

SoundManager.prototype.addLink = function(link)
{
    this.link = link;
}

SoundManager.prototype.addLevelManager = function(levelManager)
{
    this.levelManager = levelManager;
}

SoundManager.prototype.playSound = function(sound)
{
    if (sound == "hit") {
        this.hit.stop();
        this.hit.play();
        return;
    }
    if (sound == "attack") {
        this.hit.stop();
        this.attack.play();
        return;
    }
    if (sound == "rupee") {
        this.rupee.play();
        return;
    }
    if (sound == "small_heal")
    {
        this.small_heal.play();
        return;
    }
    if (sound == "big_heal")
    {
        this.big_heal.play();
        return;
    }
    if (sound == "good")
    {
        this.good.play();
        return;
    }
    if (sound == "chest")
    {
        this.chest.play();
        return;
    }
    if (sound == "block") 
    {
        this.block.stop();
        this.block.play();
        return;
    }
    if (sound == "button") 
    {
        this.button.play();
        return;
    }
    if (sound == "stones") 
    {
        this.stones.play();
        return;
    }

    
}