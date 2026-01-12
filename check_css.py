
def check_braces(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    stack = []
    lines = content.split('\n')
    for i, line in enumerate(lines):
        line_num = i + 1
        for char in line:
            if char == '{':
                stack.append(line_num)
            elif char == '}':
                if not stack:
                    print(f"Extra closing brace at line {line_num}")
                else:
                    stack.pop()
    
    if stack:
        print(f"Unclosed braces starting at lines: {stack}")
    else:
        print("Braces are balanced!")

check_braces(r'c:\Users\LENOVO\Desktop\shahar\Zaffo\word-quest\next-version\app\game.css')
