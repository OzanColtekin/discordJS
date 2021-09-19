module.exports = {
    name:"yasaklikelime",
    aliases:["ykelime","kban","yasak"],
    async execute(message,args,Discord,RolVarMi,log,Roller,MesajGönder,conn,Tags,client,tag,KanalBul,kural,fs){
        if(!RolVarMi(message,Roller["Developer"])) return MesajGönder(message,"Bu komutu kullanamazsınız.")
        if(!args[0]) return MesajGönder(message,"!yasaklikelime [ekle/cikar] [kelime]")
        if(args[0] == "ekle"){
            if(!args[1]) return MesajGönder(message,"!yasaklikelime ekle [kelime]")
            const eklencek = args.splice(1,args.length).join(" ")+","
            await fs.writeFile(`./utils/kelimeler.txt`, eklencek,{ flag: 'a+' },function (err) {
                if (err) return console.log(err);
            });
            message.react("👍")

        }
        else if(args[0] == "cikar"){
            if(!args[1]) return MesajGönder(message,"!yasaklikelime cikar [kelime]")
            const cikarilacak = args.splice(1,args.length).join(" ")+","
            await fs.readFile(`./utils/kelimeler.txt`, 'utf8', async function(err, data) {
                var kelimeler = data.split(",")
                kelimeler.splice(kelimeler.indexOf(cikarilacak),1)
                await fs.writeFile(`./utils/kelimeler.txt`, kelimeler,{ flag: 'w+' },function (err) {
                    if (err) return console.log(err);
                });

            })
            if(kelime[message.guild.id].kelimelist.includes(cikarilacak)){
                kelime[message.guild.id].kelimelist.splice(kelime[message.guild.id].kelimelist.indexOf(cikarilacak),1)
                await Tags.update({yasakliKelime:kelime},{where:{guild_id:message.guild.id}})
                message.react("👍")
            }
        }
    }
}