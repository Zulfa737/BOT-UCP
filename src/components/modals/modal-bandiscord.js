const { ButtonInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');
const components = require('../../handlers/components');

module.exports = {
    customId: 'modal-bandiscord',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {

        const chennel = interaction.guild.channels.cache.get('1403012090733527140');
        const ucpinput = interaction.fields.getTextInputValue('ucp_input');
        const reasoninput = interaction.fields.getTextInputValue('reason_input');

        // Periksa apakah nilai photoUrl valid
        const [rows] = await MysqlGrand.query('SELECT * FROM playerucp WHERE ucp = ?', [ucpinput]);

        if (rows.length === 0) {
            return interaction.reply({ content: `❌ UCP **${ucpinput}** tidak ditemukan dalam database.`, ephemeral: true });
        }

        const userData = rows[0];
        await MysqlGrand.query('INSERT INTO player_bans (name, ip, admin, reason) VALUES (?, ?, ?, ?)', [ucpinput, userData.ip, interaction.user.username, reasoninput]);
        await interaction.reply({ content: `✅ UCP Name: **${userData.ucp}** (Discord ID: ${userData.DiscordID}) telah di banneds`, ephemeral: true });

        const embed = new EmbedBuilder()
        .setTitle('Banneds IP Players')
        .setDescription(`Your UCP Banneds by <@${interaction.user.id}>`)
        .addFields(
            { name: 'UCP', value: `${ucpinput}`, inline: false },
            { name: 'DiscordID', value: `${userData.DiscordID}`, inline: false },
            { name: 'Reason', value: `${reasoninput}`, inline: false },
            { name: 'Banneds', value: `permanent`, inline: false },
        )
        .setColor('#FF0000')
        .setFooter({ text: 'Copyright (c) 2024 Kota Impian Roleplay (All rights reversed)'})
        .setTimestamp();
        await chennel.send({
            content: `Dear <@${userData.DiscordID}>`, embeds: [embed]
        });

        }
    };