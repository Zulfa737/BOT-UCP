const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const components = require('../../handlers/components');

module.exports = {
    customId: 'select-stats',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {StringSelectMenuInteraction} interaction 
     */
    run: async (client, interaction) => {

        const char = interaction.values;
    //const [row] = await MysqlGrand.query(`SELECT * FROM users WHERE DiscordID = '${interaction.user.id}'`);
        const [row] = await MysqlGrand.query(`SELECT * FROM player_characters WHERE Char_Name = '${char}'`);
        const msgrow = new EmbedBuilder()
            .setColor("5865F2")
            .setDescription(`Data Charater`)
            .addFields(
                { name: '__Main Charater__', value: `Name Charater: ${char}\nName Ucp: ${row[0].Char_AdminName}\nVIP Levels : ${row[0].Char_Vip}\nVIP Time : ${row[0].Char_VipTime} days\nAge : ${row[0].Char_Age}\nTweet Name : ${row[0].Char_TwitterName}`, inline : false },
                { name: '__Speksifikasi Charater__', value: `Phone Number : ${row[0].Char_PhoneNum}\nPhone Battery : ${row[0].Char_PhoneBattery}%\nOrigin : ${row[0].Char_Origin}\nHeight : ${row[0].Char_BodyHeight}\nWeight : ${row[0].Char_BodyWeight}` },
                { name: '__Money Charater__', value: `Money : $${row[0].Char_Money}\nBank Balance : $${row[0].Char_BankMoney}\nNo Rekening : ${row[0].Char_BankRek}` },
                { name: '__Health & Body Charater__', value: `Health : ${row[0].Char_Health}%\nArmor : ${row[0].Char_Armour}%\nHunger : ${row[0].Char_Hunger}%\nDrink : ${row[0].Char_Thirst}%\nMentalilty : ${row[0].Char_Stress}%\nHead: ${row[0].Char_Head}%\nStomach: ${row[0].Char_Stomach}%\nLeft Arm: ${row[0].Char_LeftArm}%\nRight Arm: ${row[0].Char_RightArm}%\nLeft Foot: ${row[0].Char_LeftFoot}%\nRight Foot: ${row[0].Char_RightFoot}%` },
                { name: '__Other Charater__', value: `Exp : ${row[0].Char_LevelUp}\nLevel : ${row[0].Char_Level}\nPaying Games: ${row[0].Char_OnlineTimer} hours` },
            )
            .setFooter({ text: "Copyright (c) 2024 Juragan Store (All rights reversed)" })
            .setImage(`https://assets.open.mp/assets/images/skins/${row[0].Char_Skin}.png`)
            .setTimestamp();
                        
        mek = interaction.update({ embeds: [msgrow], ephemeral: true });
    }
};