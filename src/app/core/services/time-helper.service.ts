import { Injectable } from "@angular/core";
import { TimeHelperModel } from "src/app/models/time-helper-model";

@Injectable()
export class TimeHelper {
  GenTimePullDown(MinuteInterval, currenctDate: Date = null) {
    var timesModel = new Array<TimeHelperModel>();
    var d = new Date(); //get a
    d.setHours(0, 0, 0, 0); //reassign it to today's midnight /* Param Order: Hours, Minutes, Seconds, Milliseconds */

    if (currenctDate !== null) {
      d.setHours(currenctDate.getHours(), currenctDate.getMinutes() - (new Date().getMinutes() % 5) + 5, 0, 0); /* Param Order: Hours, Minutes, Seconds, Milliseconds */
    }

    var date = d.getDate();
    var timeArr = [];
    while (date == d.getDate()) {
      var hours = d.getHours();
      var minutes = d.getMinutes();

      var _hours = hours.toString();
      var _minutes = minutes.toString();

      hours = hours == 0 ? 12 : hours; //if it is 0, then make it 12
      var ampm = "am";
      ampm = hours > 12 ? "pm" : "am";
      hours = hours > 12 ? hours - 12 : hours; //if more than 12, reduce 12 and set am/pm flag
      _hours = ("0" + hours).slice(-2); //pad with 0
      _minutes = ("0" + d.getMinutes()).slice(-2); //pad with 0
      timeArr.push(_hours + ":" + _minutes + " " + ampm);
      timesModel.push({
        value: _hours + ":" + _minutes + " " + ampm,
        text: _hours + ":" + _minutes + " " + ampm,
      });
      d.setMinutes(d.getMinutes() + MinuteInterval); //increment by 5 minutes
    }

    return timesModel;
  }

  formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  withoutTime(date) {
    var d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  GenNextAvailableTimeSlots(MinuteInterval, selectedLastTimeSlot) {
    var timesModel = new Array<TimeHelperModel>();

    let selectedTimeHour =
      selectedLastTimeSlot.substring(6, 8) === "am"
        ? selectedLastTimeSlot.substring(0, 2)
        : 12 + Number.parseInt(selectedLastTimeSlot.substring(0, 2));
    let selectedTimeMin = selectedLastTimeSlot.substring(3, 5);

    var d = new Date(); //get a
    d.setHours(selectedTimeHour, selectedTimeMin, 0, 0); //reassign it to today's midnight
    d.setMinutes(d.getMinutes() + MinuteInterval);

    var date = d.getDate();
    var timeArr = [];
    while (date == d.getDate()) {
      var hours = d.getHours();
      var minutes = d.getMinutes();

      var _hours = hours.toString();
      var _minutes = minutes.toString();

      hours = hours == 0 ? 12 : hours; //if it is 0, then make it 12
      var ampm = "am";
      ampm = hours > 12 ? "pm" : "am";
      hours = hours > 12 ? hours - 12 : hours; //if more than 12, reduce 12 and set am/pm flag
      _hours = ("0" + hours).slice(-2); //pad with 0
      _minutes = ("0" + d.getMinutes()).slice(-2); //pad with 0
      timeArr.push(_hours + ":" + _minutes + " " + ampm);
      timesModel.push({
        value: _hours + ":" + _minutes + " " + ampm,
        text: _hours + ":" + _minutes + " " + ampm,
      });
      d.setMinutes(d.getMinutes() + MinuteInterval); //increment by 5 minutes
    }

    return timesModel;
  }
}
