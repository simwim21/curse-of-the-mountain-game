// MainMenu class to show the main menu and block the game until "Start" is pressed

function MainMenu(onStartCallback) {
    this.canvas = document.getElementById("main-menu");
    this.context = this.canvas.getContext("2d");
    this.context.imageSmoothingEnabled = false;

    // Load the main menu image
    this.menuImage = new Image();
    this.menuImage.src = "images/menu/main_menu2.png";

    // Load button images
    this.startButtonImg = new Image();
    this.startButtonImg.src = "images/menu/start_button.png";

    // Load the adventure title image
    this.titleImg = new Image();
    this.titleImg.src = "images/menu/adventure.png";

    // Center the start button horizontally
    const buttonWidth = 340;
    const buttonHeight = 80;
    this.startButton = {
        x: (this.canvas.width - buttonWidth) / 2,
        y: 900,
        width: buttonWidth,
        height: buttonHeight
    };

    this.isActive = true;
    this.onStart = onStartCallback;

    // Bind event handler
    this._onClick = this.handleClick.bind(this);
    this.canvas.addEventListener("click", this._onClick);

    this.music = AudioFX("sounds/main_menu_louder.mp3", { loop: true });
    this.music.play();

    this.buttonClicked = AudioFX("sounds/menu_button_clicked.mp3");

    // Draw loop
    this.draw();
}

MainMenu.prototype.draw = function() {
    if (!this.isActive) return;

    // Clear the canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw the menu background image
    if (this.menuImage.complete) {
        this.context.drawImage(this.menuImage, 0, 0, this.canvas.width, this.canvas.height);
    } else {
        this.menuImage.onload = () => this.draw();
    }

    // Draw the adventure title image, centered at the top and resized
    if (this.titleImg.complete) {
        const desiredWidth = 1000;
        const scale = desiredWidth / this.titleImg.width;
        const desiredHeight = this.titleImg.height * scale;
        const x = (this.canvas.width - desiredWidth) / 2;
        const y = -40; // Top margin
        this.context.drawImage(
            this.titleImg,
            x,
            y,
            desiredWidth,
            desiredHeight
        );
    } else {
        this.titleImg.onload = () => this.draw();
    }

    // Draw the start button image centered
    if (this.startButtonImg.complete) {
        this.context.drawImage(
            this.startButtonImg,
            this.startButton.x,
            this.startButton.y,
            this.startButton.width,
            this.startButton.height
        );
    } else {
        this.startButtonImg.onload = () => this.draw();
    }
};

MainMenu.prototype.handleClick = function(event) {
    if (!this.isActive) return;

    // Get mouse position relative to canvas
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = (event.clientX - rect.left) * (this.canvas.width / rect.width);
    const mouseY = (event.clientY - rect.top) * (this.canvas.height / rect.height);

    // Check if click is inside the start button
    if (
        mouseX >= this.startButton.x && mouseX <= this.startButton.x + this.startButton.width &&
        mouseY >= this.startButton.y && mouseY <= this.startButton.y + this.startButton.height
    ) {
        this.buttonClicked.play();
        this.music.stop();

        // Start fade out effect
        this.startFadeOut(() => {
            this.hide();
            showPrologue(() => {
                if (typeof this.onStart === "function") this.onStart();
            });
        });

        return;
    }
    // No instructions/menu button anymore
};

// Add fade out logic
MainMenu.prototype.startFadeOut = function(callback) {
    let alpha = 0;
    const fadeDuration = 1500; // ms
    const delayAfterFade = 500; // ms
    const startTime = performance.now();
    const ctx = this.context;
    const canvas = this.canvas;

    // Block all keyboard input during fade out
    this._oldKeyboard = window.keyboard ? window.keyboard.slice() : [];
    window.keyboard = [];
    this._blockKeys = true;

    // Optionally, block keydown/keyup events as well
    this._keydownHandler = function(e) { if (this._blockKeys) e.preventDefault(); }.bind(this);
    this._keyupHandler = function(e) { if (this._blockKeys) e.preventDefault(); }.bind(this);
    window.addEventListener("keydown", this._keydownHandler, true);
    window.addEventListener("keyup", this._keyupHandler, true);

    const drawFade = () => {
        const now = performance.now();
        alpha = Math.min(1, (now - startTime) / fadeDuration);

        // Redraw menu and buttons
        this.draw();

        // Draw black overlay
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1.0;
        ctx.restore();

        if (alpha < 1) {
            requestAnimationFrame(drawFade);
        } else {
            setTimeout(() => {
                // Restore keyboard input
                if (this._oldKeyboard) window.keyboard = this._oldKeyboard;
                this._blockKeys = false;
                window.removeEventListener("keydown", this._keydownHandler, true);
                window.removeEventListener("keyup", this._keyupHandler, true);
                callback();
            }, delayAfterFade);
        }
    };
    drawFade();
};

MainMenu.prototype.hide = function() {
    this.isActive = false;
    this.canvas.style.display = "none";
    this.canvas.removeEventListener("click", this._onClick);
};