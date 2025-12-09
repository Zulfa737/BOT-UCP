const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');
const bcrypt = require('bcrypt');
const components = require('../../handlers/components');

module.exports = {
    customId: 'modal-cs',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ModalSubmitInteraction} interaction 
     */
    run: async (client, interaction) => {
        // Ambil data dari modal
        const reason = interaction.fields.getTextInputValue('reasoncs_input');
        const story = interaction.fields.getTextInputValue('cs_input');
        
        const char = interaction.user.selectedChar;  // Ambil char yang sudah disimpan

        // Pastikan char ada
        if (!char) {
            return mek = interaction.update({ content: 'Character is undefined or missing', components: [], ephemeral: true });
        }

        // Channel tempat embed akan dikirim
        const chennel = interaction.guild.channels.cache.get('1324766311427084398');

        const [row] = await MysqlGrand.query(`SELECT * FROM player_characters WHERE Char_Name = '${char}'`);
        // Membuat embed
        const embed = new EmbedBuilder()
            .setDescription(`**__Character Story ${char}__** `)
            .addFields(
                { name: `Name IC`, value: `> ${char}` }, // Gunakan nilai char yang dipilih
                { name: `Reason Create CS`, value: `> ${reason}` },
                { name: `Story`, value: `> ${story}` },
                { name: `Level`, value: `> ${row[0].level}` }
            )
            .setThumbnail(`https://assets.open.mp/assets/images/skins/${row[0].skin}.png`)
            .setFooter({ text: interaction.user.username });

        // Membuat tombol untuk CS
        const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Accept CS')
                    .setStyle('Success')
                    .setCustomId('button-messagecs'),
                new ButtonBuilder()
                    .setLabel('Denied CS')
                    .setStyle('Danger')
                    .setCustomId('button-deniedcs')
            );

        // Mengirimkan embed ke channel
        await chennel.send({ embeds: [embed], components: [buttons] });

        interaction.user.selectedChar = char; 

        // Balas interaksi modal
        mek = interaction.update({ content: `Your story character is being processed under the name IC ${char}`, components: [], ephemeral: true });
    }
};
