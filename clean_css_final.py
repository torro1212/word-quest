
import os

filename = r'c:\Users\LENOVO\Desktop\shahar\Zaffo\word-quest\next-version\app\game.css'
with open(filename, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Remove lines that contain only triple backticks or ```css
clean_lines = [line for line in lines if '```' not in line]

with open(filename, 'w', encoding='utf-8') as f:
    f.writelines(clean_lines)

print("Cleaned game.css")
