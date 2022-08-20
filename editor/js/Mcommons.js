function copyObj(a){
	if (a == null) return null;
	var r=JSON.parse(JSON.stringify(a));
	return r ? r : null;
}

function aDel(a, k){
	var aa=[];
	for (var i=0; i<a.length; i++)
		if (!i==k) aa.push(copyObj(a[i]));
	return aa;
}

function aDel1(a, k){
	var aa=[];
	for (var i=0; i<a.length; i++)
		if (!k.has(i)) aa.push(copyObj(a[i]));
	return aa;
}

var toScale12=function(k){
	return (k % 12 + 9) % 12;
}

var toScale7=function(k){
	var s12 = [0,2,4,5,7,9,11];
	var i12 = (k % 12 + 9) % 12;
	for (var i=0; i<s12.length; i++) 
		if (s12[i]==i12) return i; 
}

// 解压
function unzip(key) {

  // 将二进制字符串转换为字符数组
 var charData = key.split('').map(function (x) { return x.charCodeAt(0); });
 
  // 将数字数组转换成字节数组
  var binData = new Uint8Array(charData);
 
  // 解压
  var data = pako.inflate(binData);
 
  // 将GunZip ByTAREAR转换回ASCII字符串
  key = String.fromCharCode.apply(null, new Uint16Array(data));
 
  //unescape(str)  --->解压后解码，防止中午乱码
  return unescape(key);
}
 
// 压缩
function zip(str) {
  //escape(str)  --->压缩前编码，防止中午乱码
  var binaryString = pako.gzip(escape(str), { to: 'string' });
  return String.fromCharCode.apply(null, binaryString);
}

