const { PREFIX } = require("../../config");
const { deleteMessage } = require("../plugins/deletePlugin");

module.exports = {
  name: "delete",
  description: "Elimina un mensaje del chat (requiere permisos de administrador).",
  commands: ["delete", "del"],
  usage: `${PREFIX}delete (responde a un mensaje)`,
  handle: async ({ socket, message, sendReply, isGroupAdmin, isBotAdmin }) => {
    if (!isGroupAdmin) {
      await sendReply("🚫 Solo los administradores pueden usar este comando.");
      return;
    }

    if (!isBotAdmin) {
      await sendReply("🚫 Necesito ser administrador para eliminar mensajes.");
      return;
    }

    await deleteMessage({ socket, message, sendReply });
  },
};
