const { ButtonInteraction } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');

module.exports = {
    customId: 'button-resetpass',
    /**
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        try {
            // Cek apakah akun UCP terhubung dengan Discord user
            const [rows] = await MysqlGrand.query('SELECT * FROM playerucp WHERE DiscordID = ?', [interaction.user.id]);

            if (rows.length === 0) {
                return interaction.reply({ content: ':x: Tidak ditemukan akun UCP yang terkait dengan Discord kamu.', ephemeral: true });
            }

            const verifyCode = rows[0].verifycode;

            // Reset password dan salt
            await MysqlGrand.query('UPDATE playerucp SET password = "", salt = "" WHERE DiscordID = ?', [interaction.user.id]);

            // Kirim balasan dengan kode verifikasi
            return interaction.reply({
                content: `✅ Password berhasil direset!\nSilakan login ke server tanpa password dan masukkan kode verifikasi berikut:\n\n**Kode Verifikasi:** ${verifyCode}`,
                ephemeral: true
            });

        } catch (error) {
            console.error('MySQL Error (button-resetpass):', error);
            return interaction.reply({ content: '❌ Terjadi kesalahan saat reset password. Silakan coba beberapa saat lagi.', ephemeral: true });
        }
    }
};