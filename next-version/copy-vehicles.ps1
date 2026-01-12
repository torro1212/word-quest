$source = "C:\Users\LENOVO\.gemini\antigravity\brain\62efcaaf-f2a9-45e3-9f3c-bd41446674be"
$dest = "C:\Users\LENOVO\Desktop\shahar\Zaffo\word-quest\next-version\public\assets\images\vehicles"

Copy-Item "$source\car_cute_1768073567879.png" "$dest\car.png" -Force
Copy-Item "$source\bus_cute_1768073581852.png" "$dest\bus.png" -Force
Copy-Item "$source\airplane_cute_1768073596663.png" "$dest\airplane.png" -Force
Copy-Item "$source\train_cute_1768073609879.png" "$dest\train.png" -Force
Copy-Item "$source\bicycle_cute_1768073645741.png" "$dest\bicycle.png" -Force
Copy-Item "$source\boat_cute_1768073659428.png" "$dest\boat.png" -Force
Copy-Item "$source\helicopter_cute_1768073675746.png" "$dest\helicopter.png" -Force
Copy-Item "$source\motorcycle_cute_1768073690696.png" "$dest\motorcycle.png" -Force
Copy-Item "$source\taxi_cute_1768073722883.png" "$dest\taxi.png" -Force
Copy-Item "$source\truck_cute_1768073737858.png" "$dest\truck.png" -Force

Write-Host "Done! All 10 images copied."
