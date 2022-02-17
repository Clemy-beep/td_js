import smtplib
from xmlrpc import server

server = smtplib.SMTP_SSL('smtp-pawolanmwen.alwaysdata.net', 465)
server.login("sandbox@loryleticee.com", "myqTem-0dejnu-wytwaw")
server.sendmail(
    "sandbox@loryleticee.com",
    "infos@loryleticee.fr",
    "subject: Nouvelle image dispo sur le serveur \n Ce message vient de Python. blip blop STOP."
)
server.quit()

