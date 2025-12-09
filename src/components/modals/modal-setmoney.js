const { ButtonInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');
const components = require('../../handlers/components');

module.exports = {
    customId: 'modal-setmoney',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {

        const chennel = interaction.guild.channels.cache.get('1333072076919017573');
        const charinput = interaction.fields.getTextInputValue('char_input');
        const moneyinput = interaction.fields.getTextInputValue('money_input');

        // Periksa apakah nilai photoUrl valid
        const [rows] = await MysqlGrand.query('SELECT * FROM player_characters WHERE Char_Name = ?', [charinput]);

        if (rows.length === 0) {
            return interaction.reply({ content: `❌ CHAR **${charinput}** tidak ditemukan dalam database.`, ephemeral: true });
        }

        const userData = rows[0];
        await MysqlGrand.query('UPDATE player_characters SET Char_Money = ? WHERE Char_Name = ?', [moneyinput, charinput]);
        await interaction.reply({ content: `✅ Char Name: **${charinput}** berhasil negset money sebesar **${moneyinput}**`, ephemeral: true });

        const embed = new EmbedBuilder()
        .setTitle('Set Money Logs')
        .setDescription(`Set Money by <@${interaction.user.id}>`)
        .addFields(
            { name: 'Char Name', value: `${charinput}`, inline: false },
            { name: 'Ucp Name', value: `${userData.ucp_name}`, inline: false },
            { name: 'DiscordID', value: `${userData.discordid}`, inline: false },
            { name: 'Set Monet', value: `${moneyinpu}`, inline: false },
        )
        .setColor('#00ff1f')
        .setFooter({ text: 'Copyright (c) 2024 Kota Impian Roleplay (All rights reversed)'})
        .setTimestamp();
        await chennel.send({ embeds: [embed] });

        }
    };