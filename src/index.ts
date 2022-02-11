/* eslint-disable no-console */
import { sendMail } from './mail'
import http from 'http'

let currentIp: string | undefined = undefined
const ipCheck = () => {
  http.get({ host: 'ifconfig.me', port: 80, path: '/' }, function(resp) {
    resp.on('data', function(ip) {
      console.log('My public IP address is: ' + ip)
      if (!currentIp) {
        currentIp = ip.toString()
      }

      if (currentIp !== ip.toString()) {
        const message = `IP address has been changed, current: ${currentIp}, new: ${ip}`
        console.log(message)
        sendMail('ip address changed', message)
      }
    })
  })
}
ipCheck()

setInterval(ipCheck, 5000)
