// Script para la web de VACILEO - Efectos especiales y funcionalidades

// Variables globales para móvil
let isNavOpen = false;

// Función para toggle del menú móvil
function toggleNav() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    isNavOpen = !isNavOpen;
    
    if (isNavOpen) {
        navMenu.classList.add('active');
        navToggle.style.transform = 'rotate(90deg)';
    } else {
        navMenu.classList.remove('active');
        navToggle.style.transform = 'rotate(0deg)';
    }
}

// Cerrar menú al hacer click en un enlace (móvil)
function closeNavOnClick() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                toggleNav();
            }
        });
    });
}

// Función para reproducir sonido de sirena (simulado)
function playSound() {
    // Crear un contexto de audio para simular sirena
    if (typeof(AudioContext) !== "undefined" || typeof(webkitAudioContext) !== "undefined") {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Crear oscilador para simular sirena
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.5);
        oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 1);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 1);
    }
    
    // Efecto visual de sirena
    document.body.style.animation = 'none';
    setTimeout(() => {
        document.body.style.animation = 'sirenEffect 0.1s infinite';
        setTimeout(() => {
            document.body.style.animation = 'none';
        }, 2000);
    }, 10);
    
    // Mostrar mensaje de alerta divertido
    showPoliceAlert();
    
    // Vibración en dispositivos móviles
    if ('vibrate' in navigator) {
        navigator.vibrate([200, 100, 200, 100, 200]);
    }
}

// Función para mostrar alerta policial divertida
function showPoliceAlert() {
    const alerts = [
        "🚨 ALERTA: Poli hijo de puta detectado 🚨",
        "🚔 ATENCIÓN: Madero cabrón identificado 🚔",
        "👮‍♂️ AVISO: Que se jodan todos los polis 👮‍♂️",
        "🚨 CÓDIGO ROJO: Modo anti-maderos activado 🚨",
        "🚔 EMERGENCIA: Nivel de cabronada al máximo 🚔"
    ];
    
    const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
    
    // Crear elemento de alerta
    const alertDiv = document.createElement('div');
    alertDiv.className = 'floating-alert';
    alertDiv.innerHTML = randomAlert;
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #ff6b6b, #ee5a24);
        color: white;
        padding: 20px;
        border-radius: 10px;
        border: 3px solid #ffd700;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-weight: bold;
        animation: slideIn 0.5s ease, pulse 1s infinite;
        max-width: 300px;
        text-align: center;
    `;
    
    document.body.appendChild(alertDiv);
    
    // Remover alerta después de 3 segundos
    setTimeout(() => {
        alertDiv.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(alertDiv);
        }, 500);
    }, 3000);
}

// Efecto de lluvia de emojis policiales
function createEmojiRain() {
    const emojis = ['🚨', '👮‍♂️', '🚔', '🚓', '👮‍♀️', '🔫', '🚁', '🏃‍♂️'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.cssText = `
                position: fixed;
                top: -50px;
                left: ${Math.random() * 100}vw;
                font-size: ${Math.random() * 20 + 20}px;
                z-index: 1000;
                pointer-events: none;
                animation: fall ${Math.random() * 3 + 2}s linear;
            `;
            
            document.body.appendChild(emoji);
            
            setTimeout(() => {
                if (document.body.contains(emoji)) {
                    document.body.removeChild(emoji);
                }
            }, 5000);
        }, i * 200);
    }
}

// Contador de visitantes "sospechosos"
function updateSuspiciousCounter() {
    const counter = localStorage.getItem('suspiciousVisits') || 0;
    const newCount = parseInt(counter) + 1;
    localStorage.setItem('suspiciousVisits', newCount);
    
    // Mostrar contador en consola para los curiosos
    console.log(`🕵️‍♂️ Visita sospechosa #${newCount} detectada`);
    console.log('👮‍♂️ Estamos vigilando... pero no muy bien 😄');
}

// Función para detectar si el usuario está "huyendo" (saliendo de la página)
function detectEscape() {
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            console.log('🏃‍♂️ ¡SOSPECHOSO DETECTADO HUYENDO!');
            console.log('👮‍♂️ No te preocupes, no te seguiremos... somos muy lentos');
        }
    });
}

// Mensajes aleatorios en la consola para desarrolladores curiosos
function consoleMessages() {
    const messages = [
        '👮‍♂️ ¿Qué coño haces aquí, cabrón curioso?',
        '🚨 CÓDIGO DETECTADO: Algún hijo de puta está mirando',
        '🚔 Aquí no hay nada para ti, gilipollas 😏',
        '👮‍♀️ Si eres poli, que te jodan',
        '🕵️‍♂️ Buen intento, madero de mierda',
        '🚨 ALERTA: Cabrón detectado. Nivel de peligro: Máximo',
        '👮‍♂️ ¿Buscas pruebas? Aquí solo hay odio hacia los polis'
    ];
    
    setInterval(() => {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        console.log(randomMessage);
    }, 30000); // Cada 30 segundos
}

// Efecto de parpadeo para elementos importantes
function addBlinkEffect() {
    const blinkElements = document.querySelectorAll('.alert-box, .case-number');
    blinkElements.forEach(element => {
        setInterval(() => {
            element.style.opacity = element.style.opacity === '0.5' ? '1' : '0.5';
        }, 1000);
    });
}

// Función para crear efectos de matriz (como en las películas de hackers)
function createMatrixEffect() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: -1;
        opacity: 0.1;
    `;
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '🚨👮‍♂️🚔🚓👮‍♀️VACILEO01';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ffd700';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 100);
}

// Función para mostrar "evidencia" falsa
function showFakeEvidence() {
    const evidences = [
        "📁 Archivo encontrado: 'como_joder_polis_profesionalmente.pdf'",
        "🔍 Rastro detectado: Sangre de madero en las manos",
        "📱 Última búsqueda: 'Cómo hacer que un poli parezca gilipollas'",
        "💻 IP rastreada: Tu puta madre (muy cabrón)",
        "🕵️ Evidencia: Historial de odio hacia la autoridad",
        "📋 Reporte: Nivel de cabronada detectado: EXTREMO"
    ];
    
    setInterval(() => {
        const evidence = evidences[Math.floor(Math.random() * evidences.length)];
        console.log(`🔍 EVIDENCIA: ${evidence}`);
    }, 45000); // Cada 45 segundos
}

// Función para el efecto de "hackeo" en el título
function hackTitle() {
    const originalTitle = document.title;
    const hackTitles = [
        '🚨 JÓDETE POLI DE MIERDA 🚨',
        '👮‍♂️ QUE TE JODAN MADERO 👮‍♂️',
        '🚔 TODOS LOS POLIS SON CABRONES 🚔',
        '🕵️ MUERTE A LA AUTORIDAD 🕵️'
    ];
    
    let titleIndex = 0;
    setInterval(() => {
        if (Math.random() > 0.95) { // 5% de probabilidad cada segundo
            document.title = hackTitles[titleIndex % hackTitles.length];
            titleIndex++;
            
            setTimeout(() => {
                document.title = originalTitle;
            }, 2000);
        }
    }, 1000);
}

// Función para detectar teclas especiales (como un verdadero hacker)
function detectSpecialKeys() {
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
            activateSecretMode();
            konamiCode = [];
        }
        
        // Easter egg para F12 (herramientas de desarrollador)
        if (e.key === 'F12') {
            console.log('🚨 ¡ALERTA! ¡Herramientas de desarrollador detectadas!');
            console.log('👮‍♂️ Pero no te preocupes, somos policías muy relajados 😎');
        }
    });
}

// Modo secreto activado por el código Konami
function activateSecretMode() {
    console.log('🎉 ¡MODO SECRETO ACTIVADO!');
    console.log('🚨 Felicidades, has desbloqueado el nivel máximo de vacileo');
    
    // Cambiar el fondo temporalmente
    document.body.style.background = 'linear-gradient(45deg, #ff0000, #00ff00, #0000ff, #ffff00)';
    document.body.style.animation = 'rainbow 2s infinite';
    
    // Crear lluvia de emojis
    createEmojiRain();
    
    // Mostrar mensaje especial
    showPoliceAlert();
    
    // Restaurar después de 10 segundos
    setTimeout(() => {
        document.body.style.background = '';
        document.body.style.animation = '';
    }, 10000);
}

// Función para simular "vigilancia" del mouse
function trackMouse() {
    let mouseTracker = 0;
    document.addEventListener('mousemove', function() {
        mouseTracker++;
        
        if (mouseTracker % 1000 === 0) {
            console.log(`🖱️ Movimiento de mouse #${mouseTracker} registrado`);
            console.log('👮‍♂️ Seguimos tu rastro... pero perdemos la cuenta fácilmente');
        }
    });
}

// Inicialización cuando la página carga
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚨 SISTEMA ANTI-MADEROS INICIADO 🚨');
    console.log('👮‍♂️ Bienvenido al infierno de los polis, cabrones');
    
    // Inicializar funciones móviles
    closeNavOnClick();
    
    // Inicializar todas las funciones
    updateSuspiciousCounter();
    detectEscape();
    consoleMessages();
    addBlinkEffect();
    createMatrixEffect();
    showFakeEvidence();
    hackTitle();
    detectSpecialKeys();
    trackMouse();
    
    // Mensaje de bienvenida especial
    setTimeout(() => {
        console.log('🎭 Bienvenido al reino donde los polis son la mierda');
        console.log('⚖️ Aquí todos los maderos son cabrones y merecen joderse 😄');
    }, 3000);
    
    // Smooth scrolling para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Agregar estilos CSS adicionales para las animaciones
const additionalStyles = `
    @keyframes sirenEffect {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes fall {
        to { transform: translateY(100vh) rotate(360deg); }
    }
    
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    .floating-alert {
        animation: slideIn 0.5s ease, pulse 1s infinite;
    }
`;

// Agregar los estilos al documento
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Función para mostrar estadísticas falsas en tiempo real
function updateFakeStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    setInterval(() => {
        stats.forEach((stat, index) => {
            if (index === 1) { // El de "Nivel de Diversión"
                const currentValue = parseInt(stat.textContent.replace('%', ''));
                if (currentValue < 100) {
                    stat.textContent = (currentValue + 1) + '%';
                }
            } else if (index === 2) { // El de "Veces que nos Hemos Reído"
                stat.textContent = '∞+' + Math.floor(Math.random() * 1000);
            }
        });
    }, 5000); // Cada 5 segundos
}

// Inicializar estadísticas falsas después de que la página cargue
window.addEventListener('load', function() {
    setTimeout(updateFakeStats, 2000);
});

// Función para detectar si alguien intenta copiar el código
document.addEventListener('copy', function() {
    console.log('📋 ¡Alguien está copiando nuestros secretos!');
    console.log('🚨 Cuidado, los chivatos están en todas partes 😄');
});

// Función para detectar si alguien intenta hacer clic derecho
document.addEventListener('contextmenu', function(e) {
    // No prevenir el clic derecho, solo detectarlo
    console.log('🖱️ Clic derecho detectado - Comportamiento sospechoso');
    console.log('👮‍♂️ Los polis nunca aprenden a usar F12 🔍');
});

console.log('🎉 SISTEMA ANTI-POLIS CARGADO COMPLETAMENTE');
console.log('🚨 Sistema de odio hacia maderos: OPERATIVO');
console.log('👮‍♂️ ¡Que se jodan todos los cabrones con placa!');