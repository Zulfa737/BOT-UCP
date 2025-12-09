const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../../config');

const numberFormat = (value) =>
    new Intl.NumberFormat('ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(value);

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('testimoni')
        .setDescription('store testimoni system')
        .addStringOption(option => option
				.setName('totaldonate')
				.setDescription('the total number of tests you currently have')
				.setRequired(true))
        .addUserOption(option => option
                .setName('player')
                .setDescription('Players you serve when purchasing goods')
                .setRequired(true))
        .addStringOption(option => option
				.setName('donate')
				.setDescription('donate purchased by the buyer')
				.setRequired(true))
        .addStringOption(option => option
				.setName('price')
				.setDescription('the total price purchased by Players')
				.setRequired(true))
        .addStringOption(option => option
				.setName('note')
				.setDescription('note to provide a message on the testimonial')
				.setRequired(true))
        .addAttachmentOption(option => option
				.setName('image')
				.setDescription('screenshot of the results of purchasing goods ')
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
    	const testi_total = interaction.options.getString('totaldonate');
    	const players = interaction.options.getUser('player');
        const produk = interaction.options.getString('donate');
        const harga = interaction.options.getString('price');
        const desk = interaction.options.getString('note');
        const attachment = interaction.options.getAttachment('image');
        
        if (!attachment) {
            await interaction.reply('Anda harus mengunggah foto.');
            return;
        }
        
        const embed = new EmbedBuilder()
           .setDescription(`**__Donate to #${testi_total}__**`)
           .addFields(
	          	{ name: `Player`, value: `> ${players}` },
		          { name: `Donate`, value: `> ${produk}` },
		          { name: `Price`, value: `> ${numberFormat(harga)}` },
		          { name: `Note`, value: `> ${desk}` },
           )
           .setColor("5865F2")
           //.setThumbnail("https://media.discordapp.net/attachments/1259834376158445618/1267060781367693423/Logo_transparan.png?ex=66a769cf&is=66a6184f&hm=851c4c57914f3282a6846e453916de862203dcb5dba4f359e8be8b5f57c8aeda&")
           //.setImage(attachment.url)
           .setFooter({ text: interaction.user.username });

        await interaction.channel.send({ embeds: [embed] });
        return interaction.reply({ content: "Sukses Membuat Testimoni", ephemeral: true });
    }
};
