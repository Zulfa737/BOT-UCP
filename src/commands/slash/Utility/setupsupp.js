const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../../config');
const { time } = require('../../../../functions');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('setupsupp')
        .setDescription('setup support.'),
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
                { name: '__Character Story__', value: `> To create a story character for your character, please fill it in correctly, and wait for the admin to approve/danify your story character.` },
                { name: '__Character Killed__', value: `> To turn off your character, please fill in the format given by the bot correctly, and wait for the announcement from the admin to approve/danify your character as killed.` },
                { name: '__Reports Bugs__', value: `> To report bugs that occur in-game, please fill in the format correctly so that the developer can fix the bugs quickly.` },
                { name: '__Suggestions__', value: `> To provide suggestions/criticism to the server, please provide criticism/suggestions to the server so that the server becomes a better community than before.` },
            )
            .setColor("5865F2")
            .setFooter({ text: "Copyright (c) 2024 Kota Impian Roleplay (All rights reversed)" })
            .setTimestamp();

        const buttons = new ActionRowBuilder()
            .addComponents(

                new ButtonBuilder()
                    .setLabel('Character Story!')
                    .setStyle('Primary')
                    .setCustomId('button-cs'),

                new ButtonBuilder()
                    .setLabel('Character Killed!')
                    .setStyle('Secondary')
                    .setCustomId('button-ck'),

                new ButtonBuilder()
                    .setLabel('Reports Bugs!')
                    .setStyle('Danger')
                    .setCustomId('button-reportbug'),

                new ButtonBuilder()
                    .setLabel('Suggestions!')
                    .setStyle('Success')
                    .setCustomId('button-saran'),
            );
        await interaction.channel.send({ embeds: [msgEmbed], components: [buttons] });
        await interaction.reply({ content: "✅ successfuly create embed", ephemeral: true });
    }
};