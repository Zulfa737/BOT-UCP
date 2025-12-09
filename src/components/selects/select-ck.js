const { TextInputBuilder, TextInputStyle, ActionRowBuilder, ModalBuilder } = require('discord.js');
const MysqlGrand = require('../../../Mysql');
const components = require('../../handlers/components');

module.exports = {
    customId: 'select-ck',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {StringSelectMenuInteraction} interaction 
     */
    run: async (client, interaction) => {

        // Ambil nilai dari Select Menu
        const char = interaction.values; // Misalnya, mengambil nilai pertama jika ada banyak pilihan

        const [user] = await MysqlGrand.query(`SELECT * FROM player_characters WHERE Char_Name = ?`, [char]);

        if (user.length > 0) {
            if (user[0].CharacterStory) {
                // Jika CharacterStory tidak null atau kosong
                return mek = interaction.update({ content: ':x: Character already has a story!', components: [], ephemeral: true });
            } else {
                const modal = new ModalBuilder()
                    .setCustomId('modal-ck')
                    .setTitle(`You Request Character story ${char}`); // Menampilkan nama karakter yang dipilih
                        
                // Input reason
                const reasonInput = new TextInputBuilder()
                    .setCustomId('reasonck_input')
                    .setLabel('The reason for making CK')
                    .setPlaceholder('Input Valid Reason CK')
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true);

                const imageInput = new TextInputBuilder()
                    .setCustomId('image_input')
                    .setLabel('Your Image')
                    .setPlaceholder('Input Image gur Link!')
                    .setStyle(TextInputStyle.Paragraph)
                    .setRequired(true);

                // Input story
                const ckInput = new TextInputBuilder()
                    .setCustomId('ck_input')
                    .setLabel('Your Character Story')
                    .setPlaceholder('Input Valid Here Or Link!')
                    .setStyle(TextInputStyle.Paragraph)
                    .setMinLength(14)
                    .setRequired(true);

                // Menambahkan input ke dalam modal
                modal.addComponents(
                    new ActionRowBuilder().addComponents(reasonInput),
                    new ActionRowBuilder().addComponents(imageInput),
                    new ActionRowBuilder().addComponents(ckInput),
                );

                interaction.user.selectedChar = char; 

                // Tampilkan modal kepada pengguna
                interaction.showModal(modal);
            }
        } else {
            return interaction.reply({ content: ':x: Character not found.', ephemeral: true });
        }
    }
};