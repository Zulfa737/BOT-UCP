const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');

module.exports = {
    customId: 'modal-daniedck',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {

        const char = interaction.user.selectedChar;  // Ambil char yang sudah disimpan
        const chennel = interaction.guild.channels.cache.get('1324765746127179836');
        const message = interaction.fields.getTextInputValue('message-daniedck');

        // Pastikan char ada
        if (!char) {
            return interaction.reply({ content: 'Character is undefined or missing', ephemeral: true });
        }

        const [row] = await MysqlGrand.query(`SELECT * FROM users WHERE Username = '${char}'`);

        const embed = new EmbedBuilder()
            .setDescription(`Dear <@${row[0].discordid}> announcement of character killed results`)
            .addFields(
                { name: `Name IC`, value: `> ${char}`, iniline: false }, // Gunakan nilai char yang dipilih
                { name: `Aproved/Danied`, value: `> Danied`, iniline: false },
                { name: `Message from admin`, value: `> ${message}`, iniline: false },
                { name: `Level`, value: `> ${row[0].level}`, iniline: false }
            )
            .setColor('#FF0000')
            .setThumbnail(`https://gta.com.ua/img/articles/sa/sa-mp/skins-id/skin_${row[0].Skin}.png`)
            .setFooter({ text: 'Copyright (c) 2024 Kota Impian Roleplay (All rights reversed)' });
        
        await chennel.send({ embeds: [embed] });
        await interaction.reply({ content: 'Character is danied Character Killed', ephemeral: true });
        }
    };