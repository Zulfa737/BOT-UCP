const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');

module.exports = {
    customId: 'modal-aprovedck',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {

        const char = interaction.user.selectedChar;  // Ambil char yang sudah disimpan
        const chennel = interaction.guild.channels.cache.get('1324765746127179836');
        const message = interaction.fields.getTextInputValue('message-accck');

        // Pastikan char ada
        if (!char) {
            return interaction.reply({ content: 'Character is undefined or missing', ephemeral: true });
        }

        const [row] = await MysqlGrand.query(`SELECT * FROM player_characters WHERE Char_Name = '${char}'`);
        MysqlGrand.query(`DELETE FROM player_characters WHERE Char_Name = '${char}'`);

        const embed = new EmbedBuilder()
            .setDescription(`Dear <@${row[0].discordid}> announcement of character killed results`)
            .addFields(
                { name: `Name IC`, value: `> ${char}`, iniline: false }, // Gunakan nilai char yang dipilih
                { name: `Aproved/Danied`, value: `> Aproved`, iniline: false },
                { name: `Message from admin`, value: `> ${message}`, iniline: false },
                { name: `Level`, value: `> ${row[0].level}`, iniline: false }
            )
            .setColor('#00ff1f')
            .setThumbnail(`https://gta.com.ua/img/articles/sa/sa-mp/skins-id/skin_${row[0].Skin}.png`)
            .setFooter({ text: 'Copyright (c) 2024 Kota Impian Roleplay (All rights reversed)' });
        
        await chennel.send({ embeds: [embed] });
        await interaction.reply({ content: 'Character is accept Character Killed', ephemeral: true });
        }
    };