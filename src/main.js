import transPhrase from './modules/phrase'
import watchText from './modules/text'
import requestHook from './modules/request'
import resourceHook from './modules/resourse'
import transScenario from './modules/scenario'
import addFont from './utils/fontFace'
import './utils/keepBgm'
import { log, sleep } from './utils/index'

const main = async () => {
  try {
    await Promise.all([resourceHook(), addFont(), transPhrase(), watchText(), requestHook(), transScenario()])
  } catch (e) {
    log(e)
  }
}

let waitCount = 0
const start = async () => {
  if ((unsafeWindow && unsafeWindow.ezg || window.ezg) && waitCount < 30) {
    await sleep(1000)
    waitCount++
    log(waitCount)
    await start()
  } else {
    main()
  }
}

if (window.unsafeWindow) {
  unsafeWindow.addEventListener('load', start)
} else {
  window.addEventListener('load', start)
}