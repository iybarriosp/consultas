document.addEventListener("DOMContentLoaded", function() {
    const colors = ["#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#4b0082", "#8b00ff"]; // Colores del arcoíris
    let currentIndex = 0;

    function changeColors() {
        const circle = document.querySelector('.circle');
        const logoText = document.querySelector('.logo-text');

        circle.style.borderColor = colors[currentIndex % colors.length];
        circle.style.boxShadow = `
            0 0 10px ${colors[currentIndex % colors.length]},
            0 0 20px ${colors[currentIndex % colors.length]},
            0 0 30px ${colors[currentIndex % colors.length]},
            0 0 40px ${colors[currentIndex % colors.length]},
            0 0 50px ${colors[currentIndex % colors.length]}
        `;

        logoText.style.textShadow = `
            0 0 5px #fff,
            0 0 10px #fff,
            0 0 20px ${colors[(currentIndex + 1) % colors.length]},
            0 0 30px ${colors[(currentIndex + 1) % colors.length]},
            0 0 40px ${colors[(currentIndex + 1) % colors.length]},
            0 0 50px ${colors[(currentIndex + 1) % colors.length]}
        `;

        currentIndex++;
    }

    changeColors();
    setInterval(changeColors, 1000); // Cambiar colores cada 10 segundos
});