//const alph = {"0":1,"1":2,"2":3,"3":4,"4":5,"5":6,"6":7,"7":8,"8":9,"9":10,"a":11,"b":12,"c":13,"d":14,"e":15,"f":16,"g":17,"h":18,"i":19,"j":20,"k":21,"l":22,"m":23,"n":24,"o":25,"p":26,"q":27,"r":28,"s":29,"t":30,"u":31,"v":32,"w":33,"x":34,"y":35,"z":36,"A":37,"B":38,"C":39,"D":40,"E":41,"F":42,"G":43,"H":44,"I":45,"J":46,"K":47,"L":48,"M":49,"N":50,"O":51,"P":52,"Q":53,"R":54,"S":55,"T":56,"U":57,"V":58,"W":59,"X":60,"Y":61,"Z":62," ":63,"?":64,".":65,":":66,",":67,"/":68,"-":69,"_":70,'+':71,"!":72,"|":73,"#":74};
var alph = []
var ordervalue = []

const alp = JSON.parse(require('fs').readFileSync(__dirname+'/config.ini'))['alphabet_order']

for (i=0;i<alp.length;i++) {
	alph.push(alp[i])
	ordervalue.push(i)

}

function encription(type,string,password,callback) {
	const max_chars = Object.keys(alph).length
	const pass = password.toString()
	var end = []
	if(string && string.toString().match('input<<>')){
		if(type == "encrypt"){
			string = btoa(require('fs').readFileSync(string.split('input<<>')[1],'UTF-8'))
		}
		if(type == "decrypt"){
			string = require('fs').readFileSync(string.split('input<<>')[1],'UTF-8').replaceAll('"','')
		}
	}
	var pass_pos = -1;

	for (i=0; i<string.length; i++) {
		pass_pos+=1;

		if(pass_pos>=pass.length){
			pass_pos=0;
		}
		function treat(adder){
			if(type == 'encrypt') {
				if(adder-max_chars>=0){
					return Math.abs(adder-max_chars)
				} else {
					return adder
				}
			} else if(type=='decrypt'){
				if(adder<0){
					return Math.abs(adder + max_chars)
				} else {
					return adder
				}
			}
		}

		function gbyindex(arg){

			/**
			const normal = alp.match(arg).index
			const special = eval('alp.match(/[ `'+arg+'` ]/).index')

			console.log('normal index: '+normal+'\nSpecial index: '+special)
			if(normal!=special){
				console.log('>>> arg:'+arg+' -> '+alp[special]+'\n'+eval('alp.match(/[ `'+arg+'` ]/g)'))
			}
			**/
			return alp.indexOf(arg)+1
		}

		if(type=='encrypt'){

			//alph = alphabet
			//ordervalue = order

//console.log(Object.keys(alph)[treat(alph[string[i]] + Number(pass[pass_pos])+1)])
			end.push(alph[treat(gbyindex(string[i]) + Number(pass[pass_pos])-1)])
		} else if(type=='decrypt') {

			//console.log(treat(alph[string[i]] - Number(pass[pass_pos])-1))
			end.push(alph[treat(gbyindex(string[i]) - Number(pass[pass_pos])-1)])
		}
	}

	callback(end)
	return end;
}


function start_process(is_file_decrypt) {
if(process.argv[5] == "--reencrypt"){
	if(!process.argv[6]) console.log('ERR: Must include reencryption loop times (Ex: --reencrypt 3)')
		var str = process.argv[3]
	var old = str
	var limit = process.argv[6]
	var num = 0;
	while (num<limit){
		num+=1;
			encription(process.argv[2],str,process.argv[4],function(new_str){
			str = new_str
			})
	} 
	if(process.argv[2] == "decrypt" && old.match("input<<>")){
			require('fs').writeFileSync(process.argv[3].toString().split('input<<>')[1],atob(str.join('')))
			return "Sucessfully decrypted file! Saved to PATH: "+process.argv[3].toString().split('input<<>')[1]
	} else if(process.argv[2] == "encrypt" && old.match("input<<>")) {
			require('fs').writeFileSync(process.argv[3].toString().split('input<<>')[1],str.join(''))
			return "Sucessfully encrypted file! Saved to PATH: "+process.argv[3].toString().split('input<<>')[1]
	} else {
		return str.join('')
	}

} else {


		if(process.argv[2] == "decrypt" && process.argv[3].toString().match("input<<>")){
			require('fs').writeFileSync(process.argv[3].toString().split('input<<>')[1],atob(encription(process.argv[2],process.argv[3],process.argv[4],function(enc){}).join('').replaceAll('"','')))
			return "Sucessfully decrypted file! Saved to PATH: "+process.argv[3].toString().split('input<<>')[1]
		} else if (process.argv[2] == "encrypt" && process.argv[3].toString().match("input<<>")){
						require('fs').writeFileSync(process.argv[3].toString().split('input<<>')[1],encription(process.argv[2],process.argv[3],process.argv[4],function(enc){}).join('').replaceAll('"',''))
			return "Sucessfully decrypted file! Saved to PATH: "+process.argv[3].toString().split('input<<>')[1]
		}else {
			return encription(process.argv[2],process.argv[3],process.argv[4],function(enc){}).join('');
		}
}
}

console.log(`"${start_process()}"`)


//   criptov2 encrypt "message" <int_password> --reencrypt <reencrypt_times>

////////