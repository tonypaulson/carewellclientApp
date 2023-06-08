import { Injectable } from "@angular/core";
import { DurationModel } from 'src/app/models/duration.model';

@Injectable()
export class DurationHelper {
    // GenDurationPullDown(): DurationModel[] {
    //     return [{ value: '300', text: '5min' },
    //     { value: '600', text: '10min' },
    //     { value: '900', text: '15min' },
    //     { value: '1200', text: '20min' },
    //     { value: '1500', text: '25min' },
    //     { value: '1800', text: '30min' },
    //     { value: '2100', text: '35min' },
    //     { value: '2400', text: '40min' },
    //     { value: '2700', text: '45min' },
    //     { value: '3000', text: '50min' },
    //     { value: '3300', text: '55min' },
    //     { value: '3600', text: '1h' },
    //     { value: '3900', text: '1h 5min' },
    //     { value: '4200', text: '1h 10min' },
    //     { value: '4500', text: '1h 15min' },
    //     { value: '4800', text: '1h 20min' },
    //     { value: '5100', text: '1h 25min' },
    //     { value: '5400', text: '1h 30min' },
    //     { value: '5700', text: '1h 35min' },
    //     { value: '6000', text: '1h 40min' },
    //     { value: '6300', text: '1h 45min' },
    //     { value: '6600', text: '1h 50min' },
    //     { value: '6900', text: '1h 55min' },
    //     { value: '7200', text: '2h' },
    //     { value: '8100', text: '2h 15min' },
    //     { value: '9000', text: '2h 30min' },
    //     { value: '9900', text: '2h 45min' },
    //     { value: '10800', text: '3h' },
    //     { value: '11700', text: '3h 15min' },
    //     { value: '12600', text: '3h 30min' },
    //     { value: '13500', text: '3h 45min' },
    //     { value: '14400', text: '4h' },
    //     { value: '16200', text: '4h 30min' },
    //     { value: '18000', text: '5h' },
    //     { value: '19800', text: '5h 30min' },
    //     { value: '21600', text: '6h' },
    //     { value: '23400', text: '6h 30min' },
    //     { value: '25200', text: '7h' },
    //     { value: '27000', text: '7h 30min' },
    //     { value: '28800', text: '8h' },
    //     { value: '32400', text: '9h' },
    //     { value: '36000', text: '10h' },
    //     { value: '39600', text: '11h' },
    //     { value: '43200', text: '12h' }];
    // }

    // getduration(startDate: Date, endDate: Date): DurationModel {
    //     var dif = startDate.getTime() - endDate.getTime();
    //     var Seconds_from_T1_to_T2 = dif / 1000;
    //     var Seconds_Between_Dates = Math.abs(Seconds_from_T1_to_T2);
    //     return this.GenDurationPullDown().filter(x => x.value === Seconds_Between_Dates.toString())[0];
    // }
}