const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../../config');
const { time } = require('../../../../functions');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('setupadmin')
        .setDescription('setup admin Kota Impian.'),
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
                { name: '__Banned UCP & IP Button__', value: `> To block a UCP account, IP andreass, and delete Discord from the Kota Impian Store server, use this button correctly` },
                { name: '__Unbanned UCP Button__', value: `> To unblock UCP accounts and Kota Impian Store servers, use this button correctly` },
                { name: '__Check UCP Button__', value: `> To check user panel control players Kota Impian Store` },
                { name: '__Delete UCP Button__', value: `> To delete account player user panel control` },
            )
            .setColor("5865F2")
            .setFooter({ text: "Copyright (c) 2024 Kota Impian Roleplay (All rights reversed)" })
            .setTimestamp();

        const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Bannned UCP IP!')
                    .setStyle('Danger')
                    .setCustomId('button-bandiscord'),
                
                new ButtonBuilder()
                    .setLabel('Unbanned UCP IP!')
                    .setStyle('Danger')
                    .setCustomId('button-unbanned'),

                new ButtonBuilder()
                    .setLabel('Check UCP!')
                    .setStyle('Primary')
                    .setCustomId('button-cekucp'),

                new ButtonBuilder()
                    .setLabel('Delete UCP!')
                    .setStyle('Primary')
                    .setCustomId('button-deleteucp')
            );

        await interaction.channel.send({ embeds: [msgEmbed], components: [buttons] });
        await interaction.reply({ content: "✅ successfuly create embed", ephemeral: true });
    }
};