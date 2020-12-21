import sys

f = open(sys.argv[1], "r")
content = f.read()
lines = content.splitlines()
f.close()

valid_count = 0

pass_arr = []
cur_entry = ''
for line in lines:
    if line == '/n':
        # start new entry
        pass_arr.append(cur_entry)
        cur_entry = '' 
    else:
        if len(cur_entry) > 0:
            cur_entry += ' ' + line
        else:
            cur_entry += line

for password in pass_arr:
    split = password.split()
    if len(split) == 8:
        valid_count += 1
        continue