module.exports = {
    name:"yasaklikelime",
    aliases:["ykelime","kban","yasak"],
    async execute(message,args,Discord,RolVarMi,log,Roller,MesajGönder,conn,Tags,client,tag,KanalBul,kural){
        if(!RolVarMi(message,Roller["Management"])) return MesajGönder(message,"Bu komutu kullanamazsınız.")
        if(!args[0]) return MesajGönder(message,"!yasaklikelime [ekle/cikar] [kelime]")
        if(args[0] == "ekle"){
            if(!args[1]) return MesajGönder(message,"!yasaklikelime ekle [kelime]")
            const eklencek = args.splice(1,args.length).join(" ")
            const kelime = await tag.get("yasakliKelime")
            kelime.kelimelist.push(eklencek)
            await Tags.update({yasakliKelime:kelime},{where:{guild_id:message.guild.id}})
            message.react("👍")

        }
        else if(args[0] == "cikar"){
            if(!args[1]) return MesajGönder(message,"!yasaklikelime cikar [kelime]")
            const kelime = await tag.get("yasakliKelime")
            const cikarilacak = args.splice(1,args.length).join(" ")
            if(kelime.kelimelist.includes(cikarilacak)){
                data.kelimelist.splice(data.kelimelist.indexOf(cikarilacak),1)
                await Tags.update({yasakliKelime:kelime},{where:{guild_id:message.guild.id}})
                message.react("👍")
            }
        }
    }
}