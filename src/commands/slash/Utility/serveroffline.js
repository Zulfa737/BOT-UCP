const { EmbedBuilder } = require("discord.js");

module.exports = {
  structure: {
    name: "serveroffline",
    description: "Kirim pesan server offline"
  },

  run: async (client, interaction) => {
    const embed = new EmbedBuilder()
      .setTitle("Kota Impian Roleplay")
      .setDescription("Server is now *Offline!*")
      .setColor("#111211")
      .addFields(
        { name: "Host:", value: "159.223.64.118:7019", inline: true },
        { name: "Version:", value: "0.3.7", inline: true }
      )
      //.setImage("https://media.discordapp.net/attachments/1287019974107467790/1434903428064346265/1762178012931.jpg?ex=690bffb4&is=690aae34&hm=380dffc8c0d9eafa837f1c9587b0581532e6ecf4e80cf16a8ae4a616dba7e6a8&=&format=webp&width=943&height=551");

    await interaction.reply({
      content: "@everyone",
      embeds: [embed]
    });

    console.log("✅ Pesan server offline telah dikirim.");
  }
};