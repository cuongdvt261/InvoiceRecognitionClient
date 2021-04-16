enum ReturnCode {
    None = 0,
    Success = 1,
    Warning = 2,
    Error_ = 3,
    Empty = 4,
    Error_Select = 5,
    Duplicate = 6,
    Format_Incorrect = 7,
    Error_Open_File = 8,
    File_Not_Exist = 9,
    File_Exist = 10,
    Over_Size = 11,
    Not_Ready = 12,
    Permission_denined = 13,
}

enum DetectResultEnum {
    NONE = 0,
    OK = 1,
    NG_MISSING_OWNER = 2,
    NG_MISMATCH_OWNERSEALSIGN = 3,
    NG_SEALSIGN_OWNER = 4,
    NG_MISSING_PATIENT = 5,
    NG_SEALSIGN_PATIENT = 6,
    NG_NAME_MISSING = 7,
    NG_MISSDATA = 8,
    NG_REDSIGN_MISSING = 9,
    NG_MISMATCH = 10,
    NG_MISSING = 11,
    NG_SEALSIGN = 12,
    NG_MISMATCH_INJURYNAME = 13,
    NG_MISMATCH_ORDER = 14,
    NG_MISMATCH_TREATSAMETIME = 15,
    NG_MISMATCH_BIRTHDAY = 16,
    NG_MISSING_COMMENT = 17,
    FORM_PASS = 18,
    FORM_FAIL = 19,
    FORM_FAIL_NOT_SURE = 20,
    NG_CONFIRMED = 21,
    CANNOT_CHECK = 22,
    NG_CONTENT = 23,
    OK_CONFIRMED = 24,
    NG_DUPLICATE_INJURY = 25,
    OK_SURE = 26,
    NG_OTHER_INJURY = 27,
    NG_DISCOUNT_SPECIAL_INJURY = 28,
}

enum CheckCsvResultEnum {
    NONE = 0,
    OK = 1,
    NG = 2,
    OK_CONFIRMED = 3,
    NG_CONFIRMED = 4,
    NG_MISSING = 5,
    NG_DUPLICATE = 6,
    NG_WRONG_COST = 7,
}

enum FormType {
    None = 0,
    HCF = 1,
    Touyou = 2,
    JUMP = 3,
    JUSEI_SHINSHINKAI = 4,
    TOUYOU_SHINSHINKAI = 5,
}

enum StatusProcessEnum {
    NONE = 0,
    PROCESSING = 1,
    PROCESS_SUCCESSFUL = 2,
    PROCESS_FAILED = 3,
    ALREADY = 4,
    PENDING = 5,
    BARCODE_PRINTED = 0x10,
    CONFIRM_USBDATA = 0x20,
}

enum SourceUploadEnum {
    NONE = 0,
    AUTO = 1,
    MANUAL = 2,
}

enum FileType {
    NONE = 0,
    PDF = 1,
    CSV = 2,
    FILE_TYPE_COUNT = 3
}

enum MessageId {
    MSG_NONE = 0,
    MSG_LIST_PDF_FILE = 1,
    MSG_PDF_FILE_INFO = 2,
    MSG_LIST_PDF_PAGE_IMAGE = 3,
    MSG_ALL_PDF_FILE_NAME = 4,
    MSG_LIST_PDF_PAGE = 5,
    MSG_PDF_PAGE_INFO = 6,
    MSG_FILE = 7,
    MSG_LIST_USER = 8,
    MSG_USER_INFO = 9,
    MSG_LIST_DOCTER = 10,
    MSG_DOCTER_INFO = 11,
    MSG_SEAL_IMAGE_INFO = 12,
    MSG_STATUS = 13,
    MSG_CROP_IMAGE = 14,
    MSG_COMPANY_INFO = 15,
    MSG_CONFIG = 16,
    MSG_LIST_CSV_DATA_FILE = 17,
    MSG_CSV_DATA_FILE = 18,
    MSG_LIST_CHECK_COST_RESULT = 19,
    MSG_CHECK_COST_RESULT = 20,
    MSG_LIST_CHECK_COST_OF_PAGE_RESULT = 21,
    // MSG_LIST_USBDATA_FILE= 17,
    MSG_ID_COUNT = 22,
}

enum MessageType {
    MSG_TYPE_NONE = 0,
    MSG_TYPE_REQUEST = 1,
    MSG_TYPE_RESPONSE = 2,
    MSG_TYPE_NOTIFY = 3,
    MSG_TYPE_INFORM = 4,
    MSG_TYPE_COUNT = 5,
}

enum MessageAction {
    MSG_ACTION_NONE = 0,
    MSG_ACTION_GET = 1,
    MSG_ACTION_UPLOAD = 2,
    MSG_ACTION_EDIT = 3,
    MSG_ACTION_PROCESS = 4,
    MSG_ACTION_REGISTER = 5,
    MSG_ACTION_REMOVE = 6,
    MSG_ACTION_CANCEL = 7,
    MSG_ACTION_COUNT = 8,
}

enum StatusType {
    STATUS_TYPE_NONE = 0,
    STATUS_UPDATE_SEAL_DOCTOR_IMAGE = 1,
}

enum SealDoctorImageUpdateStatus {
    STATUS_NONE = 0,
    STATUS_IS_CHANGE = 1,
    STATUS_NOT_CHANGE = 2,
}
enum GroupUser {
    NONE = 0,
    ADMIN = 1,
    STANDARD_USER = 2,
}

enum ModeData {
    MODE_NONE = 0,
    MODE_SHORT = 0x01,
    MODE_FULL = 0x02,
    MODE_USB_DATA = 0x04,
    MODE_COUNT = 5,
}

enum ConfigType {
    NONE = 0,
    SIGN_MATCHER = 1,
}

enum StatusConfirm {
    ALL = 0x01 | 0x02,
    UNCONFIRMED = 0x01,
    CONFIRMED = 0x02,
}

export {
    ReturnCode,
    DetectResultEnum,
    CheckCsvResultEnum,
    FormType,
    StatusProcessEnum,
    SourceUploadEnum,
    MessageId,
    MessageType,
    MessageAction,
    StatusType,
    SealDoctorImageUpdateStatus,
    GroupUser,
    ModeData,
    FileType,
    ConfigType,
    StatusConfirm
}

// export default MessageId
