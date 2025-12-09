const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../../config');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('changelogs')
        .setDescription('Update Logs')
        .addStringOption(option => option
                .setName('updates')
                .setDescription('updates server')
                .setRequired(true))
        .addStringOption(option => option
                .setName('fixed')
                .setDescription('fixed server')
                .setRequired(true))
        .addStringOption(option => option
                .setName('version')
                .setDescription('version server')
                .setRequired(true)),
    options: {
        ownerOnly: true,
        developers: true
    },
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {import('discord.js').CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const changed = interaction.options.getString('updates');
        const fixesImprovement = interaction.options.getString('fixed');
    	const version = interaction.options.getString('version');

		//const channelUpdate = await client.channels.fetch(process.env.UPDATE_CHANNEL_ID);
		const updateChannelId = '1383644469655633990';
		
		const currentDate = new Date();
		const options = { 
		    year: 'numeric', 
		    month: 'long', 
		    day: 'numeric', 
		    hour: 'numeric', 
		    minute: 'numeric', 
		    timeZone: 'Asia/Jakarta',
		    hour12: false
		};
		const formattedDate = currentDate.toLocaleDateString('id-ID', options);
		const finalDate = `${formattedDate} WIB`;

		const userAvatar = interaction.user.displayAvatarURL({ dynamic: true, size: 32 });
		
		try {
         const changelogEmbed = new EmbedBuilder()
            //.setColor(0x0AFAA5)
            .setTitle(`Changelogs v${version}`)
            .addFields(
                { name: '__Changes__', value: `${changed}` },
                { name: '__Fixes & Improvement__', value: `${fixesImprovement}` },
            )
            .setColor("5865F2")
            //.setImage('https://media.discordapp.net/attachments/1287019974107467790/1434903428064346265/1762178012931.jpg?ex=690bffb4&is=690aae34&hm=380dffc8c0d9eafa837f1c9587b0581532e6ecf4e80cf16a8ae4a616dba7e6a8&=&format=webp&width=943&height=551')
            .setFooter({ text: `__*updates on ${finalDate}*__` , iconURL: userAvatar });

		const channelPatchUpdate = client.channels.cache.get(updateChannelId);
		
		if (channelPatchUpdate) {
	        await channelPatchUpdate.send({ embeds: [changelogEmbed] });
	        await interaction.reply({ content: 'The update has been successfully sent to <#1383644469655633990>', ephemeral: true });
        } else {
	        console.error('Channel id tidak di temukan');
        }
      } catch (error) {
      console.error(error);
      return interaction.reply({ content: 'An error occurred while interacting.', ephemeral: true });
    }
}};