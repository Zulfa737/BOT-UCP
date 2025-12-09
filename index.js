const mysqldump = require('mysqldump');
const { ActivityType, ChannelType, AttachmentBuilder, EmbedBuilder } = require('discord.js');
const cron = require('node-cron');
const server = require("./activity.js");
const { updateEmbed } = require('./livemonitor');
const path = require('path');
const fs = require('fs');
const ExtendedClient = require('./src/class/ExtendedClient');
const { exec } = require('child_process');

// --- LIBRARY ---
const query = require('samp-query');

const client = new ExtendedClient();
client.start();

// --- KONFIGURASI UTAMA ---
const LIVE_STATS_CHANNEL_ID = '1444944898829848646'; // Channel Live Stats
const JOIN_LEAVE_LOG_ID = '1445033031722336327'; // <--- PASTIKAN ID INI BENAR
const SERVER_IP = '159.223.64.118';
const SERVER_PORT = 7019;

// --- VARIABEL UNTUK LOG JOIN/LEAVE ---
let cachedPlayers = [];
let firstRun = true;

// --- EVENT HANDLERS ---
client.once('clientReady', async () => {
    console.log(`✅ Logged in as: ${client.user.tag}`);

    // 1. UPDATE STATUS ACTIVITY
    setInterval(() => {
        server.stats()
            .then((data) => {
                client.user.setActivity(`🟢 [${data.online}/${data.maxplayers}] Warga | Kota Impian Roleplay`, { type: ActivityType.Watching });
            })
            .catch(() => {
                client.user.setActivity('🔴 Maintenance | #JuraganStore', { type: ActivityType.Watching });
            });
    }, 60000);

    // 2. UPDATE LIVE EMBED
    updateEmbed(client, LIVE_STATS_CHANNEL_ID);
    setInterval(() => updateEmbed(client, LIVE_STATS_CHANNEL_ID), 60000);

    // 3. FITUR LOG JOIN/LEAVE (Polling 5 detik)
    setInterval(() => {
        const options = { host: SERVER_IP, port: SERVER_PORT };

        query(options, function (error, response) {
            if (error) return; 

            const logChannel = client.channels.cache.get(JOIN_LEAVE_LOG_ID);
            if (!logChannel) return;

            // --- BAGIAN INI DIMODIFIKASI ---
            // Hanya ambil nama yang mengandung "_" (Format RP: Nama_Marga)
            // Nama UCP (tanpa _) akan otomatis dibuang dari list ini.
            const currentPlayers = response.players
                .map(p => p.name)
                .filter(name => name.includes('_')); 

            if (!firstRun) {
                // Cek Player MASUK
                currentPlayers.forEach(player => {
                    if (!cachedPlayers.includes(player)) {
                        logChannel.send(`🟢 **${player}** Telah masuk ke Kota Impian Roleplay :)`);
                    }
                });

                // Cek Player KELUAR
                cachedPlayers.forEach(player => {
                    if (!currentPlayers.includes(player)) {
                        logChannel.send(`🔴 **${player}** Telah keluar dari Kota Impian Roleplay :(`);
                    }
                });
            } else {
                firstRun = false;
            }

            // Update cache
            cachedPlayers = currentPlayers;
        });
    }, 5000); 
});

client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild) return;

    const content = message.content.toLowerCase();

    // --- FITUR 4: AUTO REPLY IP ---
    const keywords = ['ip', 'ip server', 'server ip', 'ipnya', 'ipnya apa', 'ip nya apa'];
    if (keywords.some(keyword => content.includes(keyword))) {
        await message.reply(`🛰️ IP Server Kota Impian Roleplay: \`${SERVER_IP}:${SERVER_PORT}\``);
    }

    // --- FITUR 5: COMMAND PLAYER ---
    if (content === 'player' || content === '!player') {
        const loadingMsg = await message.reply('🔄 Sedang mengambil data player...');

        const options = { host: SERVER_IP, port: SERVER_PORT };

        query(options, function (error, response) {
            if (error) {
                return loadingMsg.edit('❌ Gagal mengambil data. Server mungkin sedang offline atau restart.');
            }

            let playerList = '';
            if (response.players && response.players.length > 0) {
                // Filter juga tampilan !player agar hanya menampilkan nama RP
                const rpPlayers = response.players.filter(p => p.name.includes('_'));

                if (rpPlayers.length > 0) {
                    const list = rpPlayers.map(p => `• ${p.name} (${p.score} skor)`);
                    if (list.length > 20) {
                        playerList = list.slice(0, 20).join('\n') + `\n\n...dan ${list.length - 20} lainnya.`;
                    } else {
                        playerList = list.join('\n');
                    }
                } else {
                     playerList = 'Tidak ada warga (karakter RP) yang online.';
                }
            } else {
                playerList = 'Tidak ada player yang online saat ini.';
            }

            const embed = new EmbedBuilder()
                .setColor('#f47200') 
                .setTitle('👥 Daftar Player di Kota')
                .setDescription(playerList)
                .setFooter({ 
                    text: `Total player online: ${response.online}/${response.maxplayers} • ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}` 
                });

            loadingMsg.edit({ content: null, embeds: [embed] });
        });
    }
});

// --- BACKUP DATABASE ---
const backupDatabase = require('./utils/backupdb.js');
cron.schedule('00 00 * * *', () => {
  console.log('🕑 Menjalankan backup database...');
  backupDatabase(client);
}, {
  timezone: "Asia/Jakarta"
});

process.on('unhandledRejection', console.error);
process.on('uncaughtException', console.error);