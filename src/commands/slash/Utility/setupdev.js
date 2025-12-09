const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../../config');
const { time } = require('../../../../functions');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('setupdev')
        .setDescription('setup dev Kota Impian.'),
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
            .setTitle("Kota Impian Admin Panel")
            .setDescription('We have provided an option below to help you:')
            //.setImage('https://media.discordapp.net/attachments/1287019974107467790/1434903428064346265/1762178012931.jpg?ex=690bffb4&is=690aae34&hm=380dffc8c0d9eafa837f1c9587b0581532e6ecf4e80cf16a8ae4a616dba7e6a8&=&format=webp&width=943&height=551')
            .addFields(
                { name: '__Set Money Button__', value: `> To set money player this charater to database` },
                { name: '__Set Admin Button__', value: `> To set admin level and name admin via database` },
            )
            .setColor("5865F2")
            .setFooter({ text: "Copyright (c) 2024 Kota Impian Roleplay (All rights reversed)" })
            .setTimestamp();

        const buttons = new ActionRowBuilder()
            .addComponents(

                new ButtonBuilder()
                    .setLabel('Set Money!')
                    .setStyle('Secondary')
                    .setCustomId('button-setmoney'),

                new ButtonBuilder()
                    .setLabel('Set Admin!')
                    .setStyle('Secondary')
                    .setCustomId('button-setadmin')
            );

        await interaction.channel.send({ embeds: [msgEmbed], components: [buttons] });
        await interaction.reply({ content: "✅ successfuly create embed", ephemeral: true });
    }
};