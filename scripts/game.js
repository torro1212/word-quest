/**
 * Zaffo Word Quest - Game Logic
 * A premium children's English learning game
 */

// ==========================================
// GAME DATA
// ==========================================

const WORLDS = {
    animalValley: {
        name: "Animal Valley",
        icon: "🐾",
        words: [
            { word: "Dog", image: "assets/images/animals/dog.png" },
            { word: "Cat", image: "assets/images/animals/cat.png" },
            { word: "Cow", image: "assets/images/animals/cow.png" },
            { word: "Bird", image: "assets/images/animals/bird.png" },
            { word: "Fish", image: "assets/images/animals/fish.png" },
            { word: "Pig", image: "assets/images/animals/pig.png" },
            { word: "Duck", image: "assets/images/animals/duck.png" },
            { word: "Frog", image: "assets/images/animals/frog.png" },
            { word: "Bee", image: "assets/images/animals/bee.png" },
            { word: "Bear", image: "assets/images/animals/bear.png" }
        ],
        wrongOptions: ["Car", "Ball", "Tree", "House", "Book", "Sun", "Moon", "Star", "Apple", "Banana"]
    },
    fruitGarden: {
        name: "Fruit Garden",
        icon: "🍎",
        words: [
            { word: "Apple", image: "assets/images/fruits/apple.png" },
            { word: "Banana", image: "assets/images/fruits/banana.png" },
            { word: "Orange", image: "assets/images/fruits/orange.png" },
            { word: "Grape", image: "assets/images/fruits/grape.png" },
            { word: "Lemon", image: "assets/images/fruits/lemon.png" },
            { word: "Pear", image: "assets/images/fruits/pear.png" },
            { word: "Cherry", image: "assets/images/fruits/cherry.png" },
            { word: "Mango", image: "assets/images/fruits/mango.png" },
            { word: "Peach", image: "assets/images/fruits/peach.png" },
            { word: "Plum", image: "assets/images/fruits/plum.png" }
        ],
        wrongOptions: ["Dog", "Cat", "Bird", "Tree", "Sun", "Moon", "Ball", "Key", "Bed", "Cup"]
    },
    myHouse: {
        name: "My House",
        icon: "🏠",
        words: [
            { word: "Ball", image: "assets/images/house/ball.png" },
            { word: "Book", image: "assets/images/house/book.png" },
            { word: "Cup", image: "assets/images/house/cup.png" },
            { word: "Bed", image: "assets/images/house/bed.png" },
            { word: "Chair", image: "assets/images/house/chair.png" },
            { word: "Table", image: "assets/images/house/table.png" },
            { word: "Door", image: "assets/images/house/door.png" },
            { word: "Lamp", image: "assets/images/house/lamp.png" },
            { word: "Clock", image: "assets/images/house/clock.png" },
            { word: "Key", image: "assets/images/house/key.png" }
        ],
        wrongOptions: ["Dog", "Cat", "Apple", "Sun", "Tree", "Fish", "Bird", "Moon", "Star", "Leaf"]
    },
    natureLand: {
        name: "Nature Land",
        icon: "🌈",
        words: [
            { word: "Sun", image: "assets/images/nature/sun.png" },
            { word: "Moon", image: "assets/images/nature/moon.png" },
            { word: "Star", image: "assets/images/nature/star.png" },
            { word: "Tree", image: "assets/images/nature/tree.png" },
            { word: "Flower", image: "assets/images/nature/flower.png" },
            { word: "Cloud", image: "assets/images/nature/cloud.png" },
            { word: "Rain", image: "assets/images/nature/rain.png" },
            { word: "Snow", image: "assets/images/nature/snow.png" },
            { word: "Leaf", image: "assets/images/nature/leaf.png" },
            { word: "Grass", image: "assets/images/nature/grass.png" }
        ],
        wrongOptions: ["Dog", "Cat", "Apple", "Ball", "Cup", "Book", "Fish", "Bird", "Bed", "Key"]
    },
    myBody: {
        name: "My Body",
        icon: "👦",
        words: [
            { word: "Eye", image: "assets/images/body/eye.png" },
            { word: "Ear", image: "assets/images/body/ear.png" },
            { word: "Nose", image: "assets/images/body/Nose.png" },
            { word: "Hand", image: "assets/images/body/Hand.png" },
            { word: "Foot", image: "assets/images/body/Foot.png" },
            { word: "Head", image: "assets/images/body/Head.png" },
            { word: "Arm", image: "assets/images/body/Arm.png" },
            { word: "Leg", image: "assets/images/body/Leg.png" },
            { word: "Hair", image: "assets/images/body/Hair.png" },
            { word: "Face", image: "assets/images/body/Face.png" }
        ],
        wrongOptions: ["Sun", "Moon", "Apple", "Ball", "Dog", "Cat", "Tree", "Book", "Cup", "Key"]
    },
    colorWorld: {
        name: "Color World",
        icon: "🎨",
        words: [
            { word: "Red", image: "assets/images/Colors/red.png" },
            { word: "Blue", image: "assets/images/Colors/blue.png" },
            { word: "Green", image: "assets/images/Colors/green.png" },
            { word: "Yellow", image: "assets/images/Colors/yellow.png" },
            { word: "Orange", image: "assets/images/Colors/orange.png" },
            { word: "Purple", image: "assets/images/Colors/purple.png" },
            { word: "Pink", image: "assets/images/Colors/pink.png" },
            { word: "Brown", image: "assets/images/Colors/brown.png" },
            { word: "Black", image: "assets/images/Colors/black.png" },
            { word: "White", image: "assets/images/Colors/white.png" }
        ],
        wrongOptions: ["Dog", "Cat", "Ball", "Tree", "Sun", "Moon", "Apple", "Cup", "Book", "Key"]
    },
    toyBox: {
        name: "Toy Box",
        icon: "🧸",
        words: [
            { word: "Ball", image: "assets/images/TOYS/ball.png" },
            { word: "Doll", image: "assets/images/TOYS/doll.png" },
            { word: "Teddy", image: "assets/images/TOYS/teddy.png" },
            { word: "Train", image: "assets/images/TOYS/train.png" },
            { word: "Blocks", image: "assets/images/TOYS/blocks.png" },
            { word: "Robot", image: "assets/images/TOYS/robot.png" },
            { word: "Kite", image: "assets/images/TOYS/kite.png" },
            { word: "Duck", image: "assets/images/TOYS/duck.png" },
            { word: "Drum", image: "assets/images/TOYS/drum.png" },
            { word: "Plane", image: "assets/images/TOYS/plane.png" }
        ],
        wrongOptions: ["Dog", "Cat", "Apple", "Sun", "Moon", "Tree", "Flower", "Star", "Fish", "Bird"]
    },
    myClothes: {
        name: "My Clothes",
        icon: "👕",
        words: [
            { word: "Shirt", image: "assets/images/clothes/shirt.png" },
            { word: "Pants", image: "assets/images/clothes/pants.png" },
            { word: "Shoes", image: "assets/images/clothes/shoes.png" },
            { word: "Hat", image: "assets/images/clothes/hat.png" },
            { word: "Dress", image: "assets/images/clothes/dress.png" },
            { word: "Socks", image: "assets/images/clothes/socks.png" },
            { word: "Jacket", image: "assets/images/clothes/jacket.png" },
            { word: "Shorts", image: "assets/images/clothes/shorts.png" },
            { word: "Skirt", image: "assets/images/clothes/skirt.png" },
            { word: "Sweater", image: "assets/images/clothes/sweater.png" }
        ],
        wrongOptions: ["Dog", "Cat", "Apple", "Ball", "Sun", "Moon", "Tree", "Book", "Cup", "Key"]
    },
    shapeLand: {
        name: "Shape Land",
        icon: "🔷",
        words: [
            { word: "Circle", image: "assets/images/shapes/circle.png" },
            { word: "Square", image: "assets/images/shapes/square.png" },
            { word: "Triangle", image: "assets/images/shapes/triangle.png" },
            { word: "Heart", image: "assets/images/shapes/heart.png" },
            { word: "Star", image: "assets/images/shapes/star.png" },
            { word: "Plus", image: "assets/images/shapes/plus.png" }
        ],
        wrongOptions: ["Dog", "Cat", "Apple", "Ball", "Sun", "Moon", "Tree", "Book", "Cup", "Key"]
    },
    vehicleCity: {
        name: "Vehicle City",
        icon: "🚗",
        words: [
            { word: "Car", image: "assets/images/vehicles/car.png" },
            { word: "Bus", image: "assets/images/vehicles/bus.png" },
            { word: "Train", image: "assets/images/vehicles/train.jpg" },
            { word: "Airplane", image: "assets/images/vehicles/airplane.png" },
            { word: "Boat", image: "assets/images/vehicles/boat.png" },
            { word: "Truck", image: "assets/images/vehicles/truck.png" },
            { word: "Bicycle", image: "assets/images/vehicles/bicycle.png" },
            { word: "Motorcycle", image: "assets/images/vehicles/motorcycle.png" },
            { word: "Helicopter", image: "assets/images/vehicles/helicopter.png" },
            { word: "Taxi", image: "assets/images/vehicles/taxi.png" }
        ],
        wrongOptions: ["Dog", "Cat", "Apple", "Ball", "Sun", "Moon", "Tree", "Book", "Cup", "Key"]
    }
};

const WORLD_ORDER = ["animalValley", "fruitGarden", "myHouse", "natureLand", "myBody", "colorWorld", "toyBox", "myClothes", "shapeLand", "vehicleCity"];



// ==========================================
// GAME STATE
// ==========================================

const gameState = {
    currentWorldIndex: 0,
    currentWorld: "animalValley",
    currentQuestionIndex: 0,
    stars: 0,
    coins: 0,
    streak: 0,
    totalQuestions: 10,
    isAnswering: false,
    idleTimer: null,
    IDLE_TIMEOUT: 20000, // 20 seconds
    wrongWords: [], // Spaced repetition - words to review
    questionQueue: [] // Mixed queue of new and review words
};


// ==========================================
// DOM ELEMENTS
// ==========================================

const elements = {
    animalImage: document.getElementById('animal-image'),
    answerButtons: document.querySelectorAll('.answer-btn'),
    speakerIcons: document.querySelectorAll('.speaker-icon'),
    feedbackText: document.getElementById('feedback-text'),
    starsCount: document.getElementById('stars-count'),
    starsTotal: document.getElementById('stars-total'),
    coinsCount: document.getElementById('coins-count'),
    streakCount: document.getElementById('streak-count'),
    streakDisplay: document.getElementById('streak-display'),
    wordText: document.getElementById('word-text'),
    wordSpeaker: document.getElementById('word-speaker'),
    mascotCharacter: document.getElementById('mascot-character'),
    mascotBubble: document.getElementById('mascot-bubble'),
    mascotMessage: document.getElementById('mascot-message'),
    celebrationOverlay: document.getElementById('celebration-overlay'),
    starAnimation: document.getElementById('star-animation'),
    sparkles: document.querySelector('.sparkles'),
    idleOverlay: document.getElementById('idle-overlay'),
    idleResumeBtn: document.getElementById('idle-resume-btn'),
    completeOverlay: document.getElementById('complete-overlay'),
    completeCoinsCount: document.getElementById('complete-coins-count'),
    playAgainBtn: document.getElementById('play-again-btn'),
    prevWorldBtn: document.getElementById('prev-world-btn'),
    nextWorldBtn: document.getElementById('next-world-btn'),
    worldName: document.getElementById('world-name')
};

// ==========================================
// AUDIO SYSTEM
// ==========================================

const AudioSystem = {
    // Create audio context lazily (requires user interaction)
    audioContext: null,
    isMuted: false,
    isSpeaking: false,
    selectedVoice: null,

    init() {
        // Initialize on first user interaction
        document.addEventListener('click', () => {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
        }, { once: true });

        // Preload and select best voice - prefer clear American voices (easier accent)
        if ('speechSynthesis' in window) {
            const loadVoices = () => {
                const voices = window.speechSynthesis.getVoices();

                // Prefer American voices for clearer, easier accent
                const preferredNames = [
                    'Google US English',
                    'Microsoft Ana Online (Natural) - English (United States)',
                    'Microsoft Jenny Online (Natural) - English (United States)',
                    'Microsoft Aria Online (Natural) - English (United States)',
                    'Microsoft Emma Online (Natural) - English (United States)',
                    'Microsoft Ava Online (Natural) - English (United States)',
                ];

                // Prioritize US voices
                const usVoices = voices.filter(v => v.lang === 'en-US');
                const enVoices = voices.filter(v => v.lang.startsWith('en'));

                // Try to find a preferred American voice
                let bestVoice = null;
                for (const name of preferredNames) {
                    bestVoice = voices.find(v => v.name.includes(name));
                    if (bestVoice) break;
                }

                // Fallback to any US voice, then any English voice
                if (!bestVoice) {
                    bestVoice = usVoices[0] || enVoices[0] || voices[0];
                }

                this.selectedVoice = bestVoice;
                console.log('Selected voice:', bestVoice?.name, bestVoice?.lang);

                // Log all available English voices for debugging
                console.log('--- All available English voices ---');
                voices.filter(v => v.lang.startsWith('en')).forEach((v, i) => {
                    console.log(`${i + 1}. ${v.name} (${v.lang})`);
                });
                console.log('-----------------------------------');
            };

            // Load voices (may need to wait for voiceschanged event)
            loadVoices();
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }

        // Setup sound toggle button
        const soundBtn = document.getElementById('sound-toggle');
        if (soundBtn) {
            soundBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleMute();
            });
        }
    },

    toggleMute() {
        this.isMuted = !this.isMuted;
        const soundBtn = document.getElementById('sound-toggle');
        if (soundBtn) {
            soundBtn.textContent = this.isMuted ? '🔇' : '🔊';
            soundBtn.classList.toggle('muted', this.isMuted);
        }

        // Stop any ongoing speech when muting
        if (this.isMuted && 'speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
    },

    // Play a simple tone for correct answer
    playCorrect() {
        if (this.isMuted) return;
        this.playTone(523.25, 0.15); // C5
        setTimeout(() => this.playTone(659.25, 0.15), 100); // E5
        setTimeout(() => this.playTone(783.99, 0.2), 200); // G5
    },

    // Play a gentle tone for wrong answer
    playWrong() {
        if (this.isMuted) return;
        this.playTone(200, 0.2);
    },

    // Generate a simple tone
    playTone(frequency, duration) {
        if (this.isMuted || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    },

    // Speak just the word (for button taps and image taps)
    speakWord(word, callback) {
        if (this.isMuted) {
            if (callback) callback();
            return;
        }
        this._speak(word, callback);
    },

    // Speak a phrase (for feedback like "Great! Dog!")
    speak(text, callback) {
        if (this.isMuted) {
            if (callback) callback();
            return;
        }
        this._speak(text, callback);
    },

    // Internal speak method with queue management
    _speak(text, callback) {
        if (!('speechSynthesis' in window)) {
            if (callback) callback();
            return;
        }

        // Cancel any ongoing speech to prevent overlap
        window.speechSynthesis.cancel();

        this.isSpeaking = true;

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-GB'; // British accent
        utterance.rate = 0.8; // Slightly faster but still clear
        utterance.pitch = 1.3; // Higher pitch - lighter and more playful
        utterance.volume = 0.9; // Slightly softer for less harshness

        if (this.selectedVoice) {
            utterance.voice = this.selectedVoice;
        }

        utterance.onend = () => {
            this.isSpeaking = false;
            if (callback) callback();
        };

        utterance.onerror = () => {
            this.isSpeaking = false;
            if (callback) callback();
        };

        window.speechSynthesis.speak(utterance);
    }
};

// ==========================================
// MASCOT SYSTEM
// ==========================================

const MascotSystem = {
    characters: ['🐻', '🦊', '🐰', '🐶', '🐱', '🦁'],
    currentCharacter: '🐻',

    correctMessages: [
        "Great job! 🌟",
        "Amazing! ⭐",
        "You're so smart!",
        "Wonderful! 🎉",
        "Perfect! 💯",
        "Keep it up! 🚀",
        "Fantastic! ✨",
        "You rock! 🎸",
        "Brilliant! 💎",
        "Super! 🦸"
    ],

    wrongMessages: [
        "Try again! 💪",
        "Almost there!",
        "You can do it!",
        "Keep trying! 🌈",
        "Don't give up!"
    ],

    streakMessages: {
        3: "3 in a row! 🔥",
        5: "5 streak! Amazing! 🔥🔥",
        10: "10 streak! LEGENDARY! 🔥🔥🔥"
    },

    showMessage(message, isHappy = true) {
        if (!elements.mascotMessage || !elements.mascotBubble || !elements.mascotCharacter) return;

        elements.mascotMessage.textContent = message;
        elements.mascotBubble.classList.remove('hidden');

        // Trigger mascot animation
        elements.mascotCharacter.classList.remove('happy', 'sad');
        void elements.mascotCharacter.offsetWidth; // Force reflow
        elements.mascotCharacter.classList.add(isHappy ? 'happy' : 'sad');

        // Hide message after delay
        setTimeout(() => {
            elements.mascotBubble.classList.add('hidden');
        }, 2500);
    },

    onCorrect(streak) {
        // Check for streak milestone
        if (this.streakMessages[streak]) {
            this.showMessage(this.streakMessages[streak], true);
        } else {
            const msg = this.correctMessages[Math.floor(Math.random() * this.correctMessages.length)];
            this.showMessage(msg, true);
        }
    },

    onWrong() {
        const msg = this.wrongMessages[Math.floor(Math.random() * this.wrongMessages.length)];
        this.showMessage(msg, false);
    },

    init() {
        // Click mascot to hear encouragement
        if (elements.mascotCharacter) {
            elements.mascotCharacter.addEventListener('click', () => {
                AudioSystem.speak("You're doing great!");
                this.showMessage("Keep learning! 📚", true);
            });
        }
    }
};

// ==========================================
// STREAK SYSTEM
// ==========================================

function updateStreak(correct) {
    if (correct) {
        gameState.streak++;
    } else {
        gameState.streak = 0;
    }

    if (elements.streakCount) {
        elements.streakCount.textContent = gameState.streak;
    }

    if (elements.streakDisplay) {
        if (gameState.streak >= 2) {
            elements.streakDisplay.classList.add('active');
        } else {
            elements.streakDisplay.classList.remove('active');
        }
    }
}

// ==========================================
// ACHIEVEMENTS SYSTEM
// ==========================================

const ACHIEVEMENTS = {
    firstSteps: {
        id: 'firstSteps',
        icon: '🎯',
        name: 'First Steps',
        desc: 'Answer your first question correctly',
        check: (stats) => stats.totalCorrect >= 1
    },
    wordMaster: {
        id: 'wordMaster',
        icon: '📚',
        name: 'Word Master',
        desc: 'Answer 10 questions correctly',
        check: (stats) => stats.totalCorrect >= 10
    },
    streakStarter: {
        id: 'streakStarter',
        icon: '🔥',
        name: 'On Fire!',
        desc: 'Get a 3-word streak',
        check: (stats) => stats.bestStreak >= 3
    },
    streakMaster: {
        id: 'streakMaster',
        icon: '🌟',
        name: 'Streak Master',
        desc: 'Get a 5-word streak',
        check: (stats) => stats.bestStreak >= 5
    },
    worldExplorer: {
        id: 'worldExplorer',
        icon: '🗺️',
        name: 'World Explorer',
        desc: 'Complete your first world',
        check: (stats) => stats.worldsCompleted >= 1
    },
    coinCollector: {
        id: 'coinCollector',
        icon: '💰',
        name: 'Coin Collector',
        desc: 'Collect 100 coins',
        check: (stats) => stats.totalCoins >= 100
    },
    perfectRound: {
        id: 'perfectRound',
        icon: '💎',
        name: 'Perfect Round',
        desc: 'Complete a world with no mistakes',
        check: (stats) => stats.perfectWorlds >= 1
    },
    dailyChamp: {
        id: 'dailyChamp',
        icon: '🏆',
        name: 'Daily Champion',
        desc: 'Complete your daily goal',
        check: (stats) => stats.dailyGoalsCompleted >= 1
    }
};

const AchievementSystem = {
    unlockedAchievements: [],
    stats: {
        totalCorrect: 0,
        bestStreak: 0,
        worldsCompleted: 0,
        totalCoins: 0,
        perfectWorlds: 0,
        dailyGoalsCompleted: 0
    },

    init() {
        this.load();
        // Setup close button
        const closeBtn = document.getElementById('achievement-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                document.getElementById('achievement-popup')?.classList.add('hidden');
            });
        }
    },

    load() {
        const saved = localStorage.getItem('zaffoAchievements');
        if (saved) {
            const data = JSON.parse(saved);
            this.unlockedAchievements = data.unlocked || [];
            this.stats = { ...this.stats, ...data.stats };
        }
    },

    save() {
        localStorage.setItem('zaffoAchievements', JSON.stringify({
            unlocked: this.unlockedAchievements,
            stats: this.stats
        }));
    },

    updateStats(key, value) {
        if (key === 'bestStreak') {
            this.stats[key] = Math.max(this.stats[key], value);
        } else {
            this.stats[key] = value;
        }
        this.checkAchievements();
        this.save();
    },

    increment(key) {
        this.stats[key]++;
        this.checkAchievements();
        this.save();
    },

    checkAchievements() {
        for (const [id, achievement] of Object.entries(ACHIEVEMENTS)) {
            if (!this.unlockedAchievements.includes(id) && achievement.check(this.stats)) {
                this.unlock(achievement);
            }
        }
    },

    unlock(achievement) {
        this.unlockedAchievements.push(achievement.id);
        this.showPopup(achievement);
        this.save();
    },

    showPopup(achievement) {
        const popup = document.getElementById('achievement-popup');
        const icon = document.getElementById('achievement-icon');
        const name = document.getElementById('achievement-name');
        const desc = document.getElementById('achievement-desc');

        if (popup && icon && name && desc) {
            icon.textContent = achievement.icon;
            name.textContent = achievement.name;
            desc.textContent = achievement.desc;
            popup.classList.remove('hidden');
            AudioSystem.playCorrect();
            AudioSystem.speak(`Achievement unlocked! ${achievement.name}`);
        }
    }
};

// ==========================================
// DAILY GOALS SYSTEM
// ==========================================

const DailyGoalSystem = {
    target: 10,
    current: 0,
    lastDate: null,

    init() {
        this.load();
        this.checkNewDay();
        this.updateUI();
        this.show();
    },

    load() {
        const saved = localStorage.getItem('zaffoDailyGoal');
        if (saved) {
            const data = JSON.parse(saved);
            this.current = data.current || 0;
            this.lastDate = data.lastDate;
        }
    },

    save() {
        localStorage.setItem('zaffoDailyGoal', JSON.stringify({
            current: this.current,
            lastDate: this.lastDate
        }));
    },

    checkNewDay() {
        const today = new Date().toDateString();
        if (this.lastDate !== today) {
            this.current = 0;
            this.lastDate = today;
            this.save();
        }
    },

    increment() {
        this.current++;
        if (this.current === this.target) {
            AchievementSystem.increment('dailyGoalsCompleted');
            MascotSystem.showMessage("Daily goal complete! 🎉", true);
        }
        this.updateUI();
        this.save();
    },

    show() {
        const el = document.getElementById('daily-goal');
        if (el) el.classList.remove('hidden');
    },

    updateUI() {
        const progress = document.getElementById('daily-goal-progress');
        const count = document.getElementById('daily-goal-count');

        if (progress) {
            const percent = Math.min((this.current / this.target) * 100, 100);
            progress.style.width = `${percent}%`;
        }
        if (count) {
            count.textContent = `${this.current}/${this.target}`;
        }
    }
};

// ==========================================
// PROGRESS PATH SYSTEM
// ==========================================

const ProgressPath = {
    init() {
        this.render();
    },

    render() {
        const dotsContainer = document.getElementById('path-dots');
        const character = document.getElementById('path-character');
        if (!dotsContainer) return;

        dotsContainer.innerHTML = '';

        const total = gameState.totalQuestions;
        for (let i = 0; i < total; i++) {
            const dot = document.createElement('div');
            dot.className = 'path-dot';
            if (i < gameState.currentQuestionIndex) {
                dot.classList.add('completed');
            } else if (i === gameState.currentQuestionIndex) {
                dot.classList.add('current');
            }
            dotsContainer.appendChild(dot);
        }

        // Position character
        if (character) {
            const dotWidth = 15; // 12px + 3px gap
            const leftPos = 10 + (gameState.currentQuestionIndex * dotWidth);
            character.style.left = `${leftPos}px`;
        }
    },

    update() {
        this.render();
    }
};

// ==========================================
// GAME FUNCTIONS
// ==========================================

function initGame() {
    AudioSystem.init();
    MascotSystem.init();
    AchievementSystem.init();
    DailyGoalSystem.init();
    loadProgress();
    updateUI();
    setupSplashScreen();
    setupEventListeners();

    // Preload voices for speech synthesis
    if ('speechSynthesis' in window) {
        window.speechSynthesis.getVoices();
    }
}

function setupSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    const startBtn = document.getElementById('start-game-btn');

    if (startBtn) {
        startBtn.addEventListener('click', () => {
            // Hide splash screen with animation
            splashScreen.classList.add('hidden');

            // Start the actual game after animation
            setTimeout(() => {
                ProgressPath.init();
                showQuestion();
                resetIdleTimer();
            }, 800);
        });
    }
}

function loadProgress() {
    const saved = localStorage.getItem('zaffoWordQuest');
    if (saved) {
        const data = JSON.parse(saved);
        gameState.coins = data.coins || 0;
        // Stars reset per session, coins persist
    }
}

function saveProgress() {
    localStorage.setItem('zaffoWordQuest', JSON.stringify({
        coins: gameState.coins
    }));
}

function updateUI() {
    elements.starsCount.textContent = gameState.stars;
    elements.starsTotal.textContent = gameState.totalQuestions;
    elements.coinsCount.textContent = gameState.coins;
    if (elements.streakCount) {
        elements.streakCount.textContent = gameState.streak;
    }
}

function showQuestion() {
    const world = WORLDS[gameState.currentWorld];

    // Check if we should show a review word (spaced repetition)
    let question;
    if (gameState.wrongWords.length > 0 && Math.random() < 0.3) {
        // 30% chance to show a review word
        const reviewIndex = Math.floor(Math.random() * gameState.wrongWords.length);
        question = gameState.wrongWords[reviewIndex];
        // Remove from review queue once shown
        gameState.wrongWords.splice(reviewIndex, 1);
    } else {
        question = world.words[gameState.currentQuestionIndex];
    }

    // Update image with fade animation
    elements.animalImage.style.opacity = '0';
    setTimeout(() => {
        elements.animalImage.src = question.image;
        elements.animalImage.alt = question.word;
        elements.animalImage.style.opacity = '1';

        // Update word display
        if (elements.wordText) {
            elements.wordText.textContent = question.word;
            elements.wordText.classList.remove('highlight');
        }

        // Auto-speak the correct word when question appears
        setTimeout(() => {
            AudioSystem.speakWord(question.word);
        }, 300);
    }, 200);

    // Generate answer options
    const correctAnswer = question.word;
    const wrongOptions = getRandomWrongOptions(world.wrongOptions, correctAnswer, 2);
    const allOptions = shuffleArray([correctAnswer, ...wrongOptions]);

    // Update buttons and speaker icons
    const buttonColors = ['green', 'red', 'blue'];
    elements.answerButtons.forEach((btn, index) => {
        btn.textContent = allOptions[index];
        btn.dataset.answer = allOptions[index];
        btn.disabled = false;
        btn.classList.remove('shake', 'pulse');

        // Remove old color classes and add new one
        btn.classList.remove('green', 'red', 'blue');
        btn.classList.add(buttonColors[index]);

        // Update corresponding speaker icon with the word
        if (elements.speakerIcons[index]) {
            elements.speakerIcons[index].dataset.word = allOptions[index];
        }
    });

    // Hide feedback
    elements.feedbackText.classList.remove('show');

    gameState.isAnswering = false;
}

function getRandomWrongOptions(options, correctAnswer, count) {
    const filtered = options.filter(opt => opt !== correctAnswer);
    const shuffled = shuffleArray(filtered);
    return shuffled.slice(0, count);
}

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function handleAnswer(selectedAnswer) {
    if (gameState.isAnswering) return;

    resetIdleTimer();

    const world = WORLDS[gameState.currentWorld];
    const question = world.words[gameState.currentQuestionIndex];
    const correctAnswer = question.word;

    const clickedButton = [...elements.answerButtons].find(
        btn => btn.dataset.answer === selectedAnswer
    );

    if (selectedAnswer === correctAnswer) {
        handleCorrectAnswer(clickedButton, correctAnswer);
    } else {
        handleWrongAnswer(clickedButton);
    }
}

function handleCorrectAnswer(button, word) {
    gameState.isAnswering = true;

    // Visual feedback
    button.classList.add('pulse');

    // Update streak
    updateStreak(true);

    // Mascot reaction
    MascotSystem.onCorrect(gameState.streak);

    // Audio feedback - play celebratory sound first
    AudioSystem.playCorrect();

    // Then speak the correct word
    setTimeout(() => {
        AudioSystem.speakWord(word);
    }, 400);

    // Highlight word display
    if (elements.wordText) {
        elements.wordText.classList.add('highlight');
    }

    // Show feedback text with just the word and emoji
    elements.feedbackText.textContent = `⭐ ${word}!`;
    elements.feedbackText.classList.add('show');

    // Update score
    gameState.stars++;
    gameState.coins += 5;

    // Bonus coins for streaks
    if (gameState.streak === 3) gameState.coins += 5;
    if (gameState.streak === 5) gameState.coins += 10;
    if (gameState.streak === 10) gameState.coins += 25;

    updateUI();
    saveProgress();

    // Update Phase 2 systems
    AchievementSystem.increment('totalCorrect');
    AchievementSystem.updateStats('bestStreak', gameState.streak);
    AchievementSystem.updateStats('totalCoins', gameState.coins);
    DailyGoalSystem.increment();

    // Show celebration
    showCelebration();

    // Move to next question with smooth transition
    setTimeout(() => {
        // Fade out current content
        elements.animalImage.style.opacity = '0';
        elements.feedbackText.classList.remove('show');

        setTimeout(() => {
            if (gameState.currentQuestionIndex < gameState.totalQuestions - 1) {
                gameState.currentQuestionIndex++;
                ProgressPath.update();
                showQuestion();
            } else {
                showWorldComplete();
            }
        }, 400);
    }, 1800);
}

function handleWrongAnswer(button) {
    // Visual feedback
    button.classList.add('shake');

    // Reset streak
    updateStreak(false);

    // Mascot reaction
    MascotSystem.onWrong();

    // Add current word to spaced repetition queue
    const world = WORLDS[gameState.currentWorld];
    const question = world.words[gameState.currentQuestionIndex];
    if (!gameState.wrongWords.find(w => w.word === question.word)) {
        gameState.wrongWords.push(question);
    }

    // Audio feedback - gentle sound only, no word repetition
    AudioSystem.playWrong();

    // Remove shake after animation
    setTimeout(() => {
        button.classList.remove('shake');
    }, 400);

    // Reset idle timer
    resetIdleTimer();
}

function showCelebration() {
    elements.celebrationOverlay.classList.remove('hidden');

    // Create sparkles
    createSparkles();

    // Reset star animation
    elements.starAnimation.style.animation = 'none';
    elements.starAnimation.offsetHeight; // Trigger reflow
    elements.starAnimation.style.animation = null;

    // Hide celebration after animation
    setTimeout(() => {
        elements.celebrationOverlay.classList.add('hidden');
        elements.sparkles.innerHTML = '';
    }, 800);
}

function createSparkles() {
    const colors = ['#FFD700', '#FFA500', '#FFFF00', '#FFE4B5'];

    for (let i = 0; i < 15; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
        sparkle.style.animationDelay = `${Math.random() * 0.3}s`;
        elements.sparkles.appendChild(sparkle);
    }
}

function showWorldComplete() {
    const world = WORLDS[gameState.currentWorld];
    elements.completeOverlay.classList.remove('hidden');
    elements.completeCoinsCount.textContent = gameState.coins;

    // Update achievements
    AchievementSystem.increment('worldsCompleted');

    // Check for perfect round (no wrong answers in this world)
    if (gameState.wrongWords.length === 0 || !gameState.wrongWords.some(w =>
        WORLDS[gameState.currentWorld].words.find(ww => ww.word === w.word)
    )) {
        AchievementSystem.increment('perfectWorlds');
    }

    // Update completion message
    const completeTitle = document.getElementById('complete-title');
    const completeMessage = document.getElementById('complete-message');
    const nextWorldPreview = document.getElementById('next-world-preview');

    completeTitle.textContent = '🎉 Amazing! 🎉';
    completeMessage.textContent = `You completed ${world.name}!`;

    // Check if there's a next world
    const nextWorldIndex = gameState.currentWorldIndex + 1;
    if (nextWorldIndex < WORLD_ORDER.length) {
        const nextWorldKey = WORLD_ORDER[nextWorldIndex];
        const nextWorld = WORLDS[nextWorldKey];
        nextWorldPreview.innerHTML = `
            <span>${nextWorld.icon}</span>
            <p>Next: ${nextWorld.name}!</p>
        `;
        nextWorldPreview.style.cursor = 'pointer';
        nextWorldPreview.onclick = () => goToNextWorld();

        // Update play again button text
        document.getElementById('play-again-btn').textContent = 'Next World';
        document.getElementById('play-again-btn').onclick = () => goToNextWorld();
    } else {
        nextWorldPreview.innerHTML = `
            <span>🏆</span>
            <p>All Worlds Complete!</p>
        `;
        nextWorldPreview.style.cursor = 'default';
        nextWorldPreview.onclick = null;

        document.getElementById('play-again-btn').textContent = 'Play Again';
        document.getElementById('play-again-btn').onclick = () => restartFromBeginning();
    }

    // Play celebration sound
    AudioSystem.playCorrect();
    setTimeout(() => AudioSystem.playCorrect(), 200);

    // Speak congratulations
    setTimeout(() => {
        AudioSystem.speak(`Amazing! You completed ${world.name}!`);
    }, 500);
}

function goToPrevWorld() {
    if (gameState.currentWorldIndex > 0) {
        gameState.currentWorldIndex--;
    } else {
        // Wrap to last world
        gameState.currentWorldIndex = WORLD_ORDER.length - 1;
    }
    switchToWorld(gameState.currentWorldIndex);
}

function goToNextWorld() {
    if (gameState.currentWorldIndex < WORLD_ORDER.length - 1) {
        gameState.currentWorldIndex++;
    } else {
        // Wrap to first world
        gameState.currentWorldIndex = 0;
    }
    switchToWorld(gameState.currentWorldIndex);
}

function switchToWorld(worldIndex) {
    gameState.currentWorldIndex = worldIndex;
    gameState.currentWorld = WORLD_ORDER[worldIndex];
    gameState.currentQuestionIndex = 0;
    gameState.stars = 0;

    // Update world name display
    elements.worldName.textContent = WORLDS[gameState.currentWorld].name;

    gameState.totalQuestions = WORLDS[gameState.currentWorld].words.length;

    updateUI();
    elements.completeOverlay.classList.add('hidden');
    showQuestion();
    resetIdleTimer();
}

function restartFromBeginning() {
    gameState.currentWorldIndex = 0;
    gameState.currentWorld = WORLD_ORDER[0];
    gameState.currentQuestionIndex = 0;
    gameState.stars = 0;

    // Update world name display
    elements.worldName.textContent = WORLDS[gameState.currentWorld].name;

    gameState.totalQuestions = WORLDS[gameState.currentWorld].words.length;

    updateUI();
    elements.completeOverlay.classList.add('hidden');
    showQuestion();
    resetIdleTimer();
}

function restartGame() {
    gameState.currentQuestionIndex = 0;
    gameState.stars = 0;
    updateUI();
    elements.completeOverlay.classList.add('hidden');
    showQuestion();
    resetIdleTimer();
}


// ==========================================
// IDLE SYSTEM
// ==========================================

function resetIdleTimer() {
    clearTimeout(gameState.idleTimer);
    gameState.idleTimer = setTimeout(showIdlePrompt, gameState.IDLE_TIMEOUT);
}

function showIdlePrompt() {
    // Don't interrupt if audio is already playing
    if (AudioSystem.isSpeaking) {
        resetIdleTimer();
        return;
    }
    elements.idleOverlay.classList.remove('hidden');
    AudioSystem.speak("Let's keep playing!");
}

function hideIdlePrompt() {
    elements.idleOverlay.classList.add('hidden');
    resetIdleTimer();
}

// ==========================================
// EVENT LISTENERS
// ==========================================

function setupEventListeners() {
    // Image tap to replay correct word
    elements.animalImage.addEventListener('click', () => {
        const world = WORLDS[gameState.currentWorld];
        const question = world.words[gameState.currentQuestionIndex];
        AudioSystem.speakWord(question.word);
        resetIdleTimer();
    });

    // Word speaker button - speaks the displayed word
    if (elements.wordSpeaker) {
        elements.wordSpeaker.addEventListener('click', () => {
            const word = elements.wordText?.textContent;
            if (word) {
                AudioSystem.speakWord(word);
            }
            resetIdleTimer();
        });
    }

    // Speaker icons - play pronunciation only, no answer validation
    elements.speakerIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent bubbling to answer button
            const word = icon.dataset.word;
            if (word) {
                AudioSystem.speakWord(word);
            }
            resetIdleTimer();
        });

        // Touch feedback
        icon.addEventListener('touchstart', (e) => {
            e.stopPropagation();
        }, { passive: true });
    });

    // Answer buttons - trigger validation directly
    elements.answerButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const buttonWord = btn.dataset.answer;
            handleAnswer(buttonWord);
        });

        // Touch feedback
        btn.addEventListener('touchstart', () => {
            btn.style.transform = 'translateY(4px)';
        }, { passive: true });

        btn.addEventListener('touchend', () => {
            btn.style.transform = '';
        }, { passive: true });
    });

    // Idle resume button
    elements.idleResumeBtn.addEventListener('click', hideIdlePrompt);

    // Play again button
    elements.playAgainBtn.addEventListener('click', restartGame);

    // World navigation buttons
    elements.prevWorldBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        goToPrevWorld();
    });

    elements.nextWorldBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        goToNextWorld();
    });

    // Any interaction resets idle timer
    document.addEventListener('touchstart', resetIdleTimer, { passive: true });
    document.addEventListener('click', resetIdleTimer);
}

// ==========================================
// INITIALIZE
// ==========================================

// Wait for DOM and images to load
window.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure everything is ready
    setTimeout(initGame, 100);
});

// Handle visibility change (pause idle timer when tab is hidden)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearTimeout(gameState.idleTimer);
    } else {
        resetIdleTimer();
    }
});
