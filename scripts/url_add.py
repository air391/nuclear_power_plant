import json
path = 'D:\material\\repos\web-page\\nuclear_power_plant\lib\data\data3.json'
path2 = 'D:\material\\repos\web-page\\nuclear_power_plant\lib\data\data4.json'
with open(path, 'r', encoding='utf8') as f:
    data_all = json.loads(f.read())
    for item in data_all:
        # item['url'] = 'https://baike.baidu.com/item/'+item['name']
        if item['status'] == '已投入运营':
            header = '''
            <div>
            <h3>{}:已投入运营</h3>
            2022年1-3月运行情况：
            <table>
                <tr>
                    <td>核电厂</td>
                    <td>机组</td>
                    <td>装机容量（MWe）</td>
                    <td>发电量（亿千瓦时）</td>
                    <td>上网电量（亿千瓦时）</td>
                    <td>核电设备\n利用小时数</td>
                    <td>机组能力因子（%）</td>
                </tr>
            '''.format(item['name'])
            tail = '''
            </table><div style=\"float: left;\"><a href=\"{}\">了解更多</a></div>
            <div style=\"text-align: right;\">数据来源：<a href=\"http://www.china-nea.cn/site/content/40689.html\">中国核能行业协会</a></div>
            </div>
            '''.format(item['url'])
            t = ''
            for factory, workers in item['factory'].items():
                for worker, data in workers.items():
                    t += "<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td><td>{}</td><td>{}</td><td>{}</td></tr>".format( (factory if worker[0] == '1' else ''), worker, data['装机容量'], data['发电量'], data['上网电量'], data['核电设备利用小时数'], data['机组能力因子'])

            item['show_html'] = header + t + tail
            # item['show_html'] = '<a href="%(url)s">%(name)s</a>'% item
        else:
            header = '''
            <div>
            <h3>{}:{}</h3>
            '''.format(item['name'], item['status'])
            tail = '''
            </table><div style=\"text-align: left;\"><a href=\"{}\">了解更多</a></div>
            </div>
            '''.format(item['url'])
            item['show_html'] = header + tail
with open(path2, 'w', encoding='utf8') as f:
    f.write(json.dumps(data_all, ensure_ascii=False))