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
import { jalaaliMonthLength,toGregorian } from './jalali-util-date.js';
import { jalaaliMonthEvents } from './date_events_handlers.js';
import { setPageBrightTime, resetPageBrightTime, pauseDropWristScreenOff} from '@zos/display'

export const font_path = `/fonts/Vazir.ttf`; //`/fonts/custom.ttf` 'Vazir';
ox = 0;
const DATE_BUT_SIZE = 37;
export const screen_center_v = px(240-DATE_BUT_SIZE/2-20);
export const screen_center_h = px(240-DATE_BUT_SIZE/2);
table_offset_v = 30;
export const gap_v = DATE_BUT_SIZE+8;
export const gap_h = gap_v;

export const hijri_offset = -1;

// date_in_g = [2024,4,6];
    // day_of_week = 6;
export function view_new_cal(date_in_g,day_of_week){//,month_jump,holidays_of_month, Events_of_month, 
  // hijri_year_in_per_month, hijri_month_in_per_month, hijri_day_in_per_month){
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
    
    holidays_of_month, Events_of_month, 
    hijri_year_in_per_month, hijri_month_in_per_month, hijri_day_in_per_month
     = jalaaliMonthEvents(today_year_pr, today_month_pr,hijri_offset);
    // holidays_of_month = state.data.holidays_of_month;
    // Events_of_month = state.data.Events_of_month;
    // hijri_year_in_per_month = state.data.hijri_year_in_per_month;
    // hijri_month_in_per_month = state.data.hijri_month_in_per_month;
    // hijri_day_in_per_month = state.data.hijri_day_in_per_month;
    

     const group = createWidget(widget.GROUP, Param)

    // Creating UI sub-widgets
    date_info = group.createWidget(widget.TEXT, {
      x: px(screen_center_h-300/2),
      y: px(3* gap_v + screen_center_v)+20,
      w: 300,
      h: 60,
      color: 0xffffff,
      text_size: 22,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text:  Events_of_month[today_date_pr-1],//Events_of_month[0],//today.toString(), //
      Font: font_path,
    })
    date_info_sel = group.createWidget(widget.TEXT, {
      x: px(screen_center_h-300/2),
      y: px(4* gap_v + screen_center_v)+20,
      w: 300,
      h: 60,
      color: 0xffffff,
      text_size: 22,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V, // hijri_year_in_per_month, hijri_month_in_per_month, hijri_date_in_per_month
      text:  ''.concat(persian_conv[`${hijri_day_in_per_month[today_date_pr-1]}`],' ',ARABIC_MONTH_NAMES[hijri_month_in_per_month[today_date_pr-1]],
      ' ',conv_year2per(hijri_year_in_per_month[today_date_pr-1])), //today.toString(), //
      Font: font_path,
    })

    for (let i = 1; i <= jalaaliMonthLength(today_year_pr,today_month_pr); i++) { 
      row_idx = Math.floor((i+day_of_week_in_month_start-1)/7) + 1;
      col_idx = ((i+day_of_week_in_month_start-1)%7) +1;
      pos_y = (row_idx-3) * gap_v + screen_center_v;
      pos_x = -(col_idx-4) * gap_h + screen_center_h;
      
      if (i==today_date_pr && month_jump == 0)
        date_color = 0x00ffff; // current day color
      else if (holidays_of_month[i-1] )//|| (col_idx%7 == 0))
        date_color = 0xff0000; // holiday color
      else if (col_idx%7 == 0)
        date_color = 0xff0000; // jome color
      else
        date_color = 0xffffff; // normal day color

      const cal_day = group.createWidget(widget.BUTTON, {
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
          Font: font_path,
        })

    }
    // pos_x = 6 * gap_h + screen_center_h;
    group.createWidget(widget.FILL_RECT, {
      x: px(-3 * gap_h + screen_center_h-10/2),
      y: px(-3* gap_v + screen_center_v),
      w: 7 * gap_h,
      h: px(DATE_BUT_SIZE),
      radius: 10,
      color: 0x00e0e0,
    })
    for (let day_idx = 1; day_idx <=7; day_idx++){
      pos_x = -(day_idx-4) * gap_h + screen_center_h;
      group.createWidget(widget.TEXT, {
        x: px(pos_x),
        y: px(-3* gap_v + screen_center_v-2),
        w: px(DATE_BUT_SIZE)+2,
        h: px(DATE_BUT_SIZE)+2,
        color: 0x000000, // days color
        text_size: DATE_BUT_SIZE-15,
        align_h: align.CENTER_H,
        align_v: align.CENTER_V,
        text: get_persian_day(day_idx)[0],
        Font: font_path,
      })
    }
    // print month
    month_top_info = group.createWidget(widget.TEXT, {
        x: px(screen_center_h-200/2+10),
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
        Font: font_path,
      })
    if (month_jump!= 0){
        if (month_jump> 0)
            jump_mode_txt = 'ماه بعد';
        else
            jump_mode_txt = 'ماه قبل';
        plt_month_txt = '('.concat(persian_conv[`${Math.abs(month_jump)}`],
            ' ', jump_mode_txt);
        month_top_info.setProperty(prop.MORE, {
            text : ''.concat(plt_month_txt,') ',month_txt,
            ' ',conv_year2per(today_year_pr)),
          })
    }
    setPageBrightTime({
        brightTime: 60000,
      })
    pauseDropWristScreenOff({
        duration: 60000,
      })
    return group
}   

