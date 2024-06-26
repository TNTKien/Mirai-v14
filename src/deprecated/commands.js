/**
 * Share command metadata from a common spot to be used for both runtime
 * and registration.
 */

export const INVITE_COMMAND = {
  name: 'invite',
  description: 'Get an invite link to add the bot to your server',
};

export const PING_COMMAND = {
  name: 'ping',
  description: 'Pong!',
};

export const AVATAR_COMMAND = {
  name: 'avatar',
  description: 'Get the avatar of a user',
  options: [
    {
      name: 'user',
      description: 'The user to get the avatar',
      type: 6,
      required: false,
    },
  ],
};
