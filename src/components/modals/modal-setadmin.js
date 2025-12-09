const { ButtonInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');
const components = require('../../handlers/components');

module.exports = {
    customId: 'modal-setadmin',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {

        const chennel = interaction.guild.channels.cache.get('1330670627861827624');
        const charinput = interaction.fields.getTextInputValue('char_input');
        const admininput = interaction.fields.getTextInputValue('admin_input');
        const adminlevelinput = interaction.fields.getTextInputValue('adminlevel_input');

        // Periksa apakah nilai photoUrl valid
        const [rows] = await MysqlGrand.query('SELECT * FROM player_characters WHERE Char_Name = ?', [charinput]);
        const number = parseInt(adminlevelinput, 10);

        if (isNaN(number) || number < 1 || number > 6) {
            return interaction.reply({ content: '❌ Harap masukkan angka antara 1 hingga 6!', ephemeral: true });
        }

        await interaction.reply({ content: `✅ Anda memasukkan angka: ${number}`, ephemeral: true });
        if (rows.length === 0) {
            return interaction.reply({ content: `❌ CHAR **${charinput}** tidak ditemukan dalam database.`, ephemeral: true });
        }

        const userData = rows[0];
        await MysqlGrand.query('UPDATE player_characters SET Char_Admin = ?, Char_AdminName = ? WHERE Char_Name = ?', [adminlevelinput], [admininput], [charinput]);
        await interaction.reply({ content: `✅ Char Name: **${charinput}** berhasil setadmin dengan name admin **${admininput}**, dengan level admin ${adminlevelinput}`, ephemeral: true });

        const embed = new EmbedBuilder()
        .setTitle('Set Admin Logs')
        .setDescription(`Set Admin by <@${interaction.user.id}>`)
        .addFields(
            { name: 'Chare Name', value: `${charinput}`, inline: false },
            { name: 'DiscordID', value: `${userData.discordid}`, inline: false },
            { name: 'Admin Name', value: `${admininput}`, inline: false },
            { name: 'Admin Level', value: `${adminlevelinput}`, inline: false },
        )
        .setColor('#00ff1f')
        .setFooter({ text: 'Copyright (c) 2024 Kota Impian Roleplay (All rights reversed)'})
        .setTimestamp();
        await chennel.send({ embeds: [embed] });

        }
    };