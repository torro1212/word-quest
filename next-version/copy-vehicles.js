const fs = require('fs');
const path = require('path');

const source = 'C:/Users/LENOVO/.gemini/antigravity/brain/62efcaaf-f2a9-45e3-9f3c-bd41446674be';
const dest = './public/assets/images/vehicles';

const files = [
  ['car_cute_1768073567879.png', 'car.png'],
  ['bus_cute_1768073581852.png', 'bus.png'],
  ['airplane_cute_1768073596663.png', 'airplane.png'],
  ['train_cute_1768073609879.png', 'train.png'],
  ['bicycle_cute_1768073645741.png', 'bicycle.png'],
  ['boat_cute_1768073659428.png', 'boat.png'],
  ['helicopter_cute_1768073675746.png', 'helicopter.png'],
  ['motorcycle_cute_1768073690696.png', 'motorcycle.png'],
  ['taxi_cute_1768073722883.png', 'taxi.png'],
  ['truck_cute_1768073737858.png', 'truck.png'],
];

files.forEach(([src, dst]) => {
  const srcPath = path.join(source, src);
  const dstPath = path.join(dest, dst);
  try {
    fs.copyFileSync(srcPath, dstPath);
    console.log(`Copied: ${dst}`);
  } catch (err) {
    console.error(`Error copying ${dst}:`, err.message);
  }
});

console.log('Done!');
