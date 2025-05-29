function handleLinkDeath() {
    // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "game-over-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "rgba(0,0,0,1)";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "9999";
    overlay.style.margin = "0";
    overlay.style.padding = "0";
    overlay.style.opacity = "0"; // Start transparent
    overlay.style.transition = "opacity 0.7s";

    // Use a canvas to draw the images without smoothing
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 720;
    canvas.style.width = "800px";
    canvas.style.height = "720px";
    canvas.style.display = "block";
    canvas.style.margin = "0";
    canvas.style.position = "relative";
    overlay.appendChild(canvas);

    document.body.appendChild(overlay);

    // Load images
    const img = new Image();
    img.src = "images/events/death.png";
    const msgImg = new Image();
    msgImg.src = "images/events/death_message.png";

    // Draw images when both are loaded
    let loaded = 0;
    function drawImages() {
        const ctx = canvas.getContext("2d");
        // Disable image smoothing for pixel-perfect rendering
        ctx.imageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.oImageSmoothingEnabled = false;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, 800, 720);
        ctx.drawImage(msgImg, 100, 100, 600, 200); // Adjust position/size as needed
    }
    img.onload = () => { loaded++; if (loaded === 2) drawImages(); };
    msgImg.onload = () => { loaded++; if (loaded === 2) drawImages(); };

    // Fade in
    setTimeout(() => {
        overlay.style.opacity = "1";
    }, 10);

    // Listen for Enter key to fade out and reload the page
    function onKeyDown(e) {
        if (e.key === "Enter") {
            window.removeEventListener("keydown", onKeyDown);
            // Fade out canvas first, then fade overlay to black
            canvas.style.transition = "opacity 0.7s";
            canvas.style.opacity = "0";
            setTimeout(() => {
                overlay.style.background = "rgba(0,0,0,1)";
                setTimeout(() => {
                    overlay.style.opacity = "1";
                    setTimeout(() => {
                        location.reload();
                    }, 700);
                }, 400);
            }, 700); // Wait for canvas fade out
        }
    }
    window.addEventListener("keydown", onKeyDown);
}