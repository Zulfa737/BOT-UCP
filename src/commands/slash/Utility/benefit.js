const { ChatInputCommandInteraction, ActionRowBuilder, SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../../config');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('benefit')
        .setDescription('Show List Benefit'),
    options: {
        ownerOnly: true,
        developers: true
    },
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const msgEmbed = new EmbedBuilder()
            .setTitle('Kota Impian | Roleplay ')
            //.setThumbnail(config.icon.thumbnail)
            //.setImage('https://media.discordapp.net/attachments/1287019974107467790/1434903428064346265/1762178012931.jpg?ex=690bffb4&is=690aae34&hm=380dffc8c0d9eafa837f1c9587b0581532e6ecf4e80cf16a8ae4a616dba7e6a8&=&format=webp&width=943&height=551')
            .setDescription(`Press the button below to see the list of benefits provided by the Grand Alternative Store team.`)
            //.setColor("#5CDFA1")
            ////.setImage("https://media.discordapp.net/attachments/1204061404940865567/1284485628289093746/Proyek_Baru_34_F4DEED5.gif?ex=66e6cdf6&is=66e57c76&hm=b4d9feb2cfdb10cf11cf8f1f20e89268ccd282024874154629e42f8c7e16d58d&=&width=646&height=363")
            .setFooter({ text: "© Copyright Juragan Community"});

        const select = new StringSelectMenuBuilder()
			.setCustomId('select-benefit')
			.setPlaceholder('Select Donate')
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('About Benefit')
					.setDescription('About Benefit Community')
					.setValue('AboutBenefit')
                    .setEmoji('<:icons_info:1255688561844293664>'),
                new StringSelectMenuOptionBuilder()
					.setLabel('Streamer')
					.setDescription('Benefit Stremaer')
					.setValue('StreamerBenefit')
                    .setEmoji('<:Streamer:1284701957340008449>'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Girl/Woman')
					.setDescription('Benefit Girl')
					.setValue('GirlBenefit')
                    .setEmoji('<:girl_icon:1284702417744564316>'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Booster')
					.setDescription('Benefit Booster')
					.setValue('BoostBenefit')
                    .setEmoji('<:Booster:1284702199477309582>')
            );
            const row = new ActionRowBuilder()
			.addComponents(select);

        await interaction.channel.send({ embeds: [msgEmbed], components: [row] });
        return interaction.reply({ content: "Succes Create Embed List Donate", ephemeral: true });
    }
};
