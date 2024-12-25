const { PREFIX } = require("../../config");

module.exports = {
  name: "delete",
  description: "Elimina un mensaje del chat (requiere permisos de administrador).",
  commands: ["delete", "del"],
  usage: `${PREFIX}delete (responde a un mensaje)`,
  handle: async ({ socket, message, sendReply, isGroupAdmin, isBotAdmin }) => {
    if (!message.quoted) {
      await sendReply("🚩 *Responde al mensaje que deseas eliminar*");
      return;
    }

    if (!isGroupAdmin) {
      await sendReply("🚫 Solo los administradores pueden usar este comando.");
      return;
    }

    if (!isBotAdmin) {
      await sendReply("🚫 Necesito ser administrador para eliminar mensajes.");
      return;
    }

    try {
      const key = {
        remoteJid: message.quoted.key.remoteJid,
        fromMe: message.quoted.key.fromMe,
        id: message.quoted.key.id,
        participant: message.quoted.key.participant || null,
      };

      // Eliminar el mensaje
      await socket.sendMessage(message.remoteJid, { delete: key });
    } catch (error) {
      console.error("Error al intentar eliminar el mensaje:", error);
      await sendReply("⚠️ No se pudo eliminar el mensaje. Intenta de nuevo.");
    }
  },
};
