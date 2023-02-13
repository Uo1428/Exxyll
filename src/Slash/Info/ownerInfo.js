const { CommandInteraction, Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ownerinfo',
    description: 'Returns Information about Owner',
    userperm: 'SEND_MESSAGES',
    botperm: 'SEND_MESSAGES',
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const owner = client.users.cache.get(process.env.OWNERID);
        const embed1 = new MessageEmbed()
            .setTitle(` Owner Info`)
            .setThumbnail(owner.displayAvatarURL({ dynamic: true }))
            .addField(`Name`, `Gifaldy Azka`) 
            .addField(`Discord Tag`, `Falcxxdev#0001`) // credit to real owner - uo
            .addField(`Working on`, `Bot Development, Website Development, Feature Development`)
            .addField(`Location`, `Bandung, Indonesia`)
            .setColor('PURPLE');

        interaction.followUp({ embeds: [embed1] });
    },
};
