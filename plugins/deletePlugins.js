module.exports = {
  deleteMessage: async ({ socket, message, sendReply }) => {
    if (!message.quoted) {
      await sendReply("🚩 *Responde al mensaje que deseas eliminar*");
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
