import { gregorianToJulian, julianToHijri } from './hijri-util-date.js';
import { toJalaali, toGregorian, jalaaliMonthLength, j2d} from './jalali-util-date.js';
import { readFileSync , writeFileSync,mkdirSync,existsSync} from '@zos/fs'

// import {persian_conv,gregorian_to_jalali,
//     conv_year2per,get_persian_day,get_persian_month,
//     num_days_in_month,positive_mod} from './date_conversion_functions.js'

// var current_date_g = null;
// export function check_date(){
//     let today = new Date(); // .toLocaleDateString('fa-IR');
//       today.setUTCHours(today.getUTCHours() - 4, today.getUTCMinutes() -30);
//     var date_in_g = [today.getFullYear(), today.getMonth()+1, today.getDate()];
//     day_of_week = today.getDay();

//     if (current_date_g[0]!=date_in_g[0] || current_date_g[1]!=date_in_g[1] &&
//         current_date_g[2]!=date_in_g[2] || current_date_g == null){ // date needs update
//     // update current date, and the corresponding txts
//     current_date_g = date_in_g;
//     } else {
        
//     }
    
// }
// var hijri_day_in_per_month = new Array(31).fill(1);
// var hijri_month_in_per_month = new Array(31).fill(2);
// var hijri_year_in_per_month = new Array(31).fill(1400);

export function get_hijri_from_persian(y_per,m_per,d_per){
    var julianDay  = j2d(y_per,m_per,d_per); 
    // var julianDay = gregorianToJulian(date_in_g[0], date_in_g[1], date_in_g[2]);
    [year_h, month_h, day_h] = julianToHijri(julianDay);
    // hijri_date = julianToHijri(julianDay);
    // return hijri_date.year, hijri_date.month, hijri_date.day
    return year_h, month_h, day_h
}


export function get_hijri_cal_in_persian_month(y_per,m_per,hijri_offset){
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

export function get_hijri_cal_in_persian_day(y_per,m_per,d_per,hijri_offset){
    // hijri_day_in_per_month = new Array(jalaaliMonthLength(y_per, m_per)).fill(1);
    // hijri_month_in_per_month = new Array(jalaaliMonthLength(y_per, m_per)).fill(2);
    // hijri_year_in_per_month = new Array(jalaaliMonthLength(y_per, m_per)).fill(1400);

    // for(let d_per=1;d_per <= jalaaliMonthLength(y_per,m_per); d_per++){
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
        hijri_year_in_per_month = year_h;
        hijri_month_in_per_month = month_h;
        hijri_day_in_per_month = day_h;
    // }
        
    
    return hijri_year_in_per_month, hijri_month_in_per_month, hijri_day_in_per_month
}

export function load_current_month_data(year_persian, month_persian,hijri_offset){
    // var ThisMonthHolidays;
    // var ThisMonthEvents;
    // var ThisMonthHijri;
    // check if it exist first or use try catch
    // if (existsSync('assets://events_current.json')){
    // // load available json
    const contentString = readFileSync({
        path: 'assets://events_current.json',
        options: {
        encoding: 'utf8',
        },
    })
    var CurrentCalendarStartDate = {};
    if (contentString != null) {
        CurrentCalendarStartDate = JSON.parse(contentString).CurrentCalendarStartDate;
    }else{
        // let CurrentCalendarStartDate = {};
        // let CurrentCalendarStartDate;
        CurrentCalendarStartDate.year = 0;
        CurrentCalendarStartDate.month = 0;
    }
    
    var ThisMonthHolidays = new Array(jalaaliMonthLength(year_persian, month_persian)).fill(false);
    var ThisMonthEvents = new Array(jalaaliMonthLength(year_persian, month_persian)).fill("");;
    var ThisMonthHijri = new Array(jalaaliMonthLength(year_persian, month_persian)).fill([0,0,0]);
    

    // compare it to given date, check if month has changed
    if (year_persian == CurrentCalendarStartDate.year  && month_persian == CurrentCalendarStartDate.month){
        // if not changed, use loaded file to load data from it, parse other information
        ThisMonthHolidays = JSON.parse(contentString).holiday;
        ThisMonthEvents = JSON.parse(contentString).events;
        ThisMonthHijri = JSON.parse(contentString).hijriDate;
    } else {
        // if changed, load main json and write the current month for future
        // else parse and write current month, remove last month
        // : fix parameters to comply with other json loading format and outputing
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
     
    //     // now write it to current month json for future use
        var calendar_dict = {};
        calendar_dict.holiday = holidays_of_month;
        calendar_dict.events = Events_of_month;
        calendar_dict.hijriDate = [hijri_year_in_per_month, hijri_month_in_per_month, hijri_day_in_per_month];
        calendar_dict.CurrentCalendarStartDate = {};
        calendar_dict.CurrentCalendarStartDate.year = year_persian;
        calendar_dict.CurrentCalendarStartDate.month = month_persian;
        calendar_dict.CurrentCalendarStartDate.hijri_offset = hijri_offset;

        
        // : add data prep before save
        writeFileSync({
            path: 'events_current.json',//'a.txt',//
            data: JSON.stringify(calendar_dict),// , null, 2), // (value, replacer, space)
            // options: {
            //   encoding: 'utf8',
            // },
          })
          ThisMonthHolidays = holidays_of_month;
          ThisMonthEvents = Events_of_month;
          ThisMonthHijri = [hijri_year_in_per_month, hijri_month_in_per_month, hijri_day_in_per_month];

    }

    // // the results should be in array for holidays_of_month and Events_of_month, and 
    // // these for date conversion: hijri_year_in_per_month, hijri_month_in_per_month, hijri_day_in_per_month
    return [ThisMonthHolidays, ThisMonthEvents, ThisMonthHijri]
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
    // console.log(hijri_day_in_per_month.length)
    //  console.log(hijri_month_in_per_month.length)
    //  console.log(hijri_year_in_per_month.length)

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


    return [holidays_of_month, Events_of_month, 
    hijri_year_in_per_month, hijri_month_in_per_month, hijri_day_in_per_month];
}


export function jalaaliDayEvents(year_persian, month_persian,day_persian,hijri_offset){
    const contentString = readFileSync({
        path: 'assets://events.json',
        options: {
          encoding: 'utf8',
        },
      })
      let PersianCalendar_events = JSON.parse(contentString).PersianCalendar;
      let HijriCalendar_events = JSON.parse(contentString).HijriCalendar;
    //   holidays_of_month, Events_of_month, 
    //     hijri_year_in_per_month, hijri_month_in_per_month, hijri_day_in_per_month = null;
    holidays_of_month = false;
    Events_of_month = '';
    // holidays_of_month = new Array(jalaaliMonthLength(year_persian, month_persian)).fill(false);
    // Events_of_month = new Array(jalaaliMonthLength(year_persian, month_persian)).fill("");
    // check all persian calendar events in month
    // for (var i=0;i< PersianCalendar_events.length;i++){
    //     if (PersianCalendar_events[i].type=='Iran' && PersianCalendar_events[i].month==date_in_p[1]){
    //         holidays_of_month[PersianCalendar_events[i].day -1] = PersianCalendar_events[i].holiday;
    //         Events_of_month[PersianCalendar_events[i].day -1] = PersianCalendar_events[i].title;
    //       }
    //   }
    // for (var persian_day_idx=0;persian_day_idx< jalaaliMonthLength(year_persian, month_persian);persian_day_idx++){
        for (var i=0;i< PersianCalendar_events.length;i++){
            if (PersianCalendar_events[i].type=='Iran' && 
            (day_persian == PersianCalendar_events[i].day) && 
            month_persian == PersianCalendar_events[i].month){
                holidays_of_month = PersianCalendar_events[i].holiday;
                Events_of_month = PersianCalendar_events[i].title;
                break;
                }
            }
    // } 
    // check all Hijri calendar events in month get_hijri_from_persian
    // hijri_year_in_per_month, hijri_month_in_per_month, hijri_day_in_per_month
    // = get_hijri_cal_in_persian_day(year_persian, month_persian,hijri_offset);
    hijri_year_in_per_month, hijri_month_in_per_month, hijri_day_in_per_month
    = get_hijri_cal_in_persian_day(year_persian, month_persian, day_persian, hijri_offset);
    
    // for (var persian_day_idx=0;persian_day_idx< jalaaliMonthLength(year_persian, month_persian);persian_day_idx++){
        for (var i=0;i< HijriCalendar_events.length;i++){
            if (HijriCalendar_events[i].type=='Iran' && 
            hijri_month_in_per_month==HijriCalendar_events[i].month && 
            hijri_day_in_per_month==HijriCalendar_events[i].day){
                holidays_of_month= HijriCalendar_events[i].holiday || holidays_of_month;
                Events_of_month = ''.concat(Events_of_month,',',HijriCalendar_events[i].title);
                break;
                }
            }
    // } 


    return holidays_of_month, Events_of_month, 
    hijri_year_in_per_month, hijri_month_in_per_month, hijri_day_in_per_month;
}