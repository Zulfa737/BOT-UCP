const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../../config');
const { time } = require('../../../../functions');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('verfied')
        .setDescription('setup verfied Kota Impian.'),
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
            .setTitle("Kota Impian Verfikasi")
            .setDescription('Press the button below to verify your account on the Kota Impian Roleplay server, the purpose of this verification is to prevent double discord, bots entering, and new discord accounts')
            ////.setImage('https://media.discordapp.net/attachments/1323587126071394398/1323814953379037295/Tanpa_judul_1080_x_258_piksel_1.png?ex=6775e240&is=677490c0&hm=70dc9322fabd39d03fb802e963d5a9136293180c54d2131e65e20173f5c917ce&=&format=webp&quality=lossless&width=550&height=131')
            .setColor("5865F2")
            .setFooter({ text: "Copyright (c) 2024 Kota Impian Roleplay (All rights reversed)" })
            .setTimestamp();

        const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Verfikasi Discord!')
                    .setStyle('Danger')
                    .setCustomId('button-verifed')
            );

        await interaction.channel.send({ embeds: [msgEmbed], components: [buttons] });
        await interaction.reply({ content: "Succes Create Embed Verfikasi", ephemeral: true });
    }
};