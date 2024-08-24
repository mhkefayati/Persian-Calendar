import { getText } from '@zos/i18n'
import { push } from '@zos/router'
import { readFileSync , writeFileSync,mkdirSync} from '@zos/fs'
import * as Styles from 'zosLoader:./index.[pf].layout.js'
import { getTextLayout, createWidget, widget, deleteWidget, event, prop,anim_status} from '@zos/ui'
import { log as Logger, px } from "@zos/utils";
import { getDeviceInfo } from '@zos/device'
import { align, text_style } from '@zos/ui'
// import {persian_conv,gregorian_to_jalali,
//   conv_year2per,get_persian_day,get_persian_month,
//   jalaliToGregorian,positive_mod} from './date_conversion_functions.js'
// import { openAssetsSync, O_RDONLY , readSync} from '@zos/fs'
import { ARABIC_MONTH_NAMES, julianToGregorian} from './hijri-util-date.js';
import { jalaaliMonthLength, toGregorian } from './jalali-util-date.js';
import { view_new_cal, create_month_buttons, draw_month} from './calendar_plotter.js';
import { LocalStorage } from '@zos/storage'
import { jalaaliMonthEvents } from './date_events_handlers.js';
import {persian_conv,gregorian_to_jalali,
  conv_year2per,get_persian_day,get_persian_month,
  num_days_in_month,positive_mod} from './date_conversion_functions.js'
// const localStorage = new LocalStorage();
// import {hijri_offset} from './calendar_plotter.js';
// var moment = require('moment-hijri');
// import { Time } from '@zos/sensor'
// const timeSensor = new Time()
// MONTHS_BUT_SIZE = 55;

// let group_gl;
const MONTHS_BUT_SIZE = 75;
const QRCODE_SIZE = 200;
// const screen_center_v = px(466/2);
const screen_center = px(466/2);
const logger = Logger.getLogger("my_app");
// cd /Applications/simulator.app/Contents/MacOS && sudo -s ./simulator
const text_size_donation = 50;
const text_size_width = 200;
Page({
  build() {
    // this.onInit11();
    // console.log(getText('example'))
    
    // let today = new Date(); // .toLocaleDateString('fa-IR');
    // today.setUTCHours(today.getUTCHours() - 3.5);
    // // let today = getLocaLTime();
    // // today = today.toLocaleString('en-US', { timeZone: 'Asia/Tehran' });
    // // today. 
    // var date_in_g = [today.getFullYear(), today.getMonth()+1, today.getDate()];
    // var day_of_week = today.getDay();//Sunday = 0

    // group_gl = draw_month(date_in_g,day_of_week);
    // create_month_buttons(group_gl, date_in_g,day_of_week);
    const exit_donation = createWidget(widget.IMG, {
      x: px(230-220),
      y: px(230-30),
      src: 'exit_donation.png',
      // w: px(MONTHS_BUT_SIZE),
      // h: px(MONTHS_BUT_SIZE),
      // color: 0xffffff,
      // text_size: 25,
      // align_h: align.CENTER_H,
      // align_v: align.CENTER_V,
      // radius: px(5),
      // normal_color: 0x000000,
      // press_color: 0xff00ff,
      // text: '«',
      // click_func: () => {
      //   // month_jump = 0;
      //   // deleteWidget(group);
      //   // page_cal.build();
      //   // group = draw_month(date_in_g,day_of_week);
      //   // set_group_cal(group);
        // push({
        //   url: 'page/index',
        //   // params: {
        //   //   id: '0',
        //   //   type: 'normal'
        //   // }
        // })
        // }
    })
    exit_donation.addEventListener(event.CLICK_DOWN, (info) => {
      push({
        url: 'page/index',
        // params: {
        //   id: '0',
        //   type: 'normal'
        // }
      })})
    // const imgAnimation = createWidget(widget.IMG_ANIM, {
    //   anim_path: 'anim',
    //   anim_prefix: 'animation',
    //   anim_ext: 'png',
    //   anim_fps: 17,
    //   anim_size: 17,
    //   repeat_count: 0,
    //   anim_status: anim_status.START,//3,
    //   x: 33,
    //   y: 33,
    //   // anim_complete_call: () => {
    //   //   console.log('animation complete')
    //   // click_func: () => {
    //   //   // month_jump = 0;
    //   //   // deleteWidget(group);
    //   //   // page_cal.build();
    //   //   // group = draw_month(date_in_g,day_of_week);
    //   //   // set_group_cal(group);
    //   //   push({
    //   //     url: 'page/index',
    //   //     // params: {
    //   //     //   id: '0',
    //   //     //   type: 'normal'
    //   //     // }
    //   //   })
    //     // }
    //   })
    const text1 = createWidget(widget.TEXT, {
      x: px(screen_center-text_size_width),
      y: px(screen_center-text_size_donation-5),
      w: text_size_width*2,
      h: text_size_donation,
      color: 0xffffff,
      text_size: text_size_donation/2,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style: text_style.NONE,
      text: 'در صورت تمایل برای'
    })  
    const text2 = createWidget(widget.TEXT, {
      x: px(screen_center-text_size_width/2),
      y: px(screen_center+text_size_donation+5),
      w: text_size_width,
      h: text_size_donation,
      color: 0xffffff,
      text_size: text_size_donation/2,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style: text_style.NONE,
      text: 'لمس کنید' 
    }) 
    const donation = createWidget(widget.BUTTON, {
        x: px(screen_center-text_size_width/2),
        y: px(screen_center),
        w: text_size_width,
        h: text_size_donation+10,
        color: 0xff0000,
        text_size: text_size_donation/2+5,
        // align_h: align.CENTER_H,
        // align_v: align.CENTER_V,
        radius: px(5),
        text_style: text_style.WRAP,
        normal_color: 0x000000,
        press_color: 0x00fff0,
        text: 'حمایت',
        click_func: () => {
          const donationـqrcode = createWidget(widget.QRCODE, {
            content: 'https://mahak-charity.org',
            x: screen_center-QRCODE_SIZE/2,
            y: screen_center-QRCODE_SIZE/2,
            w: QRCODE_SIZE,
            h: QRCODE_SIZE,
            bg_x: screen_center-QRCODE_SIZE/2-20,
            bg_y: screen_center-QRCODE_SIZE/2-20,
            bg_w: QRCODE_SIZE+40,
            bg_h: QRCODE_SIZE+40,
            bg_radius: 5
          })
          }
      })

      
      // var waitTill = new Date(new Date().getTime() + seconds * 300);
      // var color_new = 0;

      // // while(waitTill > new Date()){
      //   // if(parseInt(color_new, 16) < 0xffffff)
      //   //   color_new = color_new+10;
      //   // else
      //   //   color_new = 0;
      //   donation.setProperty(prop.MORE, {
      //     // color : 0xff00ff,//parseInt(100, 16),
      //     text: 'کنید'
      //   })
      //   // delay(100);
      // // }
    // })
    // const img_hour = createWidget(widget.IMG)
    // img_hour.setProperty(prop.MORE, {
    //   x: 0,
    //   y: 0,
    //   w: 454,
    //   h: 454,
    //   pos_x: 454 / 2 - 27,
    //   pos_y: 50 + 50,
    //   center_x: 454 / 2,
    //   center_y: 454 / 2,
    //   src: 'anim/animation_0.png',
    //   angle: 30
    // })

    // imgAnimation.setProperty(hmUI.prop.ANIM_STATUS, hmUI.anim_status.START)
    // imgAnimation.addEventListener(hmUI.event.CLICK_DOWN, () => {
    //   const isRunning = imgAnimation.getProperty(hmUI.prop.ANIM_IS_RUNINNG)

    //   if (!isRunning) {
    //     imgAnimation.setProperty(hmUI.prop.ANIM_STATUS, hmUI.anim_status.START)
    //   }
    // })
  },
  onResume(){
    this.build();
  }
})
// function delay(ms) {
//     const date = Date.now();
//     let currentDate = null;
 
//     do {
//         currentDate = Date.now();
//     } while (currentDate - date < ms);
// }