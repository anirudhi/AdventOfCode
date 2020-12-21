import sys

f = open(sys.argv[1], "r")
content = f.read()
lines = content.splitlines()
f.close()

def isValid(rule_low, rule_high, letter, password):
    valid = False
    if password[rule_low - 1] == letter:
        valid = not valid
    if password[rule_high - 1] == letter:
        valid = not valid
    return valid

valid_count = 0

for line in lines:
    split_line = line.split(':')
    rule = split_line[0]
    split_rule = rule.split(' ')
    numbers = split_rule[0].split('-')
    if isValid(int(numbers[0]), int(numbers[1]), split_rule[1], split_line[1][1:]):
        valid_count += 1

print(valid_count)


