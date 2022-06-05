import json
import re
from functools import reduce
path = 'D:\material\\repos\web-page\\nuclear_power_plant\lib\data\data.txt'
path2 = 'D:\material\\repos\web-page\\nuclear_power_plant\lib\data\data.json'
data = []
def cortrans(cor):
    items = [i for i in re.split('[°′\'"″]', cor[: -1]) if i != '']
    result = reduce(lambda a,b: a + b/60 ,map(float,items))
    return result

with open(path, 'r', encoding='utf8') as f:
    for line in f.readlines():
        if line == '已投入运营\n':
            cur_state = '已投入运营'
        elif line == '建设中\n':
            cur_state = '建设中'
        elif line == '确认筹建\n':
            cur_state = '确认筹建'
        elif line != '\n':
            obj = [i for i in re.split('[ ，,（）]', line) if i not in ' \n']

            # format
            if len(obj) == 4:
                # modify coordinates
                try :
                    co1 = float(obj[1])
                    co2 = float(obj[2])
                except:
                    co1, co2 = cortrans(obj[1]), cortrans(obj[2])
                finally:
                    if co1 > co2:
                        co1, co2 = co2, co1

                data.append({
                    'name': obj[0],
                    'state': cur_state,
                    'position': obj[-1],
                    'coordinate': [co1, co2]
                })
            elif len(obj) == 2:
                data.append({
                    'name': obj[0],
                    'state': cur_state,
                    'position': obj[-1],
                })

with open(path2, 'w', encoding='utf8') as f:
    f.write(json.dumps(data, ensure_ascii=False))

names = []
for item in data:
    names.append(item['name'])
print(json.dumps(names, ensure_ascii=False))