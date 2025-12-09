const { EmbedBuilder } = require('discord.js');
const MysqlGrand = require('../../../Mysql');
const bcrypt = require('bcrypt');
module.exports = {
    customId: 'modal-createchar',
    /**
     * 
     * @param {Client} client 
     * @param {ModalSubmitInteraction} interaction 
     */
    run: async (client, interaction) => {
    const firstname = interaction.fields.getTextInputValue('frist-name').trim();
    const lastname = interaction.fields.getTextInputValue('last-name').trim();
    const dateOfBirth = interaction.fields.getTextInputValue('date-brith');
    const gender = interaction.fields.getTextInputValue('gander-input').toLowerCase().trim();
    const skinId = interaction.fields.getTextInputValue('skin-input').trim();

    const nameRegex = /^[A-Z][a-z]*$/;
    const [row] = await MysqlGrand.query('SELECT * FROM ucp WHERE discordid = ?', [interaction.user.id]);
    const username = `${firstname}_${lastname}`;
    const ucpname = `${row[0].ucp_name}`;
    const isValidName = (name) => /^[a-zA-Z\s]+$/.test(name.trim());


    if (!isValidName(firstname) || !isValidName(lastname)) {
        return await interaction.reply({
            content: '❌ Invalid input! Please use letters and spaces only (no numbers, symbols, or underscores).',
            ephemeral: true,
        });
    }

    if (!nameRegex.test(firstname) || !nameRegex.test(lastname)) {
        return await interaction.reply({
            content: '❌ Invalid input! Both First Name and Last Name must start with a capital letter and the rest must be lowercase (e.g., John Doe).',
            ephemeral: true,
        });
    }
    // Validasi hanya "male" atau "female"
    if (gender !== 'male' && gender !== 'female') {
        return await interaction.reply({
            content: '❌ Invalid input! Please type either "male" or "female".',
            ephemeral: true,
        });
    }
    const isValidDate = /^\d{2}\/\d{2}\/\d{4}$/.test(dateOfBirth);
    if (!isValidDate) {
        return await interaction.reply({
            content: '❌ Invalid date format! Please use DD/MM/YYYY format.',
            ephemeral: true,
        });
    }

    // Split the date to validate further
    const [day, month, year] = dateOfBirth.split('/').map(Number);

    // Validasi nilai hari, bulan, dan tahun
    const isValidFullDate =
        year > 1900 && year <= new Date().getFullYear() &&
        month >= 1 && month <= 12 &&
        day >= 1 && day <= new Date(year, month, 0).getDate();

    if (!isValidFullDate) {
        return await interaction.reply({
            content: '❌ Invalid date! Please provide a valid calendar date.',
            ephemeral: true,
        });
    }

    let genderValue;
    if (gender === 'male') {
        genderValue = 1;
    } else if (gender === 'female') {
        genderValue = 2;
    } else {
        return await interaction.reply({
            content: '❌ Invalid input! Please type either "male" or "female".',
            ephemeral: true,
        });
    }

    if (!/^[1-9][0-9]*$/.test(skinId)) {
        return await interaction.reply({
            content: '❌ Invalid input! Please enter a valid skin ID greater than 0 (no letters, symbols, or 0).',
            ephemeral: true,
        });
    }
    const registeredAt = new Date();
    await MysqlGrand.query('INSERT INTO players (username, ucp_name, discordid, age, gender, skin, reg_date) VALUES (?, ?, ?, ?, ?, ?, ?)', [username, ucpname, interaction.user.id, dateOfBirth, genderValue, skinId, registeredAt]);
    const embed = new EmbedBuilder()
        .setTitle('Create Charater Successfully')
        .setDescription('You have successfully created a character via Discord Kota Impian Roleplay')
        .addFields(
            { name: 'Username', value: `${firstname} ${lastname}`, inline: false },
            { name: 'Date Brith', value: `${dateOfBirth}`, inline: false },
            { name: 'Date Create', value: `${registeredAt}`, inline: false },
            { name: 'Gender', value: `${gender}`, inline: false },
        )
        .setImage(`https://assets.open.mp/assets/images/skins/${skinId}.png`)
        .setColor("5865F2")
        .setFooter({ text: 'Copyright (c) 2024 Kota Impian Roleplay (All rights reversed)'})
        .setTimestamp();
        await interaction.reply({ content: ':white_check_mark: Success create charater cek your dm', ephemeral: true });
        await interaction.user.send({
            content: `Hello <@${interaction.user.id}>`, embeds: [embed]
        });
}};