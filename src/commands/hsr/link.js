import {
  ButtonStyle,
  CommandOptionType,
  ComponentType,
  SlashCommand,
} from 'slash-create/web';
import { HsrPlayer } from '../../lib/hsr';

export default class Link extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'link',
      description: 'Link your Honkai Star Rail account to Discord',
      options: [
        {
          type: CommandOptionType.INTEGER,
          name: 'uid',
          description: 'Your HSR UID',
          required: true,
        },
      ],
    });
  }

  async run(ctx) {
    await ctx.defer();
    //const authorID = ctx.member.id;
    const hsrUID = ctx.options.uid;

    const res = await HsrPlayer(hsrUID);
    if (!res.data) return ctx.send(`Error: ${res.status} - ${res.message}`);

    const playerData = res.data;

    const embed = {
      title: playerData.nickname,
      author: {
        name: 'Is that you?',
        icon_url: playerData.headIcon,
      },
      thumbnail: {
        url: playerData.headIcon,
      },
      description: playerData.signature || '_ _',
      color: Math.floor(Math.random() * 0xffffff),
      fields: [
        {
          name: 'Level',
          value: playerData.level || '_ _',
          inline: true,
        },
        {
          name: 'Equilibrium',
          value: playerData.worldLevel || '_ _',
          inline: true,
        },
        {
          name: 'Friends',
          value: playerData.friendCount || '_ _',
          inline: true,
        },
      ],
      footer: {
        text: `UID: ${playerData.uid}`,
      },
    };

    const components = [
      {
        type: ComponentType.ACTION_ROW,
        components: [
          {
            type: ComponentType.BUTTON,
            style: ButtonStyle.PRIMARY,
            label: 'Yes',
            custom_id: 'link_confirm',
          },
          {
            type: ComponentType.BUTTON,
            style: ButtonStyle.DANGER,
            label: 'No',
            custom_id: 'link_cancel',
          },
        ],
      },
    ];

    await ctx.send({
      embeds: [embed],
      components: components,
    });

    ctx.registerComponent('link_confirm', async (btnCtx) => {
      await btnCtx.editParent({
        content: `✅ Linked! UID: ${playerData.uid}`,
        components: [],
        embeds: [],
      });
    });

    ctx.registerComponent('link_cancel', async (btnCtx) => {
      await btnCtx.editParent({
        content: '❌ Cancelled',
        components: [],
        embeds: [],
      });
    });
  }
}
