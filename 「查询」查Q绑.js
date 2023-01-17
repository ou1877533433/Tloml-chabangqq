import plugin from '../../lib/plugins/plugin.js'
import fetch from 'node-fetch'

export class wenan extends plugin {
  constructor () {
    super({
      name: '查Q绑',
      dsc: '查Q绑定手机号',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: `^#(查绑)(.*)`,
          fnc: 'cb'
        },
      ]
    })
  }
  async cb (e) {
    let msg = e.msg
		let place = msg.replace(/#|查绑/g, "").trim();
    let url = `http://tfapi.top/API/qqbd.php?msg=${place}`;
    let res = await fetch(url).catch((err) => logger.error(err))

    if (!res) {
    logger.error('[查询手机号] 接口请求失败')
    return await this.reply('查绑接口请求失败,请联系主人更换接口')
  }
    res = await res.text()
    await this.reply(`${res}\n该功能请谨慎使用,容易冻结机器人`)
    }  
}
