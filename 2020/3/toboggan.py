import sys

f = open(sys.argv[1], "r")
content = f.read()
lines = content.splitlines()
f.close()

width = len(lines[0])

def computeSlope(slope):
    right = slope[0]
    down = slope[1]
    num_trees = 0
    curr_idx = 0
    for index, line in enumerate(lines):
        if index % down == 0:
            if line[curr_idx] == '#':
                num_trees += 1
            curr_idx = (curr_idx + right) % width
    return num_trees

slopes = [(1,1), (3,1), (5,1), (7,1), (1,2)]

product = 1
for slope in slopes:
    product *= computeSlope(slope)

print(product)