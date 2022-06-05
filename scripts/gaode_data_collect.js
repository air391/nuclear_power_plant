// https://lbs.amap.com/api/webservice/guide/api/georegeo
var sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
var address = document.getElementsByName("address")[0]
var run = document.getElementsByClassName("run")[0]
var unfold = document.getElementsByClassName("expend")[0]
var names = ["秦山核电站", "大亚湾核电站", "岭澳核电站", "田湾核电站", "红沿河核电站", "宁德核电站", "阳江核电站", "方家山核电站", "福清核电站", "昌江核电站", "防城港核电站", "三门核电站", "海阳核电站", "台山核电站", "石岛湾核电站", "陆丰核电站", "太平岭核电站", "桃花江核电站", "咸宁核电站", "彭泽核电站", "徐大堡核电站", "涪陵核电站", "海丰核电站", "三坝核电站", "龙游核电站", "东港核电站", "芜湖核电站", "南阳核电站", "小墨山核电站", "靖宇核电站", "吉阳核电站", "漳州核电站", "三明核电站", "揭阳核电站", "韶 关核电站", "佳木斯核电站", "苍南核电站", "松滋核电站", "烟家山核电", "肇庆核电站"]
var data = [];
var pos_strs = [];
var poss = [];
await (async function(){
  for(var i = 0; i < names.length; i++){
  	var name = names[i];
   	await sleep(500);
    address.value = name;
    run.click();

    await sleep(1000);
  	console.log("start")
    unfold.click();
    var items = document.getElementsByClassName("jsontree_node");
  var pos_str = pos_strs[i]
  var pos = poss[i]
  pos_str = items[23].children[1].children[0].innerText;
  	pos = pos_str.substring(1,pos_str.length-1);
  	pos = pos.split(',')
    var add = items[7].children[1].children[0].innerText;
    add = add.substring(1, add.length-1)
    data[i] = {
      "name": name,
      "coordinate": [Number(pos[0]), Number(pos[1])],
    	"address": add 	
    }
    console.log("end");
	
}
})()