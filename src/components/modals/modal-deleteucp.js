const { ButtonInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');
const components = require('../../handlers/components');

module.exports = {
    customId: 'modal-deleteucp',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {

        const chennel = interaction.guild.channels.cache.get('1403012090733527140');
        const ucpinput = interaction.fields.getTextInputValue('ucp_input');

        // Periksa apakah nilai photoUrl valid
        const [rows] = await MysqlGrand.query('SELECT * FROM playerucp WHERE ucp = ?', [ucpinput]);

        if (rows.length === 0) {
            return interaction.reply({ content: `❌ UCP **${ucpinput}** tidak ditemukan dalam database.`, ephemeral: true });
        }

        const userData = rows[0];
        const embed = new EmbedBuilder()
        .setTitle('Delete UCP')
        .addFields(
            { name: 'UCP Name', value: `${ucpinput}`, inline: false },
            { name: 'UCP By', value: `<@${userData.DiscordID}>`, inline: false },
            { name: 'Delete By', value: `${interaction.user.username}`, inline: false },
        )
        .setColor('#00ff1f')
        .setFooter({ text: 'Copyright (c) 2024 Kota Impian Roleplay (All rights reversed)'})
        .setTimestamp();

        await MysqlGrand.query(`DELETE FROM playerucp WHERE ucp = '${ucpinput}'`);
        await interaction.reply({ content: `✅ UCP Name: **${ucpinput}** telah di delete`, ephemeral: true });

        await chennel.send({ embeds: [embed] });

        }
    };