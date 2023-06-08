export class Constants {
    public static readonly Header_PatientListing = 'Patients';
    public static readonly Header_DashBoard = 'DashBoard';
    public static readonly Menu_Patient = 'Patient';
    public static readonly Menu_DashBoard = 'DashBoard';

    public static readonly headerServiceListing = 'Services';
    public static readonly menuService = 'Service';

    public static readonly headerStaffListing = 'Staffs';
    public static readonly menuProvider = 'Staff';

    public static readonly headerSettings = 'Settings';
    public static readonly menuSettings = 'Settings';

    public static readonly headerCalender = 'Calender';
    public static readonly menuCalender = 'Calender';

    public static readonly mobileNumberPattern = '^((\\+91-?)|0)?[0-9]{10,15}$';
    public static readonly emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
    public static readonly passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\da-zA-Z]).{8,15}$';

    public static readonly login_success = "Login Successful";
}
