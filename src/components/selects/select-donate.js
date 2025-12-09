const { StringSelectMenuInteraction, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');

module.exports = {
    customId: 'select-donate',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {StringSelectMenuInteraction} interaction 
     */
    run: async (client, interaction) => {

        const value1 = interaction.values[0] == 'AboutDonate';
        const value2 = interaction.values[0] == 'HouseDonate';
        const value3 = interaction.values[0] == 'BisnisDonate';
        const value4 = interaction.values[0] == 'VipDonate';
        const value5 = interaction.values[0] == 'OtherDonate';

        const msgEmbedAccountDiscord = new EmbedBuilder()
            .setTitle('Juragan | Store ')
            //.setThumbnail(config.icon.thumbnail)
            ////.setImage('https://media.discordapp.net/attachments/1259834376158445618/1259837303845556325/20240708_184324.png?ex=66b4af6b&is=66b35deb&hm=03dac1b2ea4a3f4013998320fe154dc3470eae9a94ba3a3b3c6e3b0620d1f938&')
            .setDescription(`What is donate in Community!\n\n Donations are providing support to a community to advance the game/server it creates. Donations are voluntary or without coercion from any party.`)
            //.setColor("#5CDFA1")
            .setFooter({ text: "© Copyright Juragan Community"});
            
        const msgEmbedNitroDiscord = new EmbedBuilder()
            .setTitle('Juragan | Store ')
            //.setThumbnail(config.icon.thumbnail)
            ////.setImage('https://media.discordapp.net/attachments/1259834376158445618/1259837303845556325/20240708_184324.png?ex=66b4af6b&is=66b35deb&hm=03dac1b2ea4a3f4013998320fe154dc3470eae9a94ba3a3b3c6e3b0620d1f938&')
            .setDescription(`House High : 30k\nHouse Medium : 25k\nHouse Low : 20k`)
            //.setColor("#5CDFA1")
            .setFooter({ text: "© Copyright Juragan Community"});
         
         const msgEmbedServerBooster = new EmbedBuilder()
            .setTitle('Juragan | Store ')
            //.setThumbnail(config.icon.thumbnail)
            ////.setImage('https://media.discordapp.net/attachments/1259834376158445618/1259837303845556325/20240708_184324.png?ex=66b4af6b&is=66b35deb&hm=03dac1b2ea4a3f4013998320fe154dc3470eae9a94ba3a3b3c6e3b0620d1f938&')
            .setDescription(`Bisnis : 30k`)
            //.setColor("#5CDFA1")
            .setFooter({ text: "© Copyright Juragan Community"});
           
        const msgEmbedBuildBotjs = new EmbedBuilder()
            .setTitle('Juragan | Store ')
            //.setThumbnail(config.icon.thumbnail)
            ////.setImage('https://media.discordapp.net/attachments/1259834376158445618/1259837303845556325/20240708_184324.png?ex=66b4af6b&is=66b35deb&hm=03dac1b2ea4a3f4013998320fe154dc3470eae9a94ba3a3b3c6e3b0620d1f938&')
            .setDescription(`Vip High : 30k\nVip Medium : 25k\nVip Low : 20k`)
            //.setColor("#5CDFA1")
            .setFooter({ text: "© Copyright Juragan Community"});

        const msgEmbedOtherDonate = new EmbedBuilder()
            .setTitle('Juragan | Store ')
            //.setThumbnail(config.icon.thumbnail)
            ////.setImage('https://media.discordapp.net/attachments/1259834376158445618/1259837303845556325/20240708_184324.png?ex=66b4af6b&is=66b35deb&hm=03dac1b2ea4a3f4013998320fe154dc3470eae9a94ba3a3b3c6e3b0620d1f938&')
            .setDescription(`Skin: Rp5.000\nImport Maverick: Rp100.000 (Slot Terbatas)\nImport Jet: Rp120.000 (Slot Terbatas)\nImport Laut: Rp30.000\nImport Roda 4: Rp25.000\nImport Roda 2: Rp20.000\nPrivate Farmer: Rp20.000\nVending Machine: Rp10.000\nWorkshop: Rp60.000\nMapping: Rp2.000 per object (Max 15 Object)`)
            //.setColor("#5CDFA1")
            .setFooter({ text: "© Copyright Juragan Community"});
            
        if(value1) {
        await interaction.reply({ embeds : [msgEmbedAccountDiscord], ephemeral: true });
        }
        else if(value2) {
        await interaction.reply({ embeds : [msgEmbedNitroDiscord], ephemeral: true });
        }
        else if(value3) {
        await interaction.reply({ embeds : [msgEmbedServerBooster], ephemeral: true });
        }
        else if(value4) {
        await interaction.reply({ embeds : [msgEmbedBuildBotjs], ephemeral: true });
        }
        else if(value5) {
        await interaction.reply({ embeds : [msgEmbedOtherDonate], ephemeral: true });
        }

    }
};
