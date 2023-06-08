export class Meeting {
    id: number;
    appointmentId: number;
    meetingCode: string;
    isMeetingExpired: boolean;
    isMeetingCancelled: boolean;
    meetingUrl: string;
    startDate: Date
    endDate: Date
}