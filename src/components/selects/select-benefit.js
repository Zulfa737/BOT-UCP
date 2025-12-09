const { StringSelectMenuInteraction, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');

module.exports = {
    customId: 'select-benefit',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {StringSelectMenuInteraction} interaction 
     */
    run: async (client, interaction) => {

        const value1 = interaction.values[0] == 'AboutBenefit';
        const value2 = interaction.values[0] == 'StreamerBenefit';
        const value3 = interaction.values[0] == 'GirlBenefit';
        const value4 = interaction.values[0] == 'BoostBenefit';
        
        const msgEmbedAccountDiscord = new EmbedBuilder()
            .setTitle('Juragan | Store ')
            //.setThumbnail(config.icon.thumbnail)
            ////.setImage('https://media.discordapp.net/attachments/1259834376158445618/1259837303845556325/20240708_184324.png?ex=66b4af6b&is=66b35deb&hm=03dac1b2ea4a3f4013998320fe154dc3470eae9a94ba3a3b3c6e3b0620d1f938&')
            .setDescription(`What is benefit in Juragan Store!\n\n What is benefit? Benefit is the profit that is generated if you do something with certain conditions such as doing something or helping etc. that can generate profit.`)
            //.setColor("#5CDFA1")
            .setFooter({ text: "© Copyright Juragan Community"});
            
        const msgEmbedNitroDiscord = new EmbedBuilder()
            .setTitle('Juragan | Store ')
            //.setThumbnail(config.icon.thumbnail)
            ////.setImage('https://media.discordapp.net/attachments/1259834376158445618/1259837303845556325/20240708_184324.png?ex=66b4af6b&is=66b35deb&hm=03dac1b2ea4a3f4013998320fe154dc3470eae9a94ba3a3b3c6e3b0620d1f938&')
            .setDescription(`1 SANCHEZ\n100 GOLD\n10K UIC\nMAKAN MINUM 10\nVIP SILVER 7d`)
            //.setColor("#5CDFA1")
            //.setImage('https://assets.open.mp/assets/images/vehiclePictures/Vehicle_468.jpg')
            .setFooter({ text: "© Copyright Juragan Community"});
         
         const msgEmbedServerBooster = new EmbedBuilder()
            .setTitle('Juragan | Store ')
            //.setThumbnail(config.icon.thumbnail)
            ////.setImage('https://media.discordapp.net/attachments/1259834376158445618/1259837303845556325/20240708_184324.png?ex=66b4af6b&is=66b35deb&hm=03dac1b2ea4a3f4013998320fe154dc3470eae9a94ba3a3b3c6e3b0620d1f938&')
            .setDescription(`1 COMET\nVIP SILVER 7d\n50 GOLD`)
            //.setColor("#5CDFA1")
            //.setImage('https://assets.open.mp/assets/images/vehiclePictures/Vehicle_480.jpg')
            .setFooter({ text: "© Copyright Juragan Community"});
           
        const msgEmbedBuildBotjs = new EmbedBuilder()
            .setTitle('Juragan | Store ')
            //.setThumbnail(config.icon.thumbnail)
            ////.setImage('https://media.discordapp.net/attachments/1259834376158445618/1259837303845556325/20240708_184324.png?ex=66b4af6b&is=66b35deb&hm=03dac1b2ea4a3f4013998320fe154dc3470eae9a94ba3a3b3c6e3b0620d1f938&')
            .setDescription(`Store Booster`)
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

    }
};
