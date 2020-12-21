import sys

f = open(sys.argv[1], "r")
content = f.read()
lines = content.splitlines()
f.close()

lines = list(map(int, lines))

for ix, line in enumerate(lines):
    diff = 2020 - line
    for iy, check in enumerate(lines, start=ix+1):
        diff2 = 2020 - line - check
        for iz, check2 in enumerate(lines, start=iy+1):
            if check2 == diff2:
                print(line * check * check2)
                exit()
