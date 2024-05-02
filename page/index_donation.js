import { getText } from '@zos/i18n'
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
import { view_new_cal, getMovedDates, create_month_buttons, draw_month} from './calendar_plotter.js';
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
MONTHS_BUT_SIZE = 55;

// let group_gl;
const logger = Logger.getLogger("my_app");
// cd /Applications/simulator.app/Contents/MacOS && sudo -s ./simulator

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
    const imgAnimation = createWidget(widget.IMG_ANIM, {
      anim_path: 'anim',
      anim_prefix: 'animation',
      anim_ext: 'png',
      anim_fps: 26,
      anim_size: 45,
      repeat_count: 0,
      anim_status: anim_status.START,//3,
      x: 33,
      y: 33,
      // anim_complete_call: () => {
      //   console.log('animation complete')
      })
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

