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

// export function set_group_cal(group){
//   group_gl = group;
// };

Page({
  build() {
    // this.onInit11();
    console.log(getText('example'))
    
    let today = new Date(); // .toLocaleDateString('fa-IR');
    var date_in_g = [today.getFullYear(), today.getMonth()+1, today.getDate()];
    var day_of_week = today.getDay();

    group_gl = draw_month(date_in_g,day_of_week);
    create_month_buttons(group_gl, date_in_g,day_of_week);
  }
})

