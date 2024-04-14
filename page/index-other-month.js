import { getText } from '@zos/i18n'
import { readFileSync , writeFileSync,mkdirSync} from '@zos/fs'
import * as Styles from 'zosLoader:./index.[pf].layout.js'
import { getTextLayout, createWidget, widget, event, prop} from '@zos/ui'
import { log as Logger, px } from "@zos/utils";
import { getDeviceInfo } from '@zos/device'
import { align, text_style } from '@zos/ui'
import {persian_conv,gregorian_to_jalali,
  conv_year2per,get_persian_day,get_persian_month,
  num_days_in_month,positive_mod} from './date_conversion_functions.js'
// import { openAssetsSync, O_RDONLY , readSync} from '@zos/fs'
import { ARABIC_MONTH_NAMES} from './hijri-util-date.js';
import { jalaaliMonthLength } from './jalali-util-date.js';
import { jalaaliMonthEvents } from './date_events_handlers.js';

// var moment = require('moment-hijri');


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


ox = 0;
const DATE_BUT_SIZE = 37;
screen_center_v = px(240-DATE_BUT_SIZE/2);
screen_center_h = px(240-DATE_BUT_SIZE/2);
table_offset_v = 30;
gap_v = DATE_BUT_SIZE+8;
gap_h = gap_v;
// var a = PersianCalendar[0];
// /Users/hadi/Downloads/Persian-Calendar/assets/default.r/events.json
// const pholiday = require('./index_pholiday.js');
// var m = moment('1981-08-17', 'YYYY-MM-DD')


Page({
  build() {
    console.log(getText('example'))
    
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
    day_of_week = today.getDay();
    // const jstime = hmSensor.createSensor(hmSensor.id.TIME)
    // var date_in_g = [jstime.year , jstime.month, jstime.day];


    // date_in_g = [2024,4,6];
    // day_of_week = 6;
    
    if (day_of_week < 6)
      day_of_week_persian = day_of_week+2;
    else
      day_of_week_persian = day_of_week-5;

    day_of_week_persian_txt = get_persian_day(day_of_week_persian);
  

    date_in_p = gregorian_to_jalali(date_in_g[0], date_in_g[1], date_in_g[2]); 
    // date_in_p = miladi_be_shamsi(today.getFullYear(), today.getMonth(), today.getDate()) 
    // date_in_p = [1403,1,14];
    month_txt = get_persian_month(date_in_p[1]);
    today_date_pr = date_in_p[2];
    today_year_pr = date_in_p[0];
    today_month_pr =  date_in_p[1];

    day_of_week_in_month_start = positive_mod((day_of_week_persian - (today_date_pr % 7)),7) ;
    
    hijri_offset = -2;
    holidays_of_month, Events_of_month, 
    hijri_year_in_per_month, hijri_month_in_per_month, hijri_day_in_per_month
     = jalaaliMonthEvents(today_year_pr, today_month_pr,hijri_offset);

    date_info = createWidget(widget.TEXT, {
      x: px(screen_center_h-300/2),
      y: px(3* gap_v + screen_center_v),
      w: 300,
      h: 60,
      color: 0xffffff,
      text_size: 22,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text:  Events_of_month[today_date_pr-1],//Events_of_month[0],//today.toString(), //
      Font: `/fonts/custom.ttf`,
    })
    date_info_sel = createWidget(widget.TEXT, {
      x: px(screen_center_h-300/2),
      y: px(4* gap_v + screen_center_v),
      w: 300,
      h: 60,
      color: 0xffffff,
      text_size: 22,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V, // hijri_year_in_per_month, hijri_month_in_per_month, hijri_date_in_per_month
      text:  ''.concat(persian_conv[`${hijri_day_in_per_month[today_date_pr-1]}`],' ',ARABIC_MONTH_NAMES[hijri_month_in_per_month[today_date_pr-1]],
      ' ',conv_year2per(hijri_year_in_per_month[today_date_pr-1])), //today.toString(), //
      Font: `/fonts/custom.ttf`,
    })

    for (let i = 1; i <= jalaaliMonthLength(today_year_pr,today_month_pr); i++) { 
      row_idx = Math.floor((i+day_of_week_in_month_start-1)/7) + 1;
      col_idx = ((i+day_of_week_in_month_start-1)%7) +1;
      pos_y = (row_idx-3) * gap_v + screen_center_v;
      pos_x = -(col_idx-4) * gap_h + screen_center_h;
      
      if (i==today_date_pr)
        date_color = 0x0000ff; // current day color
      else if (holidays_of_month[i-1] )//|| (col_idx%7 == 0))
        date_color = 0xff0000; // holiday color
      else if (col_idx%7 == 0)
        date_color = 0xff0000; // jome color
      else
        date_color = 0xffffff; // normal day color

      const cal_day = createWidget(widget.BUTTON, {
          x: px(pos_x),
          y: px(pos_y),
          w: px(DATE_BUT_SIZE),
          h: px(DATE_BUT_SIZE),
          color: date_color,
          text_size: DATE_BUT_SIZE-5,
          // align_h: align.CENTER_H,
          // align_v: align.CENTER_V,
          radius: px(DATE_BUT_SIZE),
          normal_color: 0x202020,
          press_color: 0x00ffff,
          // text: 'Hello',
          click_func: (button_widget) => {
            date_info.setProperty(prop.MORE, {
              text : Events_of_month[i-1],
            }),
            date_info_sel.setProperty(prop.MORE, {
              text : ''.concat(persian_conv[`${hijri_day_in_per_month[i-1]}`],' ',ARABIC_MONTH_NAMES[hijri_month_in_per_month[i-1]],
              ' ',conv_year2per(hijri_year_in_per_month[i-1])),
            })
          },
          text: persian_conv[`${i}`],
          Font: `/fonts/custom.ttf`,
        })

    }
    // pos_x = 6 * gap_h + screen_center_h;
    createWidget(widget.FILL_RECT, {
      x: px(-3 * gap_h + screen_center_h-10/2),
      y: px(-3* gap_v + screen_center_v),
      w: 7 * gap_h,
      h: px(DATE_BUT_SIZE),
      radius: 10,
      color: 0x00e0e0,
    })
    for (let day_idx = 1; day_idx <=7; day_idx++){
      pos_x = -(day_idx-4) * gap_h + screen_center_h;
      createWidget(widget.TEXT, {
        x: px(pos_x),
        y: px(-3* gap_v + screen_center_v+2),
        w: px(DATE_BUT_SIZE)+2,
        h: px(DATE_BUT_SIZE)+2,
        color: 0xffffff, // days color
        text_size: DATE_BUT_SIZE-15,
        align_h: align.TOP,
        align_v: align.TOP,
        text: get_persian_day(day_idx)[0],
        Font: `/fonts/custom.ttf`,
      })
    }
    // print month
    createWidget(widget.TEXT, {
      x: px(screen_center_h-200/2),
      y: px(-4* gap_v + screen_center_v-10),
      w: 200,
      h: 60,
      color: 0xffffff,
      text_size: 20,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text: ''.concat(get_persian_day(day_of_week_persian),
      ' ', persian_conv[`${today_date_pr}`],' ',month_txt,
      ' ',conv_year2per(today_year_pr)),
      Font: `/fonts/custom.ttf`,
    })
  }
})
