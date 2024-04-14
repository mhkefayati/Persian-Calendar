import { gregorianToJulian, julianToHijri } from './hijri-util-date.js';
import { toJalaali, toGregorian, jalaaliMonthLength, j2d} from './jalali-util-date.js';
import { readFileSync , writeFileSync,mkdirSync} from '@zos/fs'

// import {persian_conv,gregorian_to_jalali,
//     conv_year2per,get_persian_day,get_persian_month,
//     num_days_in_month,positive_mod} from './date_conversion_functions.js'


export function get_hijri_from_persian(y_per,m_per,d_per){
    var julianDay  = j2d(y_per,m_per,d_per); 
    // var julianDay = gregorianToJulian(date_in_g[0], date_in_g[1], date_in_g[2]);
    [year_h, month_h, day_h] = julianToHijri(julianDay);
    // hijri_date = julianToHijri(julianDay);
    // return hijri_date.year, hijri_date.month, hijri_date.day
    return year_h, month_h, day_h
}


function get_hijri_cal_in_persian_month(y_per,m_per,hijri_offset){
    hijri_day_in_per_month = new Array(jalaaliMonthLength(y_per, m_per)).fill(1);
    hijri_month_in_per_month = new Array(jalaaliMonthLength(y_per, m_per)).fill(2);
    hijri_year_in_per_month = new Array(jalaaliMonthLength(y_per, m_per)).fill(1400);

    for(let d_per=1;d_per <= jalaaliMonthLength(y_per,m_per); d_per++){
        d_per_with_off = d_per + hijri_offset;
        m_per_with_off = m_per;
        y_per_with_off = y_per;
        if (d_per_with_off > jalaaliMonthLength(y_per,m_per)){
            d_per_with_off = d_per_with_off - jalaaliMonthLength(y_per,m_per);
            m_per_with_off = m_per +1;
            if (m_per_with_off > 12)
                y_per_with_off = y_per + 1;
        }
        else if (d_per_with_off < 1){
            m_per_with_off = m_per -1;
            if (m_per_with_off < 1){
                m_per_with_off = 12;
                y_per_with_off = y_per - 1;
            }
            d_per_with_off = jalaaliMonthLength(y_per_with_off,m_per_with_off)+d_per_with_off;
        }
        
        y_per_with_off,m_per_with_off,d_per_with_off
        year_h, month_h, day_h = get_hijri_from_persian(y_per_with_off,m_per_with_off,d_per_with_off);
        hijri_year_in_per_month[d_per-1] = year_h;
        hijri_month_in_per_month[d_per-1] = month_h;
        hijri_day_in_per_month[d_per-1] = day_h;
    }
        
    
    return hijri_year_in_per_month, hijri_month_in_per_month, hijri_day_in_per_month
}

export function jalaaliMonthEvents(year_persian, month_persian,hijri_offset){
    const contentString = readFileSync({
        path: 'assets://events.json',
        options: {
          encoding: 'utf8',
        },
      })
      let PersianCalendar_events = JSON.parse(contentString).PersianCalendar;
      let HijriCalendar_events = JSON.parse(contentString).HijriCalendar;
      
    holidays_of_month = new Array(jalaaliMonthLength(year_persian, month_persian)).fill(false);
    Events_of_month = new Array(jalaaliMonthLength(year_persian, month_persian)).fill("");
    // check all persian calendar events in month
    // for (var i=0;i< PersianCalendar_events.length;i++){
    //     if (PersianCalendar_events[i].type=='Iran' && PersianCalendar_events[i].month==date_in_p[1]){
    //         holidays_of_month[PersianCalendar_events[i].day -1] = PersianCalendar_events[i].holiday;
    //         Events_of_month[PersianCalendar_events[i].day -1] = PersianCalendar_events[i].title;
    //       }
    //   }
    for (var persian_day_idx=0;persian_day_idx< jalaaliMonthLength(year_persian, month_persian);persian_day_idx++){
        for (var i=0;i< PersianCalendar_events.length;i++){
            if (PersianCalendar_events[i].type=='Iran' && 
            ((persian_day_idx+1) == PersianCalendar_events[i].day) && 
            month_persian == PersianCalendar_events[i].month){
                holidays_of_month[persian_day_idx] = PersianCalendar_events[i].holiday;
                Events_of_month[persian_day_idx] = PersianCalendar_events[i].title;
                break;
                }
            }
    } 
    // check all Hijri calendar events in month
    hijri_year_in_per_month, hijri_month_in_per_month, hijri_day_in_per_month
    = get_hijri_cal_in_persian_month(year_persian, month_persian,hijri_offset);
    
    for (var persian_day_idx=0;persian_day_idx< jalaaliMonthLength(year_persian, month_persian);persian_day_idx++){
        for (var i=0;i< HijriCalendar_events.length;i++){
            if (HijriCalendar_events[i].type=='Iran' && 
            hijri_month_in_per_month[persian_day_idx]==HijriCalendar_events[i].month && 
            hijri_day_in_per_month[persian_day_idx]==HijriCalendar_events[i].day){
                holidays_of_month[persian_day_idx] = HijriCalendar_events[i].holiday || holidays_of_month[persian_day_idx];
                Events_of_month[persian_day_idx] = ''.concat(Events_of_month[persian_day_idx],',',HijriCalendar_events[i].title);
                break;
                }
            }
    } 


    return holidays_of_month, Events_of_month, 
    hijri_year_in_per_month, hijri_month_in_per_month, hijri_day_in_per_month;
}