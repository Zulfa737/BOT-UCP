const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const mysql = require('mysql2/promise');
const mysqldump = require('mysqldump');

// Konfigurasi database
const dbConfig = {
  host: "159.223.87.7", // Ganti dengan IP database Anda
  user: "u22_xAUpiAjwuc", // Ganti dengan username database Anda
  password: "hPSeoVir57J=cgtMJfF@E+.8", // Ganti dengan password database Anda
  database: "s22_lcrpnew"
};

// ID Channel Log Discord
const LOG_CHANNEL_ID = '1212546988558786670';

async function backupDatabase(client) {
  const date = new Date().toISOString().replace(/T/, '_').replace(/:/g, '-').split('.')[0];
  const backupsDir = path.join(__dirname, 'backups');
  const backupPath = path.join(backupsDir, `backup_${date}.sql`);

  // Buat folder backup jika belum ada
  if (!fs.existsSync(backupsDir)) fs.mkdirSync(backupsDir);

  try {
    // Test database connection first
    const connection = await mysql.createConnection(dbConfig);
    await connection.ping();
    await connection.end();

    // Create backup using mysqldump (npm version)
    await mysqldump({
      connection: {
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.database,
      },
      dumpToFile: backupPath,
    });

    console.log(`✅ Backup selesai: ${backupPath}`);

    // Hapus file backup lebih dari 7 hari
    deleteOldBackups(backupsDir);

    // Kirim ke Discord
    const stats = fs.statSync(backupPath);
    const fileSizeMB = stats.size / (1024 * 1024);

    if (fileSizeMB > 100) {
      throw new Error(`File backup terlalu besar (${fileSizeMB.toFixed(2)}MB), maksimal 100MB`);
    }

    const embed = new EmbedBuilder()
      .setTitle('✅ Backup Harian Berhasil')
      .setColor(0x00b050)
      .addFields(
        { name: '🗓️ Tanggal', value: `<t:${Math.floor(Date.now() / 1000)}:F>`, inline: true },
        { name: '📁 Ukuran File', value: `${fileSizeMB.toFixed(2)} MB`, inline: true },
        { name: '📦 Database Name', value: `${dbConfig.database}`, inline: true },
      )
      .setTimestamp();

    const channel = await client.channels.fetch(LOG_CHANNEL_ID);
    const attachment = new AttachmentBuilder(backupPath);
    await channel.send({ embeds: [embed], files: [attachment] });

  } catch (err) {
    console.error(`❌ Gagal backup: ${err.message}`);

    const embed = new EmbedBuilder()
      .setTitle('❌ Gagal Backup Database')
      .setColor(0xff0000)
      .setDescription(`\`\`\`${err.message}\`\`\``)
      .setTimestamp();

    const channel = await client.channels.fetch(LOG_CHANNEL_ID);
    await channel.send({ embeds: [embed] });
  }
}

function deleteOldBackups(folder) {
  const files = fs.readdirSync(folder);
  const now = Date.now();

  files.forEach(file => {
    const filePath = path.join(folder, file);
    const stats = fs.statSync(filePath);

    if (now - stats.mtimeMs > 7 * 24 * 60 * 60 * 1000) {
      fs.unlinkSync(filePath);
      console.log(`🗑️ Menghapus backup lama: ${file}`);
    }
  });
}

module.exports = backupDatabase;