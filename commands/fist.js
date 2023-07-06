
const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, Client } = require('discord.js');
const fs = require('node:fs');

//[建立/回覆 button] -> [建立 collector] -> [輸贏啦] -> [讀檔] -> [解析] -> [做事]  -> [回應] -> [存檔]

module.exports = {
    data: new SlashCommandBuilder().setName('fist').setDescription('Earn exp with fist!'),
    async execute(client, interaction) {
        const attack_priority = Math.floor(Math.random() * 2);
            // 0是bot 1是players
            let attack = '';
            if (attack_priority == 0) {
                attack = 'Bot';
            } else {
                attack = 'player';
            }
            //建立 embed 和剪刀石頭布的三個 button
            const buttonEmbed = new EmbedBuilder()
                .setColor('#5865F2')
                .setTitle(`工程師拳！`);

            const AButton = new ButtonBuilder()
                .setCustomId('爆肝')
                .setLabel('爆肝')
                .setStyle(ButtonStyle.Primary);

            const BButton = new ButtonBuilder()
                .setCustomId('打code')
                .setLabel('打code')
                .setStyle(ButtonStyle.Primary);

            const CButton = new ButtonBuilder()
                .setCustomId('喝快樂水')
                .setLabel('喝快樂水')
                .setStyle(ButtonStyle.Primary);
            const DButton = new ButtonBuilder()
                .setCustomId('debug')
                .setLabel('debug')
                .setStyle(ButtonStyle.Primary);
            //將三個 button 都放入 row 中並回覆 embed 和 row
            const buttonRow = new ActionRowBuilder()
                .addComponents(
                    AButton, BButton, CButton, DButton
                );

            //回覆
            interaction.reply({ embeds: [buttonEmbed], components: [buttonRow] });

            //建立 collector
            const collector = interaction.channel.createMessageComponentCollector({ time: 15000 });

            //等待 collector 蒐集到玩家案的按鈕
            collector.on('collect', async collected => {

                //電腦隨機出拳 (0:剪刀 1:石頭 2:布)
                const botChoice = Math.floor(Math.random() * 4);
                let bot="";
                if(botChoice == 0)
                {
                    bot = "爆肝";
                }
                else if(botChoice == 1)
                {
                    bot = "打code";
                }
                else if(botChoice == 2)
                {
                    bot = "喝快樂水";
                }
                else if(botChoice == 3)
                {
                    bot = "debug";
                }
                //利用玩家所按按鈕的 customId 來判斷玩家的選擇
                let playerChoice;
                if (collected.customId === '爆肝') {
                    playerChoice = 0;
                } else if (collected.customId === '打code') {
                    playerChoice = 1;
                } else if (collected.customId === '喝快樂水') {
                    playerChoice = 2;
                } else if (collected.customId === 'debug') {
                    playerChoice = 3;
                }

                //判斷玩家勝利，電腦勝利或平手 (C:平手 A:電腦 B:玩家)
                let winner = '';

                if(attack_priority == 0)
                {
                    if (botChoice == playerChoice) {
                        winner = 'A';
                    } else {
                        winner = 'C';
                    }
                    attack_priority == 1
                } 
                else {
                    if (botChoice == playerChoice) {
                        winner = 'B';
                    } else {
                        winner = 'C';
                    }
                    attack_priority == 0
                }
                

                //從結果計算獲得/失去的 money
                let earnings=0;
                if(winner =='A')
                {
                    earnings=-1;
                }
                else if(winner =='B')
                {
                    earnings=1;
                }

                //讀取 players.json 並 parse 成 players
                const data = fs.readFileSync('players.json',"utf-8");
                const players = JSON.parse(data);

                //在所有資料中尋找呼叫此指令玩家的資料
                let found = false;
                for (let j = 0; j < players.length; j++) {

                    //如果有就修改該玩家的 money 並回覆結果
                    if (players[j].id == interaction.user.id) {
                        found = true;
                        players[j].money += earnings;
                        const resultEmbed = new EmbedBuilder()
                            .setColor('#5865F2')
                            .setTitle('工程師拳')
                            .setDescription(`攻方:${attack}\n結果：Bot出的是${bot}\n你得${earnings}exp\n你現在有 ${players[j].money} exp!`);
                        collected.update({ embeds: [resultEmbed], components: [] });
                        break;
                    }
                }

                //如果沒有資料就創建一個新的並回覆結果
                if (found == false) {
                    players.push({ id: interaction.user.id, money: 10 });
                    const resultEmbed = new EmbedBuilder()
                        .setColor('#5865F2')
                        .setTitle('工程師拳')
                        .setDescription(`攻方:${attack}\n結果：Bot出的是${bot}\n你得${earnings}exp\n你現在有 ${10 + earnings} exp!`);
                    collected.update({ embeds: [resultEmbed], components: [] });
                }
                
                //stringify players 並存回 players.json
                const json = JSON.stringify(players);
                fs.writeFileSync('players.json', json);

                //關閉 collector
                collector.stop();
            });

        while (botChoice != playerChoice) {
            const attack_priority = Math.floor(Math.random() * 2);
            //let attack_priority = 0
            // 0是bot 1是players
            let attack = ''
            if (attack_priority == 0) {
                attack = 'Bot';
            } else {
                attack = 'player';
            }
            //建立 embed 和剪刀石頭布的三個 button
            const buttonEmbed = new EmbedBuilder()
                .setColor('#5865F2')
                .setTitle(`工程師拳！`);

            const AButton = new ButtonBuilder()
                .setCustomId('爆肝')
                .setLabel('爆肝')
                .setStyle(ButtonStyle.Primary);

            const BButton = new ButtonBuilder()
                .setCustomId('打code')
                .setLabel('打code')
                .setStyle(ButtonStyle.Primary);

            const CButton = new ButtonBuilder()
                .setCustomId('喝快樂水')
                .setLabel('喝快樂水')
                .setStyle(ButtonStyle.Primary);
            const DButton = new ButtonBuilder()
                .setCustomId('debug')
                .setLabel('debug')
                .setStyle(ButtonStyle.Primary);
            //將三個 button 都放入 row 中並回覆 embed 和 row
            const buttonRow = new ActionRowBuilder()
                .addComponents(
                    AButton, BButton, CButton, DButton
                );

            //回覆
            interaction.reply({ embeds: [buttonEmbed], components: [buttonRow] });

            //建立 collector
            const collector = interaction.channel.createMessageComponentCollector({ time: 15000 });

            //等待 collector 蒐集到玩家案的按鈕
            collector.on('collect', async collected => {

                //電腦隨機出拳 (0:剪刀 1:石頭 2:布)
                
                let bot="";
                if(botChoice == 0)
                {
                    bot = "爆肝";
                }
                else if(botChoice == 1)
                {
                    bot = "打code";
                }
                else if(botChoice == 2)
                {
                    bot = "喝快樂水";
                }
                else if(botChoice == 3)
                {
                    bot = "debug";
                }
                //利用玩家所按按鈕的 customId 來判斷玩家的選擇
                
                if (collected.customId === '爆肝') {
                    playerChoice = 0;
                } else if (collected.customId === '打code') {
                    playerChoice = 1;
                } else if (collected.customId === '喝快樂水') {
                    playerChoice = 2;
                } else if (collected.customId === 'debug') {
                    playerChoice = 3;
                }

                //判斷玩家勝利，電腦勝利或平手 (C:平手 A:電腦 B:玩家)
                let winner = '';
                
                if(attack_priority == 0)
                {
                    if (botChoice == playerChoice) {
                        winner = 'A';
                    } else {
                        winner = 'C';
                    }
                    attack_priority == 1
                } 
                else {
                    if (botChoice == playerChoice) {
                        winner = 'B';
                    } else {
                        winner = 'C';
                    }
                    attack_priority == 0
                }
                

                //從結果計算獲得/失去的 money
                let earnings=0;
                if(winner =='A')
                {
                    earnings=-1;
                }
                else if(winner =='B')
                {
                    earnings=1;
                }

                //讀取 players.json 並 parse 成 players
                const data = fs.readFileSync('players.json',"utf-8");
                const players = JSON.parse(data);

                //在所有資料中尋找呼叫此指令玩家的資料
                let found = false;
                for (let j = 0; j < players.length; j++) {

                    //如果有就修改該玩家的 money 並回覆結果
                    if (players[j].id == interaction.user.id) {
                        found = true;
                        players[j].money += earnings;
                        const resultEmbed = new EmbedBuilder()
                            .setColor('#5865F2')
                            .setTitle('工程師拳')
                            .setDescription(`攻方:${attack}\n結果：Bot出的是${bot}\n你得${earnings}exp\n你現在有 ${players[j].money} exp!`);
                        collected.update({ embeds: [resultEmbed], components: [] });
                        break;
                    }
                }

                //如果沒有資料就創建一個新的並回覆結果
                if (found == false) {
                    players.push({ id: interaction.user.id, money: 10 });
                    const resultEmbed = new EmbedBuilder()
                        .setColor('#5865F2')
                        .setTitle('工程師拳')
                        .setDescription(`攻方:${attack}\n結果：Bot出的是${bot}\n你得${earnings}exp\n你現在有 ${10 + earnings} exp!`);
                    collected.update({ embeds: [resultEmbed], components: [] });
                }
                
                //stringify players 並存回 players.json
                const json = JSON.stringify(players);
                fs.writeFileSync('players.json', json);

                //關閉 collector
                collector.stop();
            });
            }
    }
};
