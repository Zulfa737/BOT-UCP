const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const backupDatabase = require('../../../../utils/backupdb.js');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('backup')
        .setDescription('Melakukan backup database secara manual'),
    options: {
        ownerOnly: true, // Hanya bisa digunakan oleh pemilik bot
        developers: true // Hanya bisa digunakan oleh developer
    },
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        await interaction.deferReply(); // Tunda balasan agar bot tidak timeout

        try {
            // Panggil fungsi backup database
            await backupDatabase(client);

            // Kirim notifikasi berhasil
            const successEmbed = new EmbedBuilder()
                .setTitle('✅ Backup Database Berhasil')
                .setDescription('Backup database berhasil dilakukan!')
                .setColor('#00FF00') // Hijau
                .setTimestamp();

            await interaction.editReply({ embeds: [successEmbed] });

        } catch (error) {
            console.error(`❌ Gagal melakukan backup: ${error.message}`);

            // Kirim notifikasi gagal
            const errorEmbed = new EmbedBuilder()
                .setTitle('❌ Gagal Backup Database')
                .setDescription(`Terjadi kesalahan saat melakukan backup: ${error.message}`)
                .setColor('#FF0000') // Merah
                .setTimestamp();

            await interaction.editReply({ embeds: [errorEmbed] });
        }
    }
};
