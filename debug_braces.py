
def check_braces(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    stack = []
    lines = content.split('\n')
    for i, line in enumerate(lines):
        line_num = i + 1
        for j, char in enumerate(line):
            if char == '{':
                stack.append((line_num, j + 1))
            elif char == '}':
                if not stack:
                    print(f"ERROR: Extra closing brace at line {line_num}, col {j+1}")
                else:
                    stack.pop()
    
    if stack:
        print("ERROR: Unclosed braces found:")
        for line, col in stack:
            print(f"  - Starting at line {line}, col {col}")
    else:
        print("SUCCESS: Braces are perfectly balanced!")

if __name__ == "__main__":
    check_braces(r'c:\Users\LENOVO\Desktop\shahar\Zaffo\word-quest\next-version\app\game.css')
