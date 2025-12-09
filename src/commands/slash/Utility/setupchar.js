const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../../config');
const { time } = require('../../../../functions');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('setupchar')
        .setDescription('setup character.'),
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
            .setTitle("Kota Impian Account Support")
            .setDescription('We have provided an option below to help you:')
            //.setImage('https://media.discordapp.net/attachments/1287019974107467790/1434903428064346265/1762178012931.jpg?ex=690bffb4&is=690aae34&hm=380dffc8c0d9eafa837f1c9587b0581532e6ecf4e80cf16a8ae4a616dba7e6a8&=&format=webp&width=943&height=551')
            .addFields(
                { name: '__Stremaer Settings__', value: `> to be used if the player experiences fore close/fc, this can help you and make object rendering easier on a step by step basis` },
                { name: '__Delete Character__', value: `> To be used to delete a character, use it if the character has an error or has a non-rp name. You can delete the character by pressing the button below` },
                { name: '__Display Character__', value: `> to be used to display your character, if you want to take a screenshot but are too lazy to enter the game, you can take a screen shot using this feature` }
            )
            .setColor("5865F2")
            .setFooter({ text: "Copyright (c) 2024 Kota Impian Roleplay (All rights reversed)" })
            .setTimestamp();

        const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Streamer settings!')
                    .setStyle('Secondary')
                    .setCustomId('button-streamer'),

                new ButtonBuilder()
                    .setLabel('Delete character!')
                    .setStyle('Primary')
                    .setCustomId('button-deletechar'),

                new ButtonBuilder()
                    .setLabel('Display character!')
                    .setStyle('Success')
                    .setCustomId('button-stats')
            );

        await interaction.channel.send({ embeds: [msgEmbed], components: [buttons] });
        await interaction.reply({ content: "✅ successfuly create embed", ephemeral: true });
    }
};