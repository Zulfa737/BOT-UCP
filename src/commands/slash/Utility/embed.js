const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../../config');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Kirim pesan embed custom (Pengumuman dll).')
        .addStringOption(option => option
            .setName('deskripsi')
            .setDescription('Isi pesan embed (Gunakan \\n untuk baris baru)')
            .setRequired(true))
        .addStringOption(option => option
            .setName('tetle')
            .setDescription('Judul embed'))
        .addChannelOption(option => option
            .setName('channel')
            .setDescription('Channel tempat mengirim embed')),
    options: {
        ownerOnly: true,
        developers: true
    },
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        // Mengambil input dari user
        const descriptioni = interaction.options.getString('deskripsi');
        
        // PERBAIKAN DISINI: Tanda '??' saya kembalikan karena itu WAJIB.
        // Artinya: Ambil input user, TAPI jika kosong (??) pakai teks default disampingnya.
        const title = interaction.options.getString('tetle') ?? '📢 Pengumuman Kota Impian Roleplay'; 
        
        const chennelembed = interaction.options.getChannel('channel') || interaction.channel;

        // Membuat Embed
        const msgEmbed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(descriptioni)
            .setColor('Purple') 
            .setFooter({ 
                text: "Kota Impian Roleplay | Respect And Good Attitude", 
                iconURL: client.user.displayAvatarURL() 
            })
            .setTimestamp();

        // Mengirim ke channel yang ditentukan
        await chennelembed.send({ embeds: [msgEmbed] });

        // Konfirmasi ke pengirim command
        return interaction.reply({ 
            content: `✅ Embed berhasil dikirim ke ${chennelembed}!`, 
            flags: MessageFlags.Ephemeral 
        });
    }
};