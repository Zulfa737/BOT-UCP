const { EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');
const crypto = require('crypto');

function generateSalt(length = 16) {
    let salt = '';
    for (let i = 0; i < length; i++) {
        salt += String.fromCharCode(Math.floor(Math.random() * 94) + 33); // ASCII 33–126
    }
    return salt;
}

function sha256PassHash(password, salt) {
    return crypto.createHash('sha256').update(password + salt).digest('hex');
}

module.exports = {
    customId: 'modal-changepass',
    run: async (client, interaction) => {
        const password = interaction.fields.getTextInputValue('password_input');
        const confirmPassword = interaction.fields.getTextInputValue('confirm_password_input');

        if (password !== confirmPassword) {
            return await interaction.reply({ content: ':x: Password tidak sama, coba lagi.', ephemeral: true });
        }

        try {
            const [rows] = await MysqlGrand.query('SELECT * FROM playerucp WHERE DiscordID = ?', [interaction.user.id]);
            if (rows.length === 0) {
                return await interaction.reply({ content: ':x: Akun tidak ditemukan.', ephemeral: true });
            }

            const username = rows[0].ucp;
            const salt = generateSalt(); // 🔥 Buat salt random 16 karakter
            const hashedPassword = sha256PassHash(password, salt); // 🔐 password + salt

            await MysqlGrand.query('UPDATE playerucp SET password = ?, salt = ? WHERE DiscordID = ?', [hashedPassword, salt, interaction.user.id]);

            await interaction.reply({ content: ':white_check_mark: Password berhasil diubah!', ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: ':x: Gagal mengubah password, coba lagi nanti.', ephemeral: true });
        }
    }
};