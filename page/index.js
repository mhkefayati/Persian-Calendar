import { getText } from '@zos/i18n'
import { readFileSync , writeFileSync,mkdirSync} from '@zos/fs'
import * as Styles from 'zosLoader:./index.[pf].layout.js'
import { getTextLayout, createWidget, widget, deleteWidget, event, prop} from '@zos/ui'
import { log as Logger, px } from "@zos/utils";
import { getDeviceInfo } from '@zos/device'
import { align, text_style } from '@zos/ui'
// import {persian_conv,gregorian_to_jalali,
//   conv_year2per,get_persian_day,get_persian_month,
//   jalaliToGregorian,positive_mod} from './date_conversion_functions.js'
// import { openAssetsSync, O_RDONLY , readSync} from '@zos/fs'
import { ARABIC_MONTH_NAMES, julianToGregorian} from './hijri-util-date.js';
import { jalaaliMonthLength, toGregorian } from './jalali-util-date.js';
import { view_new_cal,getMovedDates } from './calendar_plotter.js';
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

let month_jump = 0; // current month

const logger = Logger.getLogger("my_app");
// import PersianCalendar from '../assets/default.r/events.json'
// import events from './events.json'
// let dev_info = getDeviceInfo();
// DEVICE_WIDTH = getDeviceInfo().width;
// DEVICE_HEIGHT = getDeviceInfo().height;
// export const CALORIE_TEXT_SIZE = px(72);
// export const CALORIE_TEXT_SIZE = px(72);
// export const CALORIE_TEXT = {
//   text: "400",
//   x: 0,
//   y: 0,
//   w: 0,
//   h: px(82),
//   color: 0xffffff,
//   text_size: CALORIE_TEXT_SIZE,
//   align_h: align.LEFT,
//   align_v: align.CENTER_V,
// };
// export const EQUIVALENT_MORE_FOOD_NUM = {
//   text: "",
//   x: 237,
//   y: 225,
//   w: 60,
//   h: 60,
//   color: 0xee801e,
//   text_size: 50,
//   align_h: align.LEFT,
//   align_v: align.CENTER_V,
// };



// var a = PersianCalendar[0];
// /Users/hadi/Downloads/Persian-Calendar/assets/default.r/events.json
// const pholiday = require('./index_pholiday.js');
// var m = moment('1981-08-17', 'YYYY-MM-DD')

Page({
  build() {
    // this.onInit11();
    console.log(getText('example'))
    
    let today = new Date(); // .toLocaleDateString('fa-IR');
    var date_in_g = [today.getFullYear(), today.getMonth()+1, today.getDate()];
    var day_of_week = today.getDay();

    date_in_g,day_of_week = getMovedDates(month_jump, date_in_g,day_of_week);
    
    group = view_new_cal(date_in_g,day_of_week,month_jump);

    const next_month = createWidget(widget.BUTTON, {
      x: px(230+180),
      y: px(230-MONTHS_BUT_SIZE-30),
      w: px(MONTHS_BUT_SIZE/2),
      h: px(MONTHS_BUT_SIZE),
      color: 0xffffff,
      text_size: 25,
      // align_h: align.CENTER_H,
      // align_v: align.CENTER_V,
      radius: px(5),
      normal_color: 0x000000,
      press_color: 0xff00ff,
      text: '▲',
      click_func: (button_widget) => {
        month_jump -= 1;
        deleteWidget(group);
        this.build();
        }
      // },
    });
    const previous_month = createWidget(widget.BUTTON, {
      x: px(230+180),
      y: px(230+30),
      w: px(MONTHS_BUT_SIZE/2),
      h: px(MONTHS_BUT_SIZE),
      color: 0xffffff,
      text_size: 25,
      // align_h: align.CENTER_H,
      // align_v: align.CENTER_V,
      radius: px(5),
      normal_color: 0x000000,
      press_color: 0xff00ff,
      text: '▼',
      click_func: (button_widget) => {
        month_jump += 1;
        deleteWidget(group);
        this.build();
        }
    });
    const current_month = createWidget(widget.BUTTON, {
      x: px(230+180),
      y: px(230-30),
      w: px(MONTHS_BUT_SIZE/2),
      h: px(MONTHS_BUT_SIZE),
      color: 0xffffff,
      text_size: 25,
      // align_h: align.CENTER_H,
      // align_v: align.CENTER_V,
      radius: px(5),
      normal_color: 0x000000,
      press_color: 0xff00ff,
      text: '◯',
      click_func: (button_widget) => {
        month_jump = 0;
        deleteWidget(group);
        this.build();
        }
    })
  },
  

})

