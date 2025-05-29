function showEpilogue(onDone) {
    // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "epilogue-overlay";
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
    overlay.style.transition = "opacity 1.5s";
    overlay.style.opacity = "0"; // Start transparent for slower fade in
    document.body.appendChild(overlay);

    // Use a canvas for pixel-perfect scaling
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
    function fadeImage(imgSrc, duration, callback, msgImgSrc, fadeInSpeed = 0.02) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Disable image smoothing for pixel-perfect rendering
        ctx.imageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.oImageSmoothingEnabled = false;

        let alpha = 0;
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
                ctx.drawImage(msgImg, 100, 100, 600, 200);
            }
            ctx.restore();
        }

        function fadeInStep() {
            if (skip) return;
            alpha += fadeInSpeed;
            if (alpha > 1) alpha = 1;
            draw();
            if (alpha < 1) {
                requestAnimationFrame(fadeInStep);
            } else {
                // Hold for duration, then fade out
                fadeTimeout = setTimeout(() => {
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
    let allowSkip = false;
    function nextStep() {
        step++;
        if (step === 1) {
            skipFn = fadeImage("images/events/epilogue.png", 5000, nextStep, "images/events/ending-text.png", 0.02); // slower fade in
        } else if (step === 2) {
            allowSkip = true;
            skipFn = fadeImage("images/events/epilogue2.png", 10000, () => {
                overlay.style.transition = "opacity 2s";
                overlay.style.opacity = "1";
                setTimeout(() => {
                    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
                    location.reload(); // <-- Automatically reload after credits
                    if (typeof onDone === "function") onDone();
                }, 2000);
            }, "images/events/credits.png", 0.02); // slower fade in
        }
    }

    // Skip handler: only works after the last image is shown
    function skipEpilogue(e) {
        if (e.key === "Enter" && allowSkip) {
            window.removeEventListener("keydown", skipEpilogue);
            if (skipFn) skipFn();
            overlay.style.transition = "opacity 0.7s";
            overlay.style.opacity = "1";
            setTimeout(() => {
                if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
                location.reload();
            }, 700);
        }
    }
    window.addEventListener("keydown", skipEpilogue);

    // Slow fade in overlay at start
    setTimeout(() => {
        overlay.style.opacity = "1";
    }, 10);

    // Start sequence
    nextStep();
}