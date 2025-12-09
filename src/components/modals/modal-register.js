const { EmbedBuilder } = require('discord.js');
const MysqlGrand = require('../../../Mysql');

module.exports = {
    customId: 'modal-register',
    /**
     * 
     * @param {Client} client 
     * @param {ModalSubmitInteraction} interaction 
     */
    run: async (client, interaction) => {
        try {
            await interaction.deferReply({ ephemeral: true });
            
            const ucp = interaction.fields.getTextInputValue('ucp_input');
            const userId = interaction.user.id;
            const guild = interaction.guild;
            const member = await guild.members.fetch(userId).catch(() => null);

            if (!member) {
                return await interaction.followUp({ 
                    content: 'Terjadi kesalahan, pastikan Anda masih berada di server.', 
                    ephemeral: true 
                });
            }

            // Validate UCP name
            if (/_/.test(ucp)) {
                return await interaction.followUp({ 
                    content: ':x: UCP name tidak boleh menggunakan symbol (_)!', 
                    ephemeral: true 
                });
            }
            
            if (/\d/.test(ucp)) {
                return await interaction.followUp({ 
                    content: ':x: UCP kamu tidak boleh menggunakan angka', 
                    ephemeral: true 
                });
            }

            if (!/^[A-Z][a-zA-Z]+$/.test(ucp)) {
                return await interaction.followUp({
                    content: 'Nama UCP harus diawali dengan huruf kapital dan hanya boleh mengandung huruf (tanpa spasi atau karakter khusus).',
                    ephemeral: true
                });
            }

            // Check if UCP already exists
            const [existingAccount] = await MysqlGrand.query('SELECT * FROM playerucp WHERE ucp = ?', [ucp]);
            if (existingAccount.length > 0) {
                const warningEmbed = new EmbedBuilder()
                    .setTitle('⚠️ Pendaftaran Gagal')
                    .setDescription(`Nama UCP **${ucp}** sudah digunakan. Silakan pilih nama lain.`)
                    .setColor(0xFF0000)
                    .setTimestamp();

                try {
                    await interaction.user.send({ embeds: [warningEmbed] });
                } catch (err) {
                    console.log('Gagal mengirim DM ke pengguna');
                }

                return await interaction.followUp({
                    embeds: [warningEmbed],
                    ephemeral: true
                });
            }

            // Generate verification code
            const verifyCode = Math.floor(100000 + Math.random() * 900000);

            // Insert into database
            await MysqlGrand.query(
                'INSERT INTO playerucp (ucp, verifycode, DiscordID, password, salt, extrac, reedem) VALUES (?, ?, ?, "", "", 0, 0)',
                [ucp, verifyCode, userId]
            );

            // Set member nickname
            await member.setNickname(`WARGA | ${ucp}`).catch(console.error);

            // Send success DM
            const successEmbed = new EmbedBuilder()
                .setTitle('✅ Pendaftaran UCP Berhasil')
                .setDescription(`Selamat, UCP Anda **${ucp}** berhasil dibuat!\nGunakan kode verifikasi berikut saat login pertama kali:`)
                .addFields(
                    { name: 'UCP Name', value: `\`${ucp}\``, inline: false },
                    { name: 'Verification Code', value: `\`${verifyCode}\``, inline: false },
                    { name: 'Discord ID', value: `\`${userId}\``, inline: false }
                )
                .setColor('#5865F2')
                .setFooter({ text: 'Copyright (c) 2024 Kota Impian Roleplay (All rights reversed)' })
                .setTimestamp();

            try {
                await interaction.user.send({ embeds: [successEmbed] });
            } catch (err) {
                console.log('Gagal mengirim DM ke pengguna');
            }

            await interaction.followUp({
                content: '✅ UCP Anda berhasil dibuat. Silakan cek DM Anda untuk kode verifikasi.',
                ephemeral: true
            });

        } catch (error) {
            console.error('Error in registration:', error);
            await interaction.followUp({
                content: '❌ Terjadi kesalahan saat memproses pendaftaran.',
                ephemeral: true
            });
        }
    }
};

// const { EmbedBuilder } = require('discord.js');
// const MysqlGrand = require('../../../Mysql');
// const bcrypt = require('bcrypt');
// module.exports = {
//     customId: 'modal-register',
//     /**
//      * 
//      * @param {Client} client 
//      * @param {ModalSubmitInteraction} interaction 
//      */
//     run: async (client, interaction) => {
//     const ucp = interaction.fields.getTextInputValue('ucp_input');
//     const password = interaction.fields.getTextInputValue('password_input');
//     const confirmPassword = interaction.fields.getTextInputValue('confirm_password_input');

//     if (/_/.test(ucp)) {
//         return interaction.reply({ content: ':x: UCP name tidak boleh menggunakan symbol (_)!', ephemeral: true });
//     }
//     if (/\d/.test(ucp)) {
//         return interaction.reply({ content: ':x: UCP kamu tidak boleh menggunakan angka', ephemeral: true });
//     }
//     if (password !== confirmPassword) {
//         await interaction.reply({ content: ':x: Terjadi kesalahan saat membuat password', ephemeral: true });
//         return;
//     }
//     const [UdahAdaAkun] = await MysqlGrand.query(`SELECT * FROM playerucp WHERE ucp = '${ucp}'`);
//     if (UdahAdaAkun.length < 0) {
//         return interaction.reply({ content: ':x: UCP name sudah silahkan gunakan nama ucp lainnya', ephemeral: true });
//     }
//     const hashedPassword = await bcrypt.hash(password, 12);
//     await MysqlGrand.query('INSERT INTO playerucp (ucp, password, DiscordID) VALUES (?, ?, ?)', [ucp, hashedPassword, interaction.user.id]);
//     const embed = new EmbedBuilder()
//         .setTitle('Juragan User Panel Control')
//         .setDescription('Your Account Ucp Registered Successfully')
//         .addFields(
//             { name: 'User Panel Control', value: `${ucp}`, inline: true },
//             { name: 'Password', value: `${password}`, inline: true },
//             { name: 'Status', value: `verfied`, inline: true },
//             { name: 'DiscordID', value: `${interaction.user.id}`, inline: false },
//         )
//         .setColor('5865F2')
//         .setFooter({ text: 'Copyright (c) 2024 Kota Impian Roleplay (All rights reversed)'})
//         .setTimestamp();

//         await interaction.user.send({ embeds: [embed] });
//         await interaction.member.setNickname(`Actor | ${ucp}`);
// }};