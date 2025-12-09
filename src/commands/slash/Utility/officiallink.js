const { ChatInputCommandInteraction, ActionRowBuilder, SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../../config');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('officallink')
        .setDescription('Show List Official Link'),
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const msgEmbed = new EmbedBuilder()
            .setTitle('Kota Impian | Roleplay ')
            //.setThumbnail(config.icon.thumbnail)
            //.setImage('https://media.discordapp.net/attachments/1287019974107467790/1434903428064346265/1762178012931.jpg?ex=690bffb4&is=690aae34&hm=380dffc8c0d9eafa837f1c9587b0581532e6ecf4e80cf16a8ae4a616dba7e6a8&=&format=webp&width=943&height=551')
            .setDescription(`Official resmi link Kota Impian Store`)
            .setColor("5865F2")
            .setFooter({ text: "© Copyright Kota Impian Store"});

        const select = new StringSelectMenuBuilder()
			.setCustomId('select-officiallink')
			.setPlaceholder('Select Discord')
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('Discord')
					.setDescription('Official Discord')
					.setValue('discord'),
                new StringSelectMenuOptionBuilder()
					.setLabel('Discord FnG')
					.setDescription('Official FnG')
					.setValue('fng')
            );
            const row = new ActionRowBuilder()
			.addComponents(select);

        await interaction.channel.send({ embeds: [msgEmbed], components: [row] });
        await interaction.reply({ content: "Succes Create Embed List Offcial", ephemeral: true });
    }
};