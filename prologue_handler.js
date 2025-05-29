function showPrologue(onDone) {
    // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "prologue-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "#000";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "9999";
    overlay.style.margin = "0";
    overlay.style.padding = "0";
    overlay.style.transition = "opacity 1s";
    overlay.style.opacity = "1";
    document.body.appendChild(overlay);

    // Use a canvas for pixel-perfect scaling, just like death_handler
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 720;
    canvas.style.width = "800px";
    canvas.style.height = "720px";
    canvas.style.display = "block";
    canvas.style.margin = "0";
    canvas.style.position = "relative";
    overlay.appendChild(canvas);

    // Helper to fade in/out an image (optionally with a message image)
    function fadeImage(imgSrc, duration, callback, msgImgSrc) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Disable image smoothing for pixel-perfect rendering
        ctx.imageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.oImageSmoothingEnabled = false;

        let alpha = 0;
        let fadingIn = true;
        let fadingOut = false;
        let img = new Image();
        img.src = imgSrc;

        let msgImg = null;
        if (msgImgSrc) {
            msgImg = new Image();
            msgImg.src = msgImgSrc;
        }

        let fadeTimeout;
        let skip = false;

        let msgLoaded = !msgImgSrc;
        let imgLoaded = false;

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.globalAlpha = alpha;
            // Draw main image, scaled to canvas
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            // Draw message image if present, centered and at same size as in death_handler
            if (msgImg && msgLoaded) {
                // death_handler uses 600x200 at (100,100)
                ctx.drawImage(msgImg, 100, 100, 600, 200);
            }
            ctx.restore();
        }

        function fadeInStep() {
            if (skip) return;
            alpha += 0.04;
            if (alpha > 1) alpha = 1;
            draw();
            if (alpha < 1) {
                requestAnimationFrame(fadeInStep);
            } else {
                // Hold for duration, then fade out
                fadeTimeout = setTimeout(() => {
                    fadingIn = false;
                    fadingOut = true;
                    fadeOutStep();
                }, duration);
            }
        }

        function fadeOutStep() {
            if (skip) return;
            alpha -= 0.04;
            if (alpha < 0) alpha = 0;
            draw();
            if (alpha > 0) {
                requestAnimationFrame(fadeOutStep);
            } else {
                callback && callback();
            }
        }

        img.onload = function () {
            imgLoaded = true;
            if (msgLoaded) fadeInStep();
        };
        if (msgImg) {
            msgImg.onload = function () {
                msgLoaded = true;
                if (imgLoaded) fadeInStep();
            };
        }

        // If no msgImg, start fade in when main image is loaded
        if (!msgImg) {
            img.onload = function () {
                fadeInStep();
            };
        }

        // Return a function to skip
        return () => {
            skip = true;
            clearTimeout(fadeTimeout);
            callback && callback();
        };
    }

    // Sequence logic
    let skipFn = null;
    let step = 0;
    function nextStep() {
        step++;
        if (step === 1) {
            skipFn = fadeImage("images/events/black.png", 5000, nextStep, "images/events/prologue_text1.png");
        } else if (step === 2) {
            skipFn = fadeImage("images/events/black.png", 5000, nextStep, "images/events/prologue_text2.png");
        } else if (step === 3) {
            skipFn = fadeImage("images/events/black.png", 5000, nextStep, "images/events/prologue_text3.png");
        } else if (step === 4) {
            unsheath = AudioFX("sounds/unsheath.mp3");
            unsheath.play();
            skipFn = fadeImage("images/events/prologue.png", 5000, () => {
                overlay.style.transition = "opacity 2s";
                overlay.style.opacity = "0";
                setTimeout(() => {
                    document.body.removeChild(overlay);
                    if (typeof onDone === "function") onDone();
                }, 2000);
            });
        }
    }

    // Skip handler
    function skipPrologue(e) {
        if (e.key === "Enter") {
            window.removeEventListener("keydown", skipPrologue);
            if (skipFn) skipFn();
            overlay.style.transition = "opacity 0.7s";
            overlay.style.opacity = "0";
            setTimeout(() => {
                document.body.removeChild(overlay);
                if (typeof onDone === "function") onDone();
            }, 700);
        }
    }
    window.addEventListener("keydown", skipPrologue);

    // Start sequence
    nextStep();
}