const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');
const bcrypt = require('bcrypt');
const components = require('../../handlers/components');

module.exports = {
    customId: 'modal-ck',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ModalSubmitInteraction} interaction 
     */
    run: async (client, interaction) => {
        // Ambil data dari modal
        const reason = interaction.fields.getTextInputValue('reasonck_input');
        const story = interaction.fields.getTextInputValue('ck_input');
        const image = interaction.fields.getTextInputValue('image_input');
        
        const char = interaction.user.selectedChar;  // Ambil char yang sudah disimpan

        // Pastikan char ada
        if (!char) {
            return mek = interaction.update({ content: 'Character is undefined or missing', components: [], ephemeral: true });
        }
        if (!image.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/)) {
            return interaction.reply({ content: 'Invalid URL. Please provide a valid image link.', ephemeral: true });
        }
        // Channel tempat embed akan dikirim
        const chennel = interaction.guild.channels.cache.get('1324766340967305248');

        const [row] = await MysqlGrand.query(`SELECT * FROM player_characters WHERE Char_Name = '${char}'`);
        // Membuat embed
        const embed = new EmbedBuilder()
            .setDescription(`**__Character Story ${char}_** `)
            .addFields(
                { name: `Name IC`, value: `> ${char}` }, // Gunakan nilai char yang dipilih
                { name: `Reason Create CS`, value: `> ${reason}` },
                { name: `Story`, value: `> ${story}` },
                { name: `Level`, value: `> ${row[0].Level}` }
            )
            .setImage(`${image}`)
            .setFooter({ text: interaction.user.username });

        // Membuat tombol untuk CS
        const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Accept CS')
                    .setStyle('Success')
                    .setCustomId('button-messageck'),
                new ButtonBuilder()
                    .setLabel('Denied CS')
                    .setStyle('Danger')
                    .setCustomId('button-deniedck')
            );

        // Mengirimkan embed ke channel
        await chennel.send({ embeds: [embed], components: [buttons] });

        interaction.user.selectedChar = char; 

        // Balas interaksi modal
        mek = interaction.update({ content: `Your story character is being processed under the name IC ${char}`, components: [], ephemeral: true });
    }
};