const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const ftp = require('basic-ftp');
const fs = require('fs');
const path = require('path');

module.exports = {
    structure: new SlashCommandBuilder()
    .setName('upload_map')
    .setDescription('Upload file map ke server SA:MP')
    .addAttachmentOption(option =>
        option.setName('file').setDescription('File map (.txt)').setRequired(true)),
    options: {
        ownerOnly: true, // Hanya bisa digunakan oleh pemilik bot
        developers: true // Hanya bisa digunakan oleh developer
    },
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {

        const file = interaction.options.getAttachment('file');

        if (!file.name.endsWith('.txt')) {
            return interaction.reply({ content: '❌ File harus format `.txt`', ephemeral: true });
        }

        const tempPath = path.join(__dirname, file.name);
        const response = await axios.get(file.url, { responseType: 'stream' });
        const writer = fs.createWriteStream(tempPath);

        response.data.pipe(writer);

        writer.on('finish', async () => {
            const client = new ftp.Client();
            client.ftp.verbose = false;

            try {
                await client.access({
                    host: '178.128.222.238:3306',
                    user: 'u18_8dzKuDhbDx',
                    password: '.n.BoKkkbgn49@rk^ItUqcmB',
                    secure: false
                });

                // Upload file ke folder maps
                await client.uploadFrom(tempPath, `scriptfiles/maps/${file.name}`);

                // Tambahkan nama file ke map_queue.cfg
                const queuePath = 'scriptfiles/map_queue.cfg';
                const localQueuePath = path.join(__dirname, 'map_queue.cfg');
                const queueEntry = `${file.name}\n`;

                // Download dulu map_queue.cfg (jika ada)
                try {
                    await client.downloadTo(localQueuePath, queuePath);
                } catch {
                    fs.writeFileSync(localQueuePath, '');
                }

                fs.appendFileSync(localQueuePath, queueEntry);
                await client.uploadFrom(localQueuePath, queuePath);

                await interaction.reply(`✅ Map \`${file.name}\` berhasil diupload ke server.`);

            } catch (err) {
                console.error(err);
                await interaction.reply({ content: '❌ Gagal mengupload file ke server.', ephemeral: true });
            }

            client.close();
            fs.unlinkSync(tempPath);
        });

        writer.on('error', () => {
            interaction.reply({ content: '❌ Gagal menyimpan file sementara.', ephemeral: true });
        });
    }
};

