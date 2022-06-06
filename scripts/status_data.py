import re
a = '''    
    桃花江核电站，28.60, 112.37（益阳市）
    咸宁核电站，29.66, 114.67（咸宁市）
    彭泽核电站，29.90, 116.55（彭泽县）
    徐大堡核电站 40°21′05″N 120°32′47″E（葫芦岛市）
    涪陵核电站（重庆市）
    海丰核电站（海丰县）
    三坝核电站（蓬安县）
    龙游核电站（龙游县）
    东港核电站（东港市）
    芜湖核电站，31.35, 118.37（芜湖市）
    南阳核电站，33°19'07"N, 112°32'27"E（南阳市）
    小墨山核电站，29.36, 113.13（岳阳市）
    靖宇核电站，42°34'06"N, 127°03'44"E（靖宇县）
    吉阳核电站（池州市）
    漳州核电站（漳州市）
    三明核电站（三明市）
    揭阳核电站（揭阳市）
    韶关核电站（韶关市）
    佳木斯核电站，46.8°N, 130.3°E（佳木斯市）
    苍南核电站（苍南县）
    松滋核电站（松滋市）
    烟家山核电（万安县）
    肇庆核电站（肇庆市）
'''
b = '确认筹建'
a = a.split('\n')
for i,line in enumerate(a):
    line = [i for i in line.split(' ') if i not in  ['', ' ']]
    if line != []:
        # line = line[0].split('，')
        line = re.split('，|（', line[0])
        a[i] = line[0]
a = [i for i in a if i != '']
print(a)
import json
# path = 'D:\material\\repos\web-page\\nuclear_power_plant\lib\data\data.json'
path2 = 'D:\material\\repos\web-page\\nuclear_power_plant\lib\data\data2.json'
with open(path2, 'r', encoding='utf8') as f:
    data = json.loads(f.read())
    for item in data:
        if item['name'] in a:
            item['status'] = b
for item in data:
    if 'status' not in item.keys():
        print(item)
with open(path2, 'w', encoding='utf8') as f:
    f.write(json.dumps(data, ensure_ascii=False))
