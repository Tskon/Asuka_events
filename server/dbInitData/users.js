module.exports = async (models) => {
  if (await models.User.countDocuments()) return

  models.User.create({
    username: 'beatxd',
    clanTag: 'ASUKA',
    clanName: 'ASUKA',
    isAdmin: true,
    avatar: 'https://listimg.pinclipart.com/picdir/s/115-1150177_info-navy-ship-svg-files-clipart.png',
    password: '$2a$08$ChrIzwUF6vpNJQ.SE8AWfu192nOf6K0/31O2MGqCG1sRKmFxWF7JG',
    secret: '$2a$08$ttD3.o4akS/vdS36/gPHouoW.PyUBOse9QIrXTi6zIBf4Vqkd2Rpi'
  })

  models.User.create({
    username: 'drobotov.92@mail.ru',
    clanTag: 'EZI_V',
    clanName: 'EZI_V',
    isAdmin: true,
    avatar: 'https://s3.us-east-1.amazonaws.com/storia-storage/staged/host-prod/J0gKq6xdJSLgpYboRi7WpvGIRtIICj15dUyVmArd.jpeg',
    password: '$2a$08$PSAu6YvLoJxSUF4njjnT0umDPet4OCFGC8cuSCdOhnjEiyHHsk6CS',
    secret: '$2a$08$PSAu6YvLoJxSUF4njjnT0umDPet4OCFGC8cuSCdOhnjEiyHHsk6CS'
  })
}
