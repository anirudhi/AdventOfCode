import sys

f = open(sys.argv[1], "r")
content = f.read()
lines = content.splitlines()
f.close()

lines = list(map(int, lines))

for idx, line in enumerate(lines):
    diff = 2020 - line
    for i, check in enumerate(lines, start=idx+1):
        if check == diff:
            print(line * check)
            exit()
