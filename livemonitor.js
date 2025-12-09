const query = require("samp-query");
const { EmbedBuilder, ChannelType } = require('discord.js');
let messageEmbed; // Variabel untuk menyimpan pesan embed
let serverOnlineTime = null;
const channelId = '1444944898829848646'; // ID channel di mana embed akan dikirim



function updateEmbed(client, channelId) {
    let server_ip = '159.223.64.118';
    let server_port = '7019';
    const samp = { host: server_ip, port: server_port };

    query(samp, (error, response) => {
        let uptimeString = "N/A";
        if (!error && serverOnlineTime) {
            // Hitung uptime 
            const now = new Date();
            const uptimeMs = now - serverOnlineTime; // Waktu uptime dalam milidetik
            const uptimeHours = Math.floor(uptimeMs / 3600000);
            const uptimeMinutes = Math.floor((uptimeMs % 3600000) / 60000);
            uptimeString = `${uptimeHours} hrs, ${uptimeMinutes} mins`;
        }
        const embed = new EmbedBuilder()
            .setTitle('Kota Impian')
            .setColor("5865F2")
            .addFields(
                { name: '> STATUS', value: error ? '```🔴 Offline```' : '```🟢 Online```', inline: true },
                { name: '> PLAYERS', value: error ? '```N/A```' : `\`\`\`\n${response['online']}/${response['maxplayers']}\n\`\`\``, inline: true },
                { name: '> CONNECT', value: `\`\`\`\n${server_ip}:${server_port}\n\`\`\``, inline: false },
                { name: '> PING', value: '```1ms```', inline: true },
                { name: '> VERSION', value: '```0.3.7 R4```', inline: true },
                { name: '> NEXT RESTART', value: '```20.00 WIB```', inline: true },
                { name: '> UPTIME', value: `\`\`\`\n${uptimeString}\n\`\`\``, inline: false }
            )
            .setTimestamp()
            .setFooter({ text: 'Copyright (c) 2025 Kota Impian (All rights reversed)' });

        const channel = client.channels.cache.get(channelId);

        if (!messageEmbed && channel.type === ChannelType.GuildText) {
            // Kirim embed baru jika belum ada pesan embed yang disimpan
            channel.send({ embeds: [embed]}).then(sentMessage => {
                messageEmbed = sentMessage; // Simpan pesan embed yang dikirim
            }).catch(console.error);
        } else if (messageEmbed) {
            // Edit pesan embed yang sudah ada
            messageEmbed.edit({ embeds: [embed] }).catch(console.error);
        }
    });
}

module.exports = { updateEmbed };