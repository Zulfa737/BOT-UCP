const { Client, GatewayIntentBits, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, PermissionsBitField } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');

module.exports = {
    customId: 'button-verifed',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {

        const VERIFIED_ROLE_ID = '1312576263470452776'; // Role yang diberikan setelah verifikasi

        const member = interaction.member;
        const accountAge = (Date.now() - member.user.createdAt) / (1000 * 60 * 60 * 24); // dalam hari

        // Cek untuk akun dobel (sudah memiliki role terverifikasi)
        if (member.roles.cache.has(VERIFIED_ROLE_ID)) {
            return interaction.reply({ content: 'Anda sudah terverifikasi!', ephemeral: true });
        }

        // Cek umur akun: Minimal 30 hari
        if (accountAge < 30) {
            return interaction.reply({ content: 'Akun Anda harus berumur minimal 30 hari untuk melakukan verifikasi.', ephemeral: true });
        }

        try {
            await member.roles.add(VERIFIED_ROLE_ID);
            await interaction.reply({ content: '✅ Anda berhasil terverifikasi!', ephemeral: true });
        } catch (error) {
            console.error(error);
            interaction.reply({ content: '❌ Terjadi kesalahan saat melakukan verifikasi.', ephemeral: true });
        }
    }
};