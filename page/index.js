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
    // data: {
    //   date_in_g : null,
    //   date_in_p : null,
    //   holidays_of_month : null,
    //   Events_of_month : null,
    //   hijri_year_in_per_month : null,
    //   hijri_month_in_per_month : null,
    //   hijri_day_in_per_month : null,
    // },
  //   storage: localStorage,
  // },
  // onResume(){
  //   let today = new Date(); // .toLocaleDateString('fa-IR');
  //   var date_in_g = [today.getFullYear(), today.getMonth()+1, today.getDate()];
  //   var day_of_week = today.getDay();
  //   date_in_g,day_of_week = getMovedDates(month_jump, date_in_g,day_of_week);
  //   group = view_new_cal(date_in_g,day_of_week);//,month_jump,holidays_of_month, Events_of_month, 
    
  // },
  // onInit() {
  //   console.log('onInit')
  //   let today = new Date(); // .toLocaleDateString('fa-IR');
  //   let date_in_g = [today.getFullYear(), today.getMonth()+1, today.getDate()];
  //   let date_in_p = gregorian_to_jalali(date_in_g[0], date_in_g[1], date_in_g[2]); 
    
  //   let today_year_pr = date_in_p[0];
  //   let today_month_pr = date_in_p[1];
    
  //   holidays_of_month, Events_of_month, 
  //   hijri_year_in_per_month, hijri_month_in_per_month, hijri_day_in_per_month
  //    = jalaaliMonthEvents(today_year_pr, today_month_pr,hijri_offset);
  //   //  localStorage.setItem('state', this.state);
  //   localStorage.setItem('date_in_g', date_in_g);
  //   localStorage.setItem('date_in_p', date_in_p);
  //   localStorage.setItem('holidays_of_month', holidays_of_month);
  //   localStorage.setItem('Events_of_month', Events_of_month);
  //   localStorage.setItem('hijri_year_in_per_month', hijri_year_in_per_month);
  //   localStorage.setItem('hijri_month_in_per_month', hijri_month_in_per_month);
  //   localStorage.setItem('hijri_day_in_per_month', hijri_day_in_per_month);
  // AppService({
  //   onInit(e) {
  //     logger.log(`service onInit(${e})`)
  
  //     timeSensor.onPerMinute(() => {
  //       let today = new Date(); // .toLocaleDateString('fa-IR');
  //       let date_in_g = [today.getFullYear(), today.getMonth()+1, today.getDate()];
  //       let day_of_week = today.getDay();
  //       group = view_new_cal(date_in_g,day_of_week);//,month_jump,holidays_of_month, Events_of_month, 
  
  //       // logger.log(
  //       //   `${moduleName} time report: ${timeSensor.getHours()}:${timeSensor.getMinutes()}:${timeSensor.getSeconds()}`
  //       // )
  //     })
  //   },
  //   onDestroy() {
  //     logger.log('service on destroy invoke')
  //   }
  // });
  // },
  build() {
    // this.onInit11();
    console.log(getText('example'))
    // // date_in_g = localStorage.getItem('date_in_g');
    // // date_in_p = localStorage.getItem('date_in_p');
    // holidays_of_month = localStorage.getItem('holidays_of_month');
    // Events_of_month = localStorage.getItem('Events_of_month');
    // hijri_year_in_per_month = localStorage.getItem('hijri_year_in_per_month');
    // hijri_day_in_per_month = localStorage.getItem('hijri_day_in_per_month');
    // hijri_month_in_per_month = localStorage.getItem('hijri_month_in_per_month');
    
    // timeSensor.onPerDay(() => {
    // localStorage.setItem('state', this.state)
    // //////////////////////////////////////
    // const contentString = readFileSync({
    //   path: 'assets://events.json',
    //   options: {
    //     encoding: 'utf8',
    //   },
    // })
    // let PersianCalendar_events = JSON.parse(contentString).PersianCalendar;
    // //////////////////////////////
    // const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = getDeviceInfo();
    // let date = new Intl.DateTimeFormat('fa-IR', option).format(Date.now());
    let today = new Date(); // .toLocaleDateString('fa-IR');
    var date_in_g = [today.getFullYear(), today.getMonth()+1, today.getDate()];
    var day_of_week = today.getDay();
    
    // date_in_p = gregorian_to_jalali(date_in_g[0], date_in_g[1], date_in_g[2]); 
    
    // jump_cnt = month_jump;
    // while (jump_cnt !=0){
    //   date_in_p_c = date_in_p;
    //   date_in_p[1] += Math.sign(jump_cnt);
    //   if (date_in_p[1]> 12){
    //     date_in_p[1] = 1;
    //     date_in_p[0] += 1;
    //   } else if (date_in_p[1] < 1){
    //     date_in_p[1] = 12;
    //     date_in_p[0] -= 1;
    //   }
    //   if (jump_cnt > 0){
    //     current_month_length = jalaaliMonthLength(date_in_p_c[0],date_in_p_c[1]);
    //     day_of_week = positive_mod((current_month_length+day_of_week-1), 7)+1;      
    //   } else if (jump_cnt < 0){
    //     prev_month_length = jalaaliMonthLength(date_in_p[0],date_in_p[1]);
    //     day_of_week = positive_mod((-prev_month_length-1+day_of_week), 7)+1;      
    //   }
    //   // day_of_week = positive_mod((Math.sign(jump_cnt)*current_month_length+day_of_week), 7)+1;
    //   jump_cnt -= Math.sign(jump_cnt);
    // }
    // date_in_g = jalaliToGregorian(date_in_p[0], date_in_p[1], date_in_p[2]);
    // // let today = new Date(); // .toLocaleDateString('fa-IR');
    // // var date_in_g = [today.getFullYear(), today.getMonth()+1, today.getDate()];
    // // var day_of_week = today.getDay();
    // // const jstime = hmSensor.createSensor(hmSensor.id.TIME)
    // // var date_in_g = [jstime.year , jstime.month, jstime.day];

    // date_in_p = gregorian_to_jalali(date_in_g[0], date_in_g[1], date_in_g[2]); 
      
    // jump_cnt = month_jump;
    // while (jump_cnt !=0){
    //   date_in_p_c = date_in_p;
    //   date_in_p[1] += Math.sign(jump_cnt);
    //   if (date_in_p[1]> 12){
    //     date_in_p[1] = 1;
    //     date_in_p[0] += 1;
    //   } else if (date_in_p[1] < 1){
    //     date_in_p[1] = 12;
    //     date_in_p[0] -= 1;
    //   }
    //   if (jump_cnt > 0){
    //     current_month_length = jalaaliMonthLength(date_in_p_c[0],date_in_p_c[1]);
    //     day_of_week = positive_mod((current_month_length+day_of_week-1), 7)+1;      
    //   } else if (jump_cnt < 0){
    //     prev_month_length = jalaaliMonthLength(date_in_p[0],date_in_p[1]);
    //     day_of_week = positive_mod((-prev_month_length-1+day_of_week), 7)+1;      
    //   }
    //   // day_of_week = positive_mod((Math.sign(jump_cnt)*current_month_length+day_of_week), 7)+1;
    //   jump_cnt -= Math.sign(jump_cnt);
    // }
    // date_in_g = jalaliToGregorian(date_in_p[0], date_in_p[1], date_in_p[2]);
    // // date_in_g[0] = date_in_g_d.gy;
    // // date_in_g[1] = date_in_g_d.gm;
    // // date_in_g[2] = date_in_g_d.gd;
    // // date_in_p[1] = positive_mod((month_jump+date_in_p[1]), 12);
    // // date_in_p[0] = Math.floor(month_jump/12) + date_in_p[0];

    date_in_g,day_of_week = getMovedDates(month_jump, date_in_g,day_of_week);
    
    group = view_new_cal(date_in_g,day_of_week,month_jump);//,month_jump,holidays_of_month, Events_of_month, 
      // hijri_year_in_per_month, hijri_month_in_per_month, hijri_day_in_per_month);
    // })
    // const next_month = createWidget(widget.BUTTON, {
    //   x: px(230+180),
    //   y: px(230-MONTHS_BUT_SIZE-30),
    //   w: px(MONTHS_BUT_SIZE/2),
    //   h: px(MONTHS_BUT_SIZE),
    //   color: 0xffffff,
    //   text_size: 25,
    //   // align_h: align.CENTER_H,
    //   // align_v: align.CENTER_V,
    //   radius: px(5),
    //   normal_color: 0x000000,
    //   press_color: 0xff00ff,
    //   text: '▲',
    //   click_func: (button_widget) => {
    //     month_jump -= 1;
    //     deleteWidget(group);
    //     this.build();
    //     }
    //   // },
    // });
    // const previous_month = createWidget(widget.BUTTON, {
    //   x: px(230+180),
    //   y: px(230+30),
    //   w: px(MONTHS_BUT_SIZE/2),
    //   h: px(MONTHS_BUT_SIZE),
    //   color: 0xffffff,
    //   text_size: 25,
    //   // align_h: align.CENTER_H,
    //   // align_v: align.CENTER_V,
    //   radius: px(5),
    //   normal_color: 0x000000,
    //   press_color: 0xff00ff,
    //   text: '▼',
    //   click_func: (button_widget) => {
    //     month_jump += 1;
    //     deleteWidget(group);
    //     this.build();
    //     }
    // });
    // // const current_month = createWidget(widget.BUTTON, {
    // //   x: px(230+180),
    // //   y: px(230-30),
    // //   w: px(MONTHS_BUT_SIZE/2),
    // //   h: px(MONTHS_BUT_SIZE),
    // //   color: 0xffffff,
    // //   text_size: 25,
    // //   // align_h: align.CENTER_H,
    // //   // align_v: align.CENTER_V,
    // //   radius: px(5),
    // //   normal_color: 0x000000,
    // //   press_color: 0xff00ff,
    // //   text: '◯',
    // //   click_func: (button_widget) => {
    // //     month_jump = 0;
    // //     deleteWidget(group);
    // //     this.build();
    // //     }
    // // })
  },
  

})

