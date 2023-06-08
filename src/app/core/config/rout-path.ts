export class RoutePath {
    public static readonly Login = 'admin/login';
    public static readonly Patients = 'admin/patients';
    public static readonly DashBoard = 'admin/dashboard';
    public static readonly Calender = 'admin/calender';
    public static readonly Service = 'admin/services';
    public static readonly Staff = 'admin/staffs';
    public static readonly Settings = 'admin/settings';
    public static readonly AccountSettings = 'admin/accountsettings';
    public static readonly EndUserHome = '';
    public static readonly EndUserBooking = 'booking';
    public static readonly VideoMeeting = 'videomeeting/:meetingCode';
    public static readonly PasswordSettings = 'user/password';
    public static readonly UserLogin = 'user/login';
    public static readonly UserRegister = 'user/register';
    public static readonly MyProfile = 'admin/my-profile';
    public static readonly Signup = 'admin/signup';
    public static readonly ForgotPassord = 'admin/forgot-password';
    public static readonly ResetPassord = 'user/reset-password/:token';
    public static readonly NotFound = 'notfound';
}