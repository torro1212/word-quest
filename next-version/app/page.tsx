"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import "./game.css";

// ==========================================
// GAME DATA
// ==========================================

interface Word {
  word: string;
  image: string;
}

interface MemoryCard {
  id: number;
  word: string;
  image?: string; // If present, it's an image card
  text?: string;  // If present, it's a word card
  isFlipped: boolean;
  isMatched: boolean;
}

interface World {
  name: string;
  icon: string;
  color: string;
  words: Word[];
  wrongOptions: string[];
}

interface Bubble {
  id: number;
  word: Word;
  x: number; // percentage 0-100
  speed: number; // duration in seconds
  isPopped: boolean;
  isWrong: boolean;
}

const WORLDS: Record<string, World> = {
  animalsFarm: {
    name: "Farm Animals",
    icon: "🚜",
    color: "#795548",
    words: [
      { word: "Horse", image: "/assets/images/animals-farm/horse.png" },
      { word: "Sheep", image: "/assets/images/animals-farm/sheep.png" },
      { word: "Goat", image: "/assets/images/animals-farm/goat.png" },
      { word: "Chicken", image: "/assets/images/animals-farm/chicken.png" },
      { word: "Rooster", image: "/assets/images/animals-farm/rooster.png" },
      { word: "Turkey", image: "/assets/images/animals-farm/turkey.png" },
      { word: "Donkey", image: "/assets/images/animals-farm/donkey.png" },
      { word: "Cow", image: "/assets/images/animals/cow.png" },
      { word: "Pig", image: "/assets/images/animals/pig.png" },
      { word: "Duck", image: "/assets/images/animals/duck.png" },
    ],
    wrongOptions: ["Horse", "Sheep", "Goat", "Chicken", "Rooster", "Turkey", "Donkey", "Cow", "Pig", "Duck"],
  },
  animalsPets: {
    name: "Pets",
    icon: "🏠",
    color: "#FF9800",
    words: [
      { word: "Hamster", image: "/assets/images/animals-pets/hamster.png" },
      { word: "Rabbit", image: "/assets/images/animals-pets/rabbit.png" },
      { word: "Turtle", image: "/assets/images/animals-pets/turtle.png" },
      { word: "Parrot", image: "/assets/images/animals-pets/parrot.png" },
      { word: "Goldfish", image: "/assets/images/animals-pets/goldfish.png" },
      { word: "Dog", image: "/assets/images/animals/dog.png" },
      { word: "Cat", image: "/assets/images/animals/cat.png" },
    ],
    wrongOptions: ["Hamster", "Rabbit", "Turtle", "Parrot", "Goldfish", "Dog", "Cat"],
  },
  animalsWild: {
    name: "Wild Animals",
    icon: "🦁",
    color: "#FF5722",
    words: [
      { word: "Lion", image: "/assets/images/animals-wild/lion.png" },
      { word: "Elephant", image: "/assets/images/animals-wild/elephant.png" },
      { word: "Giraffe", image: "/assets/images/animals-wild/giraffe.png" },
      { word: "Zebra", image: "/assets/images/animals-wild/zebra.png" },
      { word: "Tiger", image: "/assets/images/animals-wild/tiger.png" },
      { word: "Monkey", image: "/assets/images/animals-wild/monkey.png" },
      { word: "Panda", image: "/assets/images/animals-wild/panda.png" },
      { word: "Bear", image: "/assets/images/animals/bear_new.png" },
      { word: "Frog", image: "/assets/images/animals/frog.png" },
    ],
    wrongOptions: ["Lion", "Elephant", "Giraffe", "Zebra", "Tiger", "Monkey", "Panda", "Bear", "Frog"],
  },
  animalsSea: {
    name: "Sea Animals",
    icon: "🐬",
    color: "#2196F3",
    words: [
      { word: "Dolphin", image: "/assets/images/animals-sea/dolphin.png" },
      { word: "Whale", image: "/assets/images/animals-sea/whale.png" },
      { word: "Shark", image: "/assets/images/animals-sea/shark.png" },
      { word: "Octopus", image: "/assets/images/animals-sea/octopus.png" },
      { word: "Crab", image: "/assets/images/animals-sea/crab.png" },
      { word: "Seahorse", image: "/assets/images/animals-sea/seahorse.png" },
      { word: "Starfish", image: "/assets/images/animals-sea/starfish.png" },
    ],
    wrongOptions: ["Dolphin", "Whale", "Shark", "Octopus", "Crab", "Seahorse", "Starfish"],
  },
  animalsCute: {
    name: "Small & Cute",
    icon: "🐿️",
    color: "#E91E63",
    words: [
      { word: "Mouse", image: "/assets/images/animals-small-cute/mouse.png" },
      { word: "Squirrel", image: "/assets/images/animals-small-cute/squirrel.png" },
      { word: "Hedgehog", image: "/assets/images/animals-small-cute/hedgehog.png" },
      { word: "Raccoon", image: "/assets/images/animals-small-cute/raccoon.png" },
      { word: "Snail", image: "/assets/images/animals-small-cute/snail.png" },
    ],
    wrongOptions: ["Mouse", "Squirrel", "Hedgehog", "Raccoon", "Snail"],
  },
  animalsBirds: {
    name: "Birds",
    icon: "🦉",
    color: "#00BCD4",
    words: [
      { word: "Owl", image: "/assets/images/animals-birds/owl.png" },
      { word: "Eagle", image: "/assets/images/animals-birds/eagle.png" },
      { word: "Parrot", image: "/assets/images/animals-birds/parrot.png" },
      { word: "Penguin", image: "/assets/images/animals-birds/penguin.png" },
      { word: "Flamingo", image: "/assets/images/animals-birds/flamingo.png" },
    ],
    wrongOptions: ["Owl", "Eagle", "Parrot", "Penguin", "Flamingo"],
  },
  colorWorld: {
    name: "Color World",
    icon: "🎨",
    color: "#E91E63",
    words: [
      { word: "Red", image: "/assets/images/colors/red.png" },
      { word: "Blue", image: "/assets/images/colors/blue.png" },
      { word: "Green", image: "/assets/images/colors/green.png" },
      { word: "Yellow", image: "/assets/images/colors/yellow.png" },
      { word: "Orange", image: "/assets/images/colors/orange.png" },
      { word: "Purple", image: "/assets/images/colors/purple.png" },
      { word: "Pink", image: "/assets/images/colors/pink.png" },
      { word: "Brown", image: "/assets/images/colors/brown.png" },
      { word: "Black", image: "/assets/images/colors/black.png" },
      { word: "White", image: "/assets/images/colors/white.png" },
    ],
    wrongOptions: ["Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Pink", "Brown", "Black", "White", "Gray"],
  },
  shapeWorld: {
    name: "Shape World",
    icon: "⬟",
    color: "#9C27B0",
    words: [
      { word: "Circle", image: "/assets/images/shapes/circle.png" },
      { word: "Square", image: "/assets/images/shapes/square.png" },
      { word: "Triangle", image: "/assets/images/shapes/triangle.png" },
      { word: "Star", image: "/assets/images/shapes/star.png" },
      { word: "Heart", image: "/assets/images/shapes/heart.png" },
      { word: "Plus", image: "/assets/images/shapes/plus.png" },
    ],
    wrongOptions: ["Circle", "Square", "Triangle", "Star", "Heart", "Plus"],
  },
  fruitWorld: {
    name: "Fruit World",
    icon: "🍎",
    color: "#FF5722",
    words: [
      { word: "Apple", image: "/assets/images/fruits/apple.png" },
      { word: "Banana", image: "/assets/images/fruits/banana.png" },
      { word: "Orange", image: "/assets/images/fruits/orange.png" },
      { word: "Grape", image: "/assets/images/fruits/grape.png" },
      { word: "Lemon", image: "/assets/images/fruits/lemon.png" },
      { word: "Pear", image: "/assets/images/fruits/pear.png" },
      { word: "Plum", image: "/assets/images/fruits/plum.png" },
      { word: "Mango", image: "/assets/images/fruits/mango.png" },
      { word: "Peach", image: "/assets/images/fruits/peach.png" },
      { word: "Cherry", image: "/assets/images/fruits/cherry.png" },
    ],
    wrongOptions: ["Apple", "Banana", "Orange", "Grape", "Lemon", "Pear", "Plum", "Mango", "Peach", "Cherry"],
  },
  vehicleWorld: {
    name: "Vehicle World",
    icon: "🚗",
    color: "#2196F3",
    words: [
      { word: "Car", image: "/assets/images/vehicles/car.png" },
      { word: "Bus", image: "/assets/images/vehicles/bus.png" },
      { word: "Truck", image: "/assets/images/vehicles/truck.png" },
      { word: "Plane", image: "/assets/images/vehicles/plane.png" },
      { word: "Boat", image: "/assets/images/vehicles/boat.png" },
      { word: "Train", image: "/assets/images/vehicles/train.png" },
      { word: "Bicycle", image: "/assets/images/vehicles/bicycle.png" },
      { word: "Helicopter", image: "/assets/images/vehicles/helicopter.png" },
      { word: "Motorcycle", image: "/assets/images/vehicles/motorcycle.png" },
      { word: "Taxi", image: "/assets/images/vehicles/taxi.png" },
    ],
    wrongOptions: ["Car", "Bus", "Truck", "Plane", "Boat", "Train", "Bicycle", "Helicopter", "Motorcycle", "Taxi"],
  },
  toysWorld: {
    name: "Toys World",
    icon: "🧸",
    color: "#FF9800",
    words: [
      { word: "Ball", image: "/assets/images/TOYS/ball.png" },
      { word: "Blocks", image: "/assets/images/TOYS/blocks.png" },
      { word: "Doll", image: "/assets/images/TOYS/doll.png" },
      { word: "Drum", image: "/assets/images/TOYS/drum.png" },
      { word: "Duck", image: "/assets/images/TOYS/duck.png" },
      { word: "Kite", image: "/assets/images/TOYS/kite.png" },
      { word: "Plane", image: "/assets/images/TOYS/plane.png" },
      { word: "Robot", image: "/assets/images/TOYS/robot.png" },
      { word: "Teddy", image: "/assets/images/TOYS/teddy.png" },
      { word: "Train", image: "/assets/images/TOYS/train.png" },
    ],
    wrongOptions: ["Ball", "Blocks", "Doll", "Drum", "Duck", "Kite", "Plane", "Robot", "Teddy", "Train"],
  },
  bodyWorld: {
    name: "Body World",
    icon: "🦴",
    color: "#E91E63",
    words: [
      { word: "Arm", image: "/assets/images/body/Arm.png" },
      { word: "Face", image: "/assets/images/body/Face.png" },
      { word: "Foot", image: "/assets/images/body/Foot.png" },
      { word: "Hair", image: "/assets/images/body/Hair.png" },
      { word: "Hand", image: "/assets/images/body/Hand.png" },
      { word: "Head", image: "/assets/images/body/Head.png" },
      { word: "Leg", image: "/assets/images/body/Leg.png" },
      { word: "Nose", image: "/assets/images/body/Nose.png" },
      { word: "Ear", image: "/assets/images/body/ear.png" },
      { word: "Eye", image: "/assets/images/body/eye.png" },
    ],
    wrongOptions: ["Arm", "Face", "Foot", "Hair", "Hand", "Head", "Leg", "Nose", "Ear", "Eye"],
  },
  clothesWorld: {
    name: "Clothes World",
    icon: "👕",
    color: "#2196F3",
    words: [
      { word: "Dress", image: "/assets/images/clothes/dress.png" },
      { word: "Hat", image: "/assets/images/clothes/hat.png" },
      { word: "Jacket", image: "/assets/images/clothes/jacket.png" },
      { word: "Pants", image: "/assets/images/clothes/pants.png" },
      { word: "Shirt", image: "/assets/images/clothes/shirt.png" },
      { word: "Shoes", image: "/assets/images/clothes/shoes.png" },
      { word: "Shorts", image: "/assets/images/clothes/shorts.png" },
      { word: "Skirt", image: "/assets/images/clothes/skirt.png" },
      { word: "Socks", image: "/assets/images/clothes/socks.png" },
      { word: "Sweater", image: "/assets/images/clothes/sweater.png" },
    ],
    wrongOptions: ["Dress", "Hat", "Jacket", "Pants", "Shirt", "Shoes", "Shorts", "Skirt", "Socks", "Sweater"],
  },
  houseWorld: {
    name: "House World",
    icon: "🏠",
    color: "#795548",
    words: [
      { word: "Sofa", image: "/assets/images/house/sofa.png" },
      { word: "Bed", image: "/assets/images/house/bed.png" },
      { word: "Book", image: "/assets/images/house/book.png" },
      { word: "Chair", image: "/assets/images/house/chair.png" },
      { word: "Clock", image: "/assets/images/house/clock.png" },
      { word: "Cup", image: "/assets/images/house/cup.png" },
      { word: "Door", image: "/assets/images/house/door.png" },
      { word: "Key", image: "/assets/images/house/key.png" },
      { word: "Lamp", image: "/assets/images/house/lamp.png" },
      { word: "Table", image: "/assets/images/house/table.png" },
    ],
    wrongOptions: ["Sofa", "Bed", "Book", "Chair", "Clock", "Cup", "Door", "Key", "Lamp", "Table"],
  },
  natureWorld: {
    name: "Nature World",
    icon: "🌳",
    color: "#4CAF50",
    words: [
      { word: "Cloud", image: "/assets/images/nature/cloud.png" },
      { word: "Flower", image: "/assets/images/nature/flower.png" },
      { word: "Grass", image: "/assets/images/nature/grass.png" },
      { word: "Leaf", image: "/assets/images/nature/leaf.png" },
      { word: "Moon", image: "/assets/images/nature/moon.png" },
      { word: "Rain", image: "/assets/images/nature/rain.png" },
      { word: "Snow", image: "/assets/images/nature/snow.png" },
      { word: "Star", image: "/assets/images/nature/star.png" },
      { word: "Sun", image: "/assets/images/nature/sun.png" },
      { word: "Tree", image: "/assets/images/nature/tree.png" },
    ],
    wrongOptions: ["Cloud", "Flower", "Grass", "Leaf", "Moon", "Rain", "Snow", "Star", "Sun", "Tree"],
  },
  schoolWorld: {
    name: "School World",
    icon: "🏫",
    color: "#3F51B5",
    words: [
      { word: "Book", image: "/assets/images/school/book.png" },
      { word: "Pencil", image: "/assets/images/school/pencil.png" },
      { word: "Bag", image: "/assets/images/school/bag.png" },
      { word: "Chair", image: "/assets/images/school/chair.png" },
      { word: "Desk", image: "/assets/images/school/desk.png" },
      { word: "Eraser", image: "/assets/images/school/eraser.png" },
      { word: "Crayons", image: "/assets/images/school/crayons.png" },
      { word: "Notebook", image: "/assets/images/school/notebook.png" },
      { word: "Ruler", image: "/assets/images/school/ruler.png" },
      { word: "Scissors", image: "/assets/images/school/scissors.png" },
    ],
    wrongOptions: ["Book", "Pencil", "Bag", "Chair", "Desk", "Eraser", "Crayons", "Notebook", "Ruler", "Scissors"],
  },
  jobsWorld: {
    name: "Jobs World",
    icon: "🧑‍🏭",
    color: "#607D8B",
    words: [
      { word: "Doctor", image: "/assets/images/jobs/doctor.png" },
      { word: "Teacher", image: "/assets/images/jobs/teacher.png" },
      { word: "Police", image: "/assets/images/jobs/police.png" },
      { word: "Firefighter", image: "/assets/images/jobs/firefighter.png" },
      { word: "Chef", image: "/assets/images/jobs/chef.png" },
      { word: "Pilot", image: "/assets/images/jobs/pilot.png" },
      { word: "Farmer", image: "/assets/images/jobs/farmer.png" },
      { word: "Nurse", image: "/assets/images/jobs/nurse.png" },
      { word: "Builder", image: "/assets/images/jobs/builder.png" },
      { word: "Artist", image: "/assets/images/jobs/artist.png" },
    ],
    wrongOptions: ["Doctor", "Teacher", "Police", "Firefighter", "Chef", "Pilot", "Farmer", "Nurse", "Builder", "Artist"],
  },
  numbersWorld: {
    name: "Numbers World",
    icon: "🔢",
    color: "#9C27B0",
    words: [
      { word: "One", image: "/assets/images/numbers/one.png" },
      { word: "Two", image: "/assets/images/numbers/two.png" },
      { word: "Three", image: "/assets/images/numbers/three.png" },
      { word: "Four", image: "/assets/images/numbers/four.png" },
      { word: "Five", image: "/assets/images/numbers/five.png" },
      { word: "Six", image: "/assets/images/numbers/six.png" },
      { word: "Seven", image: "/assets/images/numbers/seven.png" },
      { word: "Eight", image: "/assets/images/numbers/eight.png" },
      { word: "Nine", image: "/assets/images/numbers/nine.png" },
      { word: "Ten", image: "/assets/images/numbers/ten.png" },
    ],
    wrongOptions: ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"],
  },
  foodWorld: {
    name: "Food World",
    icon: "🍔",
    color: "#FF5722",
    words: [
      { word: "Bread", image: "/assets/images/food/bread.png" },
      { word: "Cheese", image: "/assets/images/food/cheese.png" },
      { word: "Egg", image: "/assets/images/food/egg.png" },
      { word: "Milk", image: "/assets/images/food/milk.png" },
      { word: "Pizza", image: "/assets/images/food/pizza.png" },
      { word: "Burger", image: "/assets/images/food/burger.png" },
      { word: "Cake", image: "/assets/images/food/cake.png" },
      { word: "Sandwich", image: "/assets/images/food/sandwich.png" },
      { word: "Rice", image: "/assets/images/food/rice.png" },
      { word: "Soup", image: "/assets/images/food/soup.png" },
    ],
    wrongOptions: ["Bread", "Cheese", "Egg", "Milk", "Pizza", "Burger", "Cake", "Sandwich", "Rice", "Soup"],
  },
};

const WORLD_ORDER = [
  "animalsFarm",
  "animalsPets",
  "animalsWild",
  "animalsSea",
  "animalsCute",
  "animalsBirds",
  "colorWorld",
  "shapeWorld",
  "fruitWorld",
  "vehicleWorld",
  "toysWorld",
  "bodyWorld",
  "clothesWorld",
  "houseWorld",
  "natureWorld",
  "schoolWorld",
  "jobsWorld",
  "numbersWorld",
  "foodWorld",
];

// ==========================================
// AUDIO SYSTEM
// ==========================================

const useAudioSystem = () => {
  const selectedVoiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const isSpeakingRef = useRef(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        const preferredNames = [
          "Google US English",
          "Microsoft Ana Online (Natural) - English (United States)",
          "Microsoft Jenny Online (Natural) - English (United States)",
        ];

        const usVoices = voices.filter((v) => v.lang === "en-US");
        const enVoices = voices.filter((v) => v.lang.startsWith("en"));

        let bestVoice: SpeechSynthesisVoice | null = null;
        for (const name of preferredNames) {
          bestVoice = voices.find((v) => v.name.includes(name)) || null;
          if (bestVoice) break;
        }

        if (!bestVoice) {
          bestVoice = usVoices[0] || enVoices[0] || voices[0] || null;
        }

        selectedVoiceRef.current = bestVoice;
        console.log("Selected voice:", bestVoice?.name, bestVoice?.lang);
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const speak = useCallback((text: string) => {
    if (isMuted || typeof window === "undefined" || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();
    isSpeakingRef.current = true;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.8;
    utterance.pitch = 1.3;
    utterance.volume = 0.9;

    if (selectedVoiceRef.current) {
      utterance.voice = selectedVoiceRef.current;
    }

    utterance.onend = () => {
      isSpeakingRef.current = false;
    };

    window.speechSynthesis.speak(utterance);
  }, [isMuted]);

  const playTone = useCallback((frequency: number, duration: number) => {
    if (isMuted || typeof window === "undefined") return;

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = "sine";
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (e) {
      console.log("Audio error:", e);
    }
  }, [isMuted]);

  const playCorrect = useCallback(() => {
    playTone(523.25, 0.15);
    setTimeout(() => playTone(659.25, 0.15), 100);
    setTimeout(() => playTone(783.99, 0.2), 200);
  }, [playTone]);

  const playWrong = useCallback(() => {
    playTone(200, 0.3);
  }, [playTone]);

  return { speak, playCorrect, playWrong, isMuted, setIsMuted };
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getRandomWrongOptions(wrongOptions: string[], correctAnswer: string, count: number): string[] {
  const filtered = wrongOptions.filter((opt) => opt !== correctAnswer);
  const shuffled = shuffleArray(filtered);
  return shuffled.slice(0, count);
}

// ==========================================
// MAIN GAME COMPONENT
// ==========================================

export default function WordQuestGame() {
  const [gameState, setGameState] = useState<"splash" | "playing" | "complete">("splash");
  const [currentWorldIndex, setCurrentWorldIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [stars, setStars] = useState(0);
  const [isAnswering, setIsAnswering] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [showGameSwitchModal, setShowGameSwitchModal] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [currentOptions, setCurrentOptions] = useState<Word[]>([]);
  const [shakingButton, setShakingButton] = useState<number | null>(null);
  const [pulsingButton, setPulsingButton] = useState<number | null>(null);
  const [shuffledWords, setShuffledWords] = useState<Word[]>([]);
  const [mascotStatus, setMascotStatus] = useState<"idle" | "happy" | "sad">("idle");
  const [gameMode, setGameMode] = useState<"imageToWord" | "wordToImage" | "findThe" | "memory">("imageToWord");
  const [findTheImages, setFindTheImages] = useState<Word[]>([]);
  const [findTheTarget, setFindTheTarget] = useState<Word | null>(null);
  const [findTheShaking, setFindTheShaking] = useState<number | null>(null);
  const [findTheCorrect, setFindTheCorrect] = useState<number | null>(null);

  // Memory Game State
  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
  const [memoryFlipped, setMemoryFlipped] = useState<number[]>([]); // Indicies of flipped cards
  const [isCheckingMatch, setIsCheckingMatch] = useState(false);

  // Bubble Pop Game State
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [bubbleTarget, setBubbleTarget] = useState<Word | null>(null);
  const [bubbleScore, setBubbleScore] = useState(0);
  const [bubbleWaveActive, setBubbleWaveActive] = useState(false);
  const [bubbleWaveInstruction, setBubbleWaveInstruction] = useState(false);

  const [showWorldComplete, setShowWorldComplete] = useState(false);
  const [nextWorldName, setNextWorldName] = useState("");

  const { speak, playCorrect, playWrong, isMuted, setIsMuted } = useAudioSystem();
  const bubbleIdCounter = useRef(0);
  const bubbleSpawnerRef = useRef<NodeJS.Timeout | null>(null);

  const currentWorld = WORLDS[WORLD_ORDER[currentWorldIndex]];
  const totalQuestions = currentWorld.words.length;

  const startGame = (mode: "imageToWord" | "wordToImage" | "findThe" | "memory" | "bubblePop") => {
    setGameMode(mode);
    setGameState("playing");
    const shuffled = shuffleArray([...currentWorld.words]);
    setShuffledWords(shuffled);

    if (mode === "findThe") {
      setupFindTheRound(shuffled, 0);
    } else if (mode === "memory") {
      setupMemoryGame(currentWorld.words);
    } else if (mode === "bubblePop") {
      setupBubbleWave(shuffled);
    }
  };

  const setupBubbleWave = (words: Word[]) => {
    // Pick a random target
    const target = words[Math.floor(Math.random() * words.length)];
    setBubbleTarget(target);
    setBubbleScore(0);
    setBubbles([]);

    // Speak instruction
    speak(`Pop the ${target.word}!`);

    // Start Wave immediately (small delay for audio)
    setTimeout(() => {
      setBubbleWaveActive(true);
    }, 500);
  };

  // Bubble Spawning Logic
  useEffect(() => {
    if (gameMode === 'bubblePop' && bubbleWaveActive && bubbleTarget) {
      bubbleSpawnerRef.current = setInterval(() => {
        const isTarget = Math.random() < 0.35; // 35% chance of target
        let word: Word;

        if (isTarget) {
          word = bubbleTarget;
        } else {
          // Pick a distractor
          const distractors = currentWorld.words.filter(w => w.word !== bubbleTarget.word);
          word = distractors[Math.floor(Math.random() * distractors.length)];
        }

        const newBubble: Bubble = {
          id: bubbleIdCounter.current++,
          word: word,
          x: Math.random() * 80 + 10, // 10% to 90%
          speed: Math.random() * 3 + 4, // 4s to 7s
          isPopped: false,
          isWrong: false
        };

        setBubbles(prev => [...prev, newBubble]);

        // Cleanup old bubbles (simple optimization to keep array size manageable)
        if (bubbles.length > 20) {
          setBubbles(prev => prev.slice(prev.length - 15));
        }

      }, 1200); // New bubble every 1.2s
    }

    return () => {
      if (bubbleSpawnerRef.current) clearInterval(bubbleSpawnerRef.current);
    };
  }, [gameMode, bubbleWaveActive, bubbleTarget, currentWorld, bubbles.length]);

  const handleBubbleClick = (bubbleId: number) => {
    const bubble = bubbles.find(b => b.id === bubbleId);
    if (!bubble || bubble.isPopped || bubble.isWrong) return;

    if (bubble.word.word === bubbleTarget?.word) {
      // Correct!
      playCorrect();
      speak(bubble.word.word);

      // Mark as popped
      setBubbles(prev => prev.map(b =>
        b.id === bubbleId ? { ...b, isPopped: true } : b
      ));

      // Update score and check win condition
      const newScore = bubbleScore + 1;
      setBubbleScore(newScore);

      if (newScore >= 5) {
        endBubbleWave();
      }

      // Remove after animation
      setTimeout(() => {
        setBubbles(prev => prev.filter(b => b.id !== bubbleId));
      }, 500);
    } else {
      // Wrong!
      playWrong();
      setBubbles(prev => prev.map(b =>
        b.id === bubbleId ? { ...b, isWrong: true } : b
      ));

      // Reset wrong state after animation
      setTimeout(() => {
        setBubbles(prev => prev.map(b =>
          b.id === bubbleId ? { ...b, isWrong: false } : b
        ));
      }, 500);
    }
  };

  const endBubbleWave = () => {
    setBubbleWaveActive(false);
    if (bubbleSpawnerRef.current) clearInterval(bubbleSpawnerRef.current);
    setBubbles([]);
    speak("Great job!");

    setTimeout(() => {
      // World Complete or Next Wave logic? 
      // For MVP, let's treat 5 pops as "Round Complete" -> Next World
      if (currentWorldIndex < WORLD_ORDER.length - 1) {
        const nextWorld = WORLDS[WORLD_ORDER[currentWorldIndex + 1]];
        setNextWorldName(nextWorld.name);
        setShowWorldComplete(true);
      } else {
        setShowComplete(true);
      }
    }, 1000);
  };

  const setupMemoryGame = (worldWords: Word[]) => {
    // Select 6 random words for the board (or fewer if world has less)
    const selectedWords = shuffleArray([...worldWords]).slice(0, 6);

    let cards: MemoryCard[] = [];
    selectedWords.forEach((w, index) => {
      // Image Card
      cards.push({
        id: index * 2,
        word: w.word,
        image: w.image,
        isFlipped: false,
        isMatched: false
      });
      // Word Card
      cards.push({
        id: index * 2 + 1,
        word: w.word,
        text: w.word,
        isFlipped: false,
        isMatched: false
      });
    });

    setMemoryCards(shuffleArray(cards));
    setMemoryFlipped([]);
    setIsCheckingMatch(false);
    setStars(0);
  };

  const handleMemoryCardClick = (index: number) => {
    if (isCheckingMatch || memoryCards[index].isFlipped || memoryCards[index].isMatched) return;

    // Flip the card
    const newCards = [...memoryCards];
    newCards[index].isFlipped = true;
    setMemoryCards(newCards);

    // Play sound if it's a word card
    if (newCards[index].text) {
      speak(newCards[index].text!);
    }

    const newFlipped = [...memoryFlipped, index];
    setMemoryFlipped(newFlipped);

    // Check for match
    if (newFlipped.length === 2) {
      setIsCheckingMatch(true);
      const card1 = newCards[newFlipped[0]];
      const card2 = newCards[newFlipped[1]];

      if (card1.word === card2.word) {
        // Match found!
        setFeedbackText("Perfect Pair! ⭐");
        setStars(s => s + 1);
        playCorrect();

        setTimeout(() => {
          const matchedCards = [...newCards];
          matchedCards[newFlipped[0]].isMatched = true;
          matchedCards[newFlipped[1]].isMatched = true;
          setMemoryCards(matchedCards);
          setMemoryFlipped([]);
          setIsCheckingMatch(false);
          setFeedbackText("");

          // Check Win Condition
          if (matchedCards.every(c => c.isMatched)) {
            // World Complete
            setTimeout(() => {
              if (currentWorldIndex < WORLD_ORDER.length - 1) {
                const nextWorld = WORLDS[WORLD_ORDER[currentWorldIndex + 1]];
                setNextWorldName(nextWorld.name);
                setShowWorldComplete(true);
              } else {
                setShowComplete(true);
              }
            }, 1000);
          }
        }, 1000);
      } else {
        // No match
        playWrong();
        setMascotStatus("sad");
        setTimeout(() => {
          const resetCards = [...newCards];
          resetCards[newFlipped[0]].isFlipped = false;
          resetCards[newFlipped[1]].isFlipped = false;
          setMemoryCards(resetCards);
          setMemoryFlipped([]);
          setIsCheckingMatch(false);
          setMascotStatus("idle");
        }, 1500);
      }
    }
  };

  const setupFindTheRound = (words: Word[], questionIndex: number) => {
    const numImages = Math.min(4, words.length); // 4 images for medium difficulty
    const targetWord = words[questionIndex];
    const otherWords = words.filter(w => w.word !== targetWord.word);
    const shuffledOthers = shuffleArray([...otherWords]).slice(0, numImages - 1);
    const allImages = shuffleArray([targetWord, ...shuffledOthers]);
    setFindTheImages(allImages);
    setFindTheTarget(targetWord);
    setFindTheShaking(null);
    setFindTheCorrect(null);
  };

  // Shuffle words when world changes or game starts
  useEffect(() => {
    if (gameState === "playing") { // Only shuffle if game is playing, not on splash
      const newShuffled = shuffleArray([...currentWorld.words]);
      setShuffledWords(newShuffled);
      // Also setup findThe round if in that mode
      if (gameMode === "findThe") {
        setupFindTheRound(newShuffled, 0);
        setCurrentQuestionIndex(0);
      } else if (gameMode === "memory") {
        setupMemoryGame(currentWorld.words);
      } else if (gameMode === "bubblePop") {
        setupBubbleWave(currentWorld.words);
      }
    }
  }, [currentWorldIndex, currentWorld.words, gameState]);

  const currentQuestion = shuffledWords[currentQuestionIndex] || currentWorld.words[0];

  // Generate options when question changes
  useEffect(() => {
    if (currentQuestion) {
      const otherWords = currentWorld.words.filter(w => w.word !== currentQuestion.word);
      const shuffledOthers = shuffleArray([...otherWords]);

      // Use 3 wrong options for WordToImage (Read & Match) for a 2x2 grid
      // Use 2 wrong options for ImageToWord (Look & Find)
      const numWrong = gameMode === 'wordToImage' ? 3 : 2;

      const wrongOptions = shuffledOthers.slice(0, numWrong);
      const options = shuffleArray([currentQuestion, ...wrongOptions]);
      setCurrentOptions(options);
    }
  }, [currentQuestionIndex, currentWorldIndex, currentQuestion, currentWorld, gameMode]);

  // Speak word when question changes (for imageToWord and wordToImage modes)
  useEffect(() => {
    if (gameState === "playing" && currentQuestion && gameMode !== "findThe" && gameMode !== "memory" && gameMode !== "bubblePop") {
      const timer = setTimeout(() => {
        speak(currentQuestion.word);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentQuestionIndex, gameState, currentQuestion, speak, gameMode]);

  // Auto-play instruction for Find The mode
  useEffect(() => {
    if (gameState === "playing" && gameMode === "findThe" && findTheTarget) {
      const timer = setTimeout(() => {
        speak(`Find the ${findTheTarget.word}`);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [gameState, gameMode, findTheTarget, speak]);

  const handleAnswer = (selectedAnswer: string, buttonIndex: number) => {
    if (isAnswering) return;

    if (selectedAnswer === currentQuestion.word) {
      // Correct answer
      setIsAnswering(true);
      setPulsingButton(buttonIndex);
      setMascotStatus("happy");
      // Audio removed as per request
      setFeedbackText(`⭐ ${currentQuestion.word}!`);
      setStars((s) => s + 1);
      setShowCelebration(true);

      setTimeout(() => {
        setShowCelebration(false);
        setFeedbackText("");
        setPulsingButton(null);
        setMascotStatus("idle");

        if (currentQuestionIndex < totalQuestions - 1) {
          setCurrentQuestionIndex((q) => q + 1);
        } else {
          // World complete - show transition screen
          if (currentWorldIndex < WORLD_ORDER.length - 1) {
            const nextWorld = WORLDS[WORLD_ORDER[currentWorldIndex + 1]];
            setNextWorldName(nextWorld.name);
            setShowWorldComplete(true);
          } else {
            setShowComplete(true);
          }
        }
        setIsAnswering(false);
      }, 1200);
    } else {
      // Wrong answer
      setShakingButton(buttonIndex);
      setMascotStatus("sad");
      // Audio removed as per request
      setTimeout(() => {
        setShakingButton(null);
        setMascotStatus("idle");
      }, 400);
    }
  };

  const handleNextWorld = () => {
    if (currentWorldIndex < WORLD_ORDER.length - 1) {
      setCurrentWorldIndex((w) => w + 1);
      setCurrentQuestionIndex(0);
      setStars(0);
      setShowComplete(false);
    }
  };

  const handlePrevWorld = () => {
    if (currentWorldIndex > 0) {
      setCurrentWorldIndex((w) => w - 1);
      setCurrentQuestionIndex(0);
      setStars(0);
      setShowComplete(false);
    }
  };

  const handlePlayAgain = () => {
    setCurrentQuestionIndex(0);
    setStars(0);
    setShowComplete(false);
  };

  const handleContinueToNextWorld = () => {
    setShowWorldComplete(false);

    const nextIndex = currentWorldIndex + 1;
    setCurrentWorldIndex(nextIndex);
    setCurrentQuestionIndex(0);
    setStars(0);

    // Re-initialize logic for the new world depending on mode
    // Note: bubblePop is handled by useEffect that watches currentWorldIndex
    const nextWorld = WORLDS[WORLD_ORDER[nextIndex]];
    if (gameMode === 'memory') {
      setupMemoryGame(nextWorld.words);
    } else if (gameMode === 'findThe') {
      const newShuffled = shuffleArray([...nextWorld.words]);
      setShuffledWords(newShuffled);
      setupFindTheRound(newShuffled, 0);
    }
    // bubblePop is triggered by useEffect watching currentWorldIndex
  };

  const SplashScreen: React.FC<{ onStart: (mode: "imageToWord" | "wordToImage" | "findThe" | "memory") => void }> = ({ onStart }) => {
    return (
      <div id="splash-screen" style={{
        backgroundImage: "url('/assets/images/HOME-BACK.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="splash-content-v2">
          {/* Animated Icon Conveyor Belt */}
          <div className="icon-conveyor">
            <div className="conveyor-track">
              {/* First set of icons */}
              <span className="conveyor-icon">🐶</span>
              <span className="conveyor-icon">🐱</span>
              <span className="conveyor-icon">🌳</span>
              <span className="conveyor-icon">🏠</span>
              <span className="conveyor-icon">🚗</span>
              <span className="conveyor-icon">⭐</span>
              <span className="conveyor-icon">🎨</span>
              <span className="conveyor-icon">📚</span>
              <span className="conveyor-icon">🍎</span>
              <span className="conveyor-icon">🌈</span>
              <span className="conveyor-icon">🎵</span>
              <span className="conveyor-icon">🦋</span>
              {/* Duplicate for seamless loop */}
              <span className="conveyor-icon">🐶</span>
              <span className="conveyor-icon">🐱</span>
              <span className="conveyor-icon">🌳</span>
              <span className="conveyor-icon">🏠</span>
              <span className="conveyor-icon">🚗</span>
              <span className="conveyor-icon">⭐</span>
              <span className="conveyor-icon">🎨</span>
              <span className="conveyor-icon">📚</span>
              <span className="conveyor-icon">🍎</span>
              <span className="conveyor-icon">🌈</span>
              <span className="conveyor-icon">🎵</span>
              <span className="conveyor-icon">🦋</span>
            </div>
          </div>

          {/* Logo Section */}
          <div className="splash-logo-container-v2">
            <div className="splash-logo-v2">
              <span className="letter l1">W</span>
              <span className="letter l2">o</span>
              <span className="letter l3">r</span>
              <span className="letter l4">d</span>
              <span className="hyphen">-</span>
              <span className="letter l5">Q</span>
              <span className="letter l6">u</span>
              <span className="letter l7">e</span>
              <span className="letter l8">s</span>
              <span className="letter l9">t</span>
            </div>
            <div className="subtitle-with-mascot">
              <div className="subtitle-mascot">
                <img
                  src="/assets/images/hero-mascot.png"
                  alt="Zaffo Mascot"
                  className="subtitle-mascot-img"
                />
              </div>
              <p className="splash-subtitle-v2">Learn & Play! ✨</p>
            </div>
          </div>

          {/* Action Section */}
          <div className="splash-actions-v2">
            <div className="mode-selection-container">
              <h2 className="mode-title">CHOOSE YOUR MISSION:</h2>
              <div className="mode-buttons">
                <button className="mode-select-btn image-mode-btn" onClick={() => onStart("imageToWord")}>
                  <div className="mode-btn-icon">🖼️</div>
                  <div className="mode-btn-text">
                    <span className="mode-btn-name">Look & Find</span>
                    <span className="mode-btn-desc">See image, find word</span>
                  </div>
                </button>

                <button className="mode-select-btn word-mode-btn" onClick={() => onStart("wordToImage")}>
                  <div className="mode-btn-icon">Abc</div>
                  <div className="mode-btn-text">
                    <span className="mode-btn-name">Read & Match</span>
                    <span className="mode-btn-desc">Read word, find image</span>
                  </div>
                </button>

                <button className="mode-select-btn find-mode-btn" onClick={() => onStart("findThe")}>
                  <div className="mode-btn-icon">👂</div>
                  <div className="mode-btn-text">
                    <span className="mode-btn-name">Find the...</span>
                    <span className="mode-btn-desc">Hear word, tap image</span>
                  </div>
                </button>

                <button className="mode-select-btn memory-mode-btn" onClick={() => onStart("memory")}>
                  <div className="mode-btn-icon">🧠</div>
                  <div className="mode-btn-text">
                    <span className="mode-btn-name">Memory Match</span>
                    <span className="mode-btn-desc">Match Pair: Image + Word</span>
                  </div>
                </button>

                <button className="mode-select-btn bubble-mode-btn" onClick={() => onStart("bubblePop")}>
                  <div className="mode-btn-icon">🫧</div>
                  <div className="mode-btn-text">
                    <span className="mode-btn-name">Bubble Pop</span>
                    <span className="mode-btn-desc">Pop the floating bubbles!</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Moving Decorations */}
          <div className="splash-decorations">
            <span className="deco d1">⭐</span>
            <span className="deco d2">🎈</span>
            <span className="deco d3">✨</span>
            <span className="deco d4">☀️</span>
          </div>

          <div className="splash-footer-v2">
            <div className="brand-pill">
              <span className="brand-text">ZAFFO WORLD</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Splash Screen
  if (gameState === "splash") {
    return (
      <div id="game-container">
        <SplashScreen onStart={startGame} />
      </div>
    );
  }

  return (
    <div id="game-container">
      <div id="background"></div>

      {/* Premium Decorative Particles */}
      <div className="game-particles">
        <div className="particle p1">✨</div>
        <div className="particle p2">⭐</div>
        <div className="particle p3">🎈</div>
      </div>

      {/* Header */}
      <header id="top-bar">
        <div id="world-sign">
          <button
            className="world-nav-btn"
            onClick={handlePrevWorld}
            disabled={currentWorldIndex === 0}
          >
            ◀
          </button>
          <span id="world-icon">{currentWorld.icon}</span>
          <span id="world-name">{currentWorld.name}</span>
          <button
            className="world-nav-btn"
            onClick={handleNextWorld}
            disabled={currentWorldIndex === WORLD_ORDER.length - 1}
          >
            ▶
          </button>
        </div>


        <div id="stats">
          <button
            className="nav-btn home-btn"
            onClick={() => {
              setGameState("splash");
              setCurrentQuestionIndex(0);
              setStars(0);
            }}
            title="Back to Home"
          >
            🏠
          </button>
          <button
            className="nav-btn switch-btn"
            onClick={() => setShowGameSwitchModal(true)}
            title="Switch Game Mode"
          >
            🔄
          </button>
          <button
            id="sound-toggle"
            className="sound-btn"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? "🔇" : "🔊"}
          </button>
          <div className="stat-item" id="stars-display">
            <span className="stat-icon">⭐</span>
            <span id="stars-count">{gameMode === 'memory' ? `${stars}/6` : gameMode === 'bubblePop' ? `${bubbleScore}/5` : stars}</span>
          </div>
        </div>
      </header>

      {/* Main Game Area */}
      <main id="game-area" className={gameMode}>
        {gameMode === "findThe" ? (
          /* Find The Game Mode */
          <div className="find-the-container">
            <div className="find-the-instruction">
              <div className="find-the-word-display">
                Find the: <span className="find-the-target-word">{findTheTarget?.word || "..."}</span>
              </div>
              <button
                className="find-the-speaker"
                onClick={() => findTheTarget && speak(`Find the ${findTheTarget.word}`)}
              >
                🔊
              </button>
            </div>
            <div className="find-the-grid">
              {findTheImages.map((item, index) => (
                <button
                  key={index}
                  className={`find-the-card ${findTheCorrect === index ? 'correct' : ''} ${findTheShaking === index ? 'shake' : ''}`}
                  onClick={() => {
                    if (findTheTarget && item.word === findTheTarget.word) {
                      // Correct!
                      setFindTheCorrect(index);
                      // Audio removed as per request
                      setTimeout(() => {
                        // Next round
                        const nextIndex = currentQuestionIndex + 1;
                        if (nextIndex < shuffledWords.length) {
                          setCurrentQuestionIndex(nextIndex);
                          setStars(s => s + 1);
                          setupFindTheRound(shuffledWords, nextIndex);
                        } else {
                          // World complete - move to next world
                          setStars(s => s + 1);
                          if (currentWorldIndex < WORLD_ORDER.length - 1) {
                            const nextWorld = WORLDS[WORLD_ORDER[currentWorldIndex + 1]];
                            setNextWorldName(nextWorld.name);
                            setShowWorldComplete(true);
                          } else {
                            setShowComplete(true);
                          }
                        }
                      }, 1500); // Reduced delay since no speech
                    } else {
                      // Wrong - try again
                      setFindTheShaking(index);
                      // Audio removed as per request
                      setTimeout(() => setFindTheShaking(null), 500);
                    }
                  }}
                  disabled={findTheCorrect !== null}
                >
                  <img src={item.image} alt={item.word} className="find-the-img" />
                  {findTheCorrect === index && (
                    <>
                      <div className="find-the-checkmark">✅</div>
                      <div className="find-the-burst"></div>
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>
        ) : gameMode === "memory" ? (
          /* Memory Game Mode */
          <div className="memory-grid-container">
            <div className="memory-grid">
              {memoryCards.map((card, index) => (
                <button
                  key={`${card.id}-${index}`}
                  className={`memory-card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
                  onClick={() => handleMemoryCardClick(index)}
                  disabled={card.isFlipped || card.isMatched}
                >
                  <div className="memory-card-inner">
                    <div className="memory-card-front">
                      <span className="card-question-mark">❓</span>
                    </div>
                    <div className="memory-card-back">
                      {card.image ? (
                        <img src={card.image} alt="card" className="memory-img" />
                      ) : (
                        <span className="memory-text">{card.text}</span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : gameMode === "bubblePop" ? (
          /* Bubble Pop Game Mode */
          <>
            {/* Persistent Target Display */}
            {bubbleTarget && (
              <div className="bubble-target-wrapper">
                <div className="bubble-target-display">
                  <span className="bubble-target-label">Pop the:</span>
                  <img src={bubbleTarget.image} className="bubble-target-img" alt={bubbleTarget.word} />
                  <span className="bubble-target-word">{bubbleTarget.word}</span>
                </div>
              </div>
            )}
            <div className="bubble-game-container">
              <div className="bubbles-area">
                {bubbles.map(bubble => (
                  <div
                    key={bubble.id}
                    className={`bubble-item ${bubble.isPopped ? 'popped' : ''} ${bubble.isWrong ? 'wrong' : ''}`}
                    style={{
                      left: `${bubble.x}%`,
                      animationDuration: `${bubble.speed}s`
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBubbleClick(bubble.id);
                    }}
                    onAnimationEnd={(e) => {
                      if (e.animationName.includes('rise')) {
                        setBubbles(prev => prev.filter(b => b.id !== bubble.id));
                      }
                    }}
                  >
                    <div className="bubble-content">
                      <img src={bubble.word.image} alt={bubble.word.word} />
                    </div>
                    {bubble.isPopped && <div className="bubble-pop-effect">💦</div>}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : gameMode === "imageToWord" ? (
          <div id="animal-frame" className="image-mode">
            <img
              id="animal-image"
              src={currentQuestion.image}
              alt="Question"
              onClick={() => speak(currentQuestion.word)}
            />
          </div>
        ) : (
          <div id="word-question-frame" className="word-mode">
            <div id="question-word-text" onClick={() => speak(currentQuestion.word)}>
              {currentQuestion.word}
            </div>
            <button className="big-speaker-icon" onClick={() => speak(currentQuestion.word)}>🔊</button>
          </div>
        )
        }

        {/* Answer Buttons - not shown in Find The, Memory, or Bubble Pop mode */}
        {
          gameMode !== "findThe" && gameMode !== "memory" && gameMode !== "bubblePop" && (
            <div id="answer-buttons" className={gameMode}>
              {currentOptions.map((option, index) => (
                <div className={`answer-option ${gameMode}`} key={index}>
                  <button
                    className={`answer-btn ${["green", "red", "blue"][index]} ${shakingButton === index ? "shake" : ""
                      } ${pulsingButton === index ? "pulse" : ""} ${gameMode}-btn`}
                    onClick={() => handleAnswer(option.word, index)}
                    disabled={isAnswering}
                  >
                    {gameMode === "imageToWord" ? (
                      option.word
                    ) : (
                      <img src={option.image} alt={option.word} className="option-img" />
                    )}
                    {pulsingButton === index && (
                      <>
                        <div className="answer-checkmark">✅</div>
                        <div className="answer-burst"></div>
                      </>
                    )}
                  </button>
                  {gameMode === "imageToWord" && (
                    <button
                      className="speaker-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        speak(option.word);
                      }}
                    >
                      🔊
                    </button>
                  )}
                </div>
              ))}
            </div>
          )
        }

        {/* Gameplay Mascot - Floating Helper */}
        <div id="mascot-container" className="gameplay-mascot">
          <div id="mascot-bubble" className={feedbackText ? "" : "hidden"}>
            <span id="mascot-message">{feedbackText || "You can do it!"}</span>
          </div>
          <img
            src="/assets/images/hero-mascot.png"
            alt="Mascot Helper"
            id="mascot-character"
            className={mascotStatus}
          />
        </div>

      </main >

      {/* Feedback - fixed at bottom of screen, outside main */}
      < div id="feedback-area" >
        <div id="feedback-text" className={feedbackText ? "show" : ""}>
          {feedbackText || "\u00A0"}
        </div>
      </div >

      {/* Celebration Overlay */}
      {
        showCelebration && (
          <div id="celebration-overlay" className="overlay">
            <div id="star-animation">⭐</div>
            <div className="sparkles">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="sparkle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    background: ["#FFD700", "#FFA500", "#FFFF00"][Math.floor(Math.random() * 3)],
                    animationDelay: `${Math.random() * 0.3}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )
      }

      {/* World Complete Transition Overlay */}
      {
        showWorldComplete && (
          <div id="world-complete-overlay" className="overlay small-popup">
            <div className="world-complete-content compact">
              <div className="trophy-icon-small">🏆</div>
              <h2 className="world-complete-title-small">{currentWorld.name} Complete!</h2>

              <div className="next-world-preview-compact">
                <span className="next-label-small">Next:</span>
                <span className="next-icon-small">{WORLDS[WORLD_ORDER[currentWorldIndex + 1]]?.icon}</span>
                <span className="next-name-small">{nextWorldName}</span>
              </div>

              <button
                className="continue-btn-small"
                onClick={handleContinueToNextWorld}
              >
                Continue ➔
              </button>
            </div>
          </div>
        )
      }

      {/* Complete Overlay */}
      {
        showComplete && (
          <div id="completion-overlay" className="overlay">
            <div className="completion-content">
              <h1 className="completion-title">Amazing!</h1>
              <p className="completion-message">You completed the {currentWorld.name} adventure!</p>
              <div className="celebration-mascot">
                <img src="/assets/images/hero-mascot.png" alt="Mascot" className="hero-mascot-img" style={{ maxWidth: '150px' }} />
              </div>
              <button
                id="play-again-btn"
                className="restart-btn"
                onClick={currentWorldIndex < WORLD_ORDER.length - 1 ? handleNextWorld : handlePlayAgain}
              >
                {currentWorldIndex < WORLD_ORDER.length - 1 ? "Next World ➔" : "Play Again ↻"}
              </button>
            </div>
          </div>
        )
      }

      {/* Game Switch Modal */}
      {
        showGameSwitchModal && (
          <div id="game-switch-modal" className="overlay small-popup">
            <div className="game-switch-content compact">
              <div className="modal-header">
                <h2>Select Game</h2>
                <button className="close-btn-text" onClick={() => setShowGameSwitchModal(false)}>×</button>
              </div>
              <div className="game-options-list">
                <button
                  className={`game-option-btn ${gameMode === 'imageToWord' ? 'active' : ''}`}
                  onClick={() => {
                    startGame('imageToWord');
                    setCurrentQuestionIndex(0);
                    setStars(0);
                    setShowGameSwitchModal(false);
                  }}
                >
                  <span className="option-icon">🖼️</span>
                  <span className="option-text">Look & Find</span>
                </button>
                <button
                  className={`game-option-btn ${gameMode === 'wordToImage' ? 'active' : ''}`}
                  onClick={() => {
                    startGame('wordToImage');
                    setCurrentQuestionIndex(0);
                    setStars(0);
                    setShowGameSwitchModal(false);
                  }}
                >
                  <span className="option-icon">Abc</span>
                  <span className="option-text">Read & Match</span>
                </button>
                <button
                  className={`game-option-btn ${gameMode === 'findThe' ? 'active' : ''}`}
                  onClick={() => {
                    startGame('findThe');
                    setCurrentQuestionIndex(0);
                    setStars(0);
                    setShowGameSwitchModal(false);
                  }}
                >
                  <span className="option-icon">👂</span>
                  <span className="option-text">Find the...</span>
                </button>
                <button
                  className={`game-option-btn ${gameMode === 'memory' ? 'active' : ''}`}
                  onClick={() => {
                    startGame('memory');
                    setCurrentQuestionIndex(0);
                    setStars(0);
                    setShowGameSwitchModal(false);
                  }}
                >
                  <span className="option-icon">🧠</span>
                  <span className="option-text">Memory Match</span>
                </button>
                <button
                  className={`game-option-btn ${gameMode === 'bubblePop' ? 'active' : ''}`}
                  onClick={() => {
                    startGame('bubblePop');
                    setCurrentQuestionIndex(0);
                    setStars(0);
                    setShowGameSwitchModal(false);
                  }}
                >
                  <span className="option-icon">🫧</span>
                  <span className="option-text">Bubble Pop</span>
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
}
