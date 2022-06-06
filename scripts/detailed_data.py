import json
path = r'C:\Users\391\Desktop\1.csv'
with open(path, 'r', encoding='utf8') as f:
    data = f.readlines()
    for i,line in enumerate(data):
        line = line.strip()
        line = line.split(',')
        data[i] = line
data[0][0] = '秦山核电厂'
plant_tree = {}
for line in data:
    if line[0] != '':
        cur_factory = line[0]
        plant_tree[cur_factory] = {}
    
    plant_tree[cur_factory][line[1]] = {
        '装机容量': line[2],
        '发电量': line[3],
        '上网电量': line[4],
        '核电设备利用小时数': line[5],
        '机组能力因子': line[6]
    }
# print(plant_tree)

data_path = r'D:\material\repos\web-page\nuclear_power_plant\lib\data\data2.json'
with open(data_path, 'r', encoding='utf8') as f:
    data = json.loads(f.read())
for plant in data:
    plant_name = plant['name'][:2]
    for factory, workers in plant_tree.items():
        if factory[:2] == plant_name:
            t = plant.get('factory',{})
            t[factory] = workers
            plant['factory'] = t
data_path2 = r'D:\material\repos\web-page\nuclear_power_plant\lib\data\data3.json'
with open(data_path2, 'w', encoding='utf8') as f:
    f.write(json.dumps(obj=data, ensure_ascii=False))
for plant in data:
    if plant['status'] == '已投入运营' and 'factory' not in plant.keys():
        print(plant['name']) 
print(len(data))