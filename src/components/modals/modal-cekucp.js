const { ButtonInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');
const components = require('../../handlers/components');

module.exports = {
    customId: 'modal-cekucp',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {

        const ucpinput = interaction.fields.getTextInputValue('ucp_input');

        // Periksa apakah nilai photoUrl valid
        const [rows] = await MysqlGrand.query('SELECT * FROM playerucp WHERE ucp = ?', [ucpinput]);

        if (rows.length === 0) {
            return interaction.reply({ content: `❌ UCP **${ucpinput}** tidak ditemukan dalam database.`, ephemeral: true });
        }

        const userData = rows[0];
        const embed = new EmbedBuilder()
        .setTitle('Check UCP')
        .setDescription(`Check UCP Name : ${userData.ucp}`)
        .addFields(
            { name: 'UCP', value: `${ucpinput}`, inline: false },
            { name: 'IP', value: `${userData.ip}`, inline: false },
            { name: 'DATE CREATE', value: `${userData.reg_data}`, inline: false },
            { name: 'DiscordID', value: `${userData.DiscordID}`, inline: false },
        )
        .setColor('#FF0000')
        .setFooter({ text: 'Copyright (c) 2024 Kota Impian Roleplay (All rights reversed)'})
        .setTimestamp();
        await interaction.reply({ embeds: [embed], ephemeral: true });

        }
    };