const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ownerinfo',
    description: 'Returns Information about bot Owner',
    emoji: '👑',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const owner = client.users.cache.get(process.env.OWNERID);
        const embed1 = new MessageEmbed()
            .setTitle(`👑 Owner Info`)
            .setThumbnail(owner.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'Name', value: owner.username },
                { name: 'Discord tag', value: owner.tag },
                { name: 'Working on', value: 'Bot development, Maintenance, Code Reviewers' },
                { name: 'Server', value: '[Join Now](https://dsc.gg/uoaio)' }
            )
            .setColor(owner.hexAccentColor);
        message.channel.send({ embeds: [embed1] });
    },
};
