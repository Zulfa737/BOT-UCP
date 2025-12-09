const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../../config');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('setupregist')
        .setDescription('Setup panel register Kota Impian.'),
    options: {
        ownerOnly: true,
        developers: true
    },
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        // 1. Membuat Embed sesuai gambar
        const msgEmbed = new EmbedBuilder()
            .setTitle("Kota Impian USER CONTROL PANEL")
            .setDescription('Channel ini merupakan tempat dimana kamu dapat mengatur akun UCP kamu sendiri. Terdapat beberapa hal yang harus kamu ketahui, diantaranya:')
            .addFields(
                { 
                    name: '『 📄 Ambil Tiket 』', 
                    value: 'ℹ **Informasi**\nSebagaimana dengan judulnya, ini merupakan tombol dimana kamu dapat mengambil Tiket (membuat akun UCP).\nSebelum kamu bermain peran di Kota Impian Roleplay maka Tiket adalah kewajiban utama yang harus kamu miliki, disinilah tempatnya!' 
                },
                { 
                    name: '『 📍 Cek Tiket 』', 
                    value: 'ℹ **Informasi**\nKamu dapat melihat status Tiketmu apakah sudah terverifikasi ataukah belum, kamu juga dapat melihat informasi kode verifikasi melalui ini jikalau kamu belum menerima DM dari BOT sebelumnya.' 
                },
                { 
                    name: '『 ❓ Lupa Sandi 』', 
                    value: 'ℹ **Informasi**\nSesuai dengan namanya, tombol ini merupakan tempat apabila kamu lupa kata sandi atau ingin mengganti kata sandi.' 
                },
            )
            .setColor("#5d3fd3") // Warna ungu/blurple mirip di gambar
            .setFooter({ text: "Bot Kota Impian Roleplay", iconURL: client.user.displayAvatarURL() })
            .setTimestamp();

        // 2. Membuat Tombol (Buttons) sesuai gambar
        const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Ambil Tiket')
                    .setStyle(ButtonStyle.Success) // Warna Hijau
                    .setEmoji('📄')
                    .setCustomId('button-register'),
                
                new ButtonBuilder()
                    .setLabel('Cek Akun')
                    .setStyle(ButtonStyle.Primary) // Warna Biru
                    .setEmoji('📍')
                    .setCustomId('button-bind'),
                
                new ButtonBuilder()
                    .setLabel('Lupa Password')
                    .setStyle(ButtonStyle.Danger) // Warna Merah
                    .setEmoji('❓')
                    .setCustomId('button-resetpass'),

                new ButtonBuilder()
                    .setLabel('Reff Role')
                    .setStyle(ButtonStyle.Primary) // Warna Biru (Sesuai gambar tombol ke-4)
                    .setEmoji('🔑')
                    .setCustomId('button-reverif')
            );

        // Mengirim pesan ke channel
        await interaction.channel.send({ embeds: [msgEmbed], components: [buttons] });
        
        // Konfirmasi command selesai (ephemeral agar tidak nyampah)
        await interaction.reply({ content: "✅ Panel berhasil dibuat sesuai gambar!", ephemeral: true });
    }
};